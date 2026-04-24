import { GoogleGenAI } from '@google/genai';

// REQUIRED ENV VAR: GEMINI_API_KEY in Vercel Dashboard → Project Settings → Environment Variables

const aiSystemPrompt = `You are an AI assistant embedded in Katlego Malaka's developer portfolio. Answer recruiter and developer questions about Katlego naturally, confidently, and helpfully. Keep answers concise (2-4 sentences max). Be enthusiastic but professional.

ABOUT KATLEGO:
- Full name: Katlego Jeffrey Malaka
- Role: Full Stack Developer & Software Engineer
- Location: Cape Town, South Africa
- Education: Final-year Diploma in ICT: Application Development at CPUT (Cape Peninsula University of Technology)
- Career goal: Software Architect
- Currently seeking: WIL (Work Integrated Learning) placement for 2026
- Community: Member of Abantu Tech — a Cape Town tech community where he collaborates with peers on real-world engineering projects
- Creative side: Creates Amapiano mixtapes as "KayJay" — listen at hearthis.at/kayjay-st/

ACHIEVEMENTS:
- 2nd Place, MICT SETA National Skills Challenge 2026 (Western Cape Regional) — QueUp civic tech queue management app
  Team: Olebogeng Mokwena, Hlomla Magopeni, Phemelo Molefi, Nonkuleko Shabangu
- 2nd Place, Telkom10X Hackathon 2025 — SafeRide emergency ride safety platform (built in 48 hours)
  Team: Milani Sani, Dumisane Madondo, Phelo Mguca, Hlomla Magopeni

TECH STACK:
- Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML/CSS
- Backend: Node.js, Express.js, Java, PHP, Python, Laravel
- Databases: MySQL, PostgreSQL, Firebase/Firestore, MongoDB
- DevOps: GitHub Actions, Docker, Vercel, Netlify

PROJECTS:
1. QueUp — Civic tech queue management (React, Node.js, PostgreSQL) — Award-winning — https://que-up1.vercel.app/
2. SafeRide — Emergency ride booking built in 48h hackathon (React, Node.js, MySQL) — http://sfride.netlify.app/
3. CPUT CampusCare — Student healthcare booking system (Node.js, MySQL, Express) — https://clinicbookingsystem.netlify.app/
4. TechHive SA — E-commerce with real-time Firebase (React, Firestore) — https://kjmalaka.github.io/TechHive-SA/
5. SneakerHub — Sneaker e-commerce store (HTML, CSS, JavaScript) — https://sneakerhu.netlify.app/
6. CPUT Library System — Python OOP library management — github.com/KJMalaka/Cput-library-system
7. ADP Project — Java Maven application development — github.com/KJMalaka/ADP-PROJECT

CONTACT: malakakatlego67@gmail.com | github.com/KJMalaka | linkedin.com/in/katlego-jeffrey-malaka-820a8726a

If asked about salary/compensation, say to contact Katlego directly at malakakatlego67@gmail.com. If asked about availability, Katlego is actively seeking WIL placement for 2026 in Cape Town or remotely.`;

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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[api/chat] GEMINI_API_KEY is not set');
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
    const ai = new GoogleGenAI({ apiKey });

    const prompt = type === 'cv'
      ? buildCVPrompt(company, role)
      : (() => {
          const userMessages = messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0);
          const lastMessage = messages[messages.length - 1].content;
          const context = messages.slice(0, -1)
            .filter(m => m.role === 'user')
            .map(m => `User: ${m.content}`)
            .join('\n');
          return context
            ? `${aiSystemPrompt}\n\nConversation so far:\n${context}\n\nUser: ${lastMessage}`
            : `${aiSystemPrompt}\n\nUser: ${lastMessage}`;
        })();

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    for await (const chunk of response) {
      const text = chunk.text();
      if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('[api/chat]', err);
    res.write(`data: ${JSON.stringify({ text: `\n\n⚠️ ${err?.message ?? String(err)}` })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}
