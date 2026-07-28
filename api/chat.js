import Groq from 'groq-sdk';
import { aiSystemPrompt } from '../src/data/portfolio.js';

// REQUIRED ENV VAR: GROQ_API_KEY in Vercel Dashboard → Project Settings → Environment Variables
// Get a free key at https://console.groq.com/keys

// Simple in-memory rate limiter
const rateMap = new Map();
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + WINDOW_MS };
  if (now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  rateMap.set(ip, entry);
  return false;
}

function buildCVPrompt(company, role) {
  return `You are writing a tailored cover letter for Katlego Jeffrey Malaka applying to ${company} for the ${role} position.

About Katlego:
- Final-year ICT Application Development student at CPUT, Cape Town
- Career goal: Software Architect
- 2nd place MICT SETA National Skills Challenge 2026 Western Cape Regional (QueUp — civic tech queue management)
- 2nd place Telkom10X Hackathon 2025 (SafeRide — built in 48 hours)
- Stack: React, Next.js, TypeScript, Node.js, FastAPI, Java, PHP, Python, Laravel, Groq, Google Gemini, MySQL, PostgreSQL, Docker, GitHub Actions, Vercel
- Projects: QueUp, SafeRide, AI Study Assistant, myCapePlanner, KayJay Content Studio, CPUT CampusCare, TechHive SA
- Email: malakakatlego67@gmail.com
- GitHub: github.com/KJMalaka

Write a professional, compelling cover letter (3-4 paragraphs) that:
1. Opens with a hook specific to ${company} and the ${role} role
2. Highlights the most relevant projects and skills for THIS specific role
3. Mentions the national competition achievements
4. Closes with a clear call to action

Tone: confident, ambitious, professional. Keep it under 350 words.`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ??
    req.socket?.remoteAddress ??
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  const { messages, type = 'chat', company, role } = req.body ?? {};

  if (type === 'chat' && (!messages || !Array.isArray(messages))) {
    return res.status(400).json({ error: 'Invalid messages array' });
  }

  if (type === 'cv' && (!company || !role)) {
    return res.status(400).json({ error: 'company and role are required for CV generation' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('[api/chat] GROQ_API_KEY is not set');
    return res.status(500).json({ error: 'AI service not configured.' });
  }

  // SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  try {
    const groq = new Groq({ apiKey });

    if (type === 'cv') {
      // Non-streaming CV generation
      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: buildCVPrompt(company, role) }],
        temperature: 0.7,
        max_tokens: 600,
      });

      const text = completion.choices?.[0]?.message?.content ?? '';
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    // Streaming chat
    const groqMessages = [
      { role: 'system', content: aiSystemPrompt },
      ...messages.map(({ role, content }) => ({ role, content })),
    ];

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: groqMessages,
      temperature: 0.6,
      max_tokens: 500,
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content ?? '';
      if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('[api/chat]', err);
    res.write(`data: ${JSON.stringify({ text: `\n\nError: ${err?.message ?? String(err)}` })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}

