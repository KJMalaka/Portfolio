import Anthropic from '@anthropic-ai/sdk';
import { aiSystemPrompt } from '../src/data/portfolio.js';

// Simple in-memory rate limiter (resets per cold-start — good enough for a portfolio)
const rateMap = new Map();
const RATE_LIMIT = 20; // requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

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
- 2nd place MICT SETA National Skills Challenge 2026 (QueUp — civic tech queue management)
- 2nd place Telkom10X Hackathon 2025 (SafeRide — built in 48 hours)
- Stack: React, Next.js, TypeScript, Node.js, Java, PHP, Python, Laravel, MySQL, PostgreSQL, Docker, GitHub Actions, Vercel
- Projects: QueUp, SafeRide, CPUT CampusCare, TechHive SA
- Email: malakakatlego67@gmail.com
- GitHub: github.com/KJMalaka

Write a professional, compelling cover letter (3-4 paragraphs) that:
1. Opens with a hook specific to ${company} and the ${role} role
2. Highlights the most relevant projects and skills for THIS specific role
3. Mentions the national competition achievements
4. Closes with a clear call to action

Tone: confident, ambitious, professional. This is a WIL placement application. Keep it under 350 words.`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AI service not configured' });
  }

  const client = new Anthropic({ apiKey });

  // Streaming SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  try {
    const systemPrompt = type === 'cv' ? buildCVPrompt(company, role) : aiSystemPrompt;
    const streamMessages =
      type === 'cv'
        ? [{ role: 'user', content: `Generate a tailored cover letter for ${company} — ${role} role.` }]
        : messages.slice(-10); // Limit history to last 10 messages to control token usage

    const stream = client.messages.stream({
      model: 'claude-3-5-haiku-20241022', // Haiku: fast + cost-efficient for a portfolio chatbot
      max_tokens: type === 'cv' ? 800 : 400,
      system: systemPrompt,
      messages: streamMessages,
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta?.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('[api/chat]', err);
    res.write(`data: ${JSON.stringify({ text: '\n\nSorry, an error occurred. Please try again.' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}
