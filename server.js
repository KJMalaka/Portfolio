/**
 * Local development server for portfolio with API support.
 *
 * Usage:
 *   1. Build:         npm run build
 *   2. Start server:  node server.js
 *   3. Open:          http://localhost:3000
 *
 * The chatbot at /api/chat will work locally.
 * Set GROQ_API_KEY in .env or as environment variable.
 */

import express from 'express';
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const distDir = resolve(__dirname, 'dist');

// --- Server Setup ---
const app = express();
app.use(express.json());

// --- Load .env ---
if (existsSync(resolve(__dirname, '.env'))) {
  const envContent = readFileSync(resolve(__dirname, '.env'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

// --- API Routes ---
async function setupRoutes() {
  const { default: chatHandler } = await import('./api/chat.js');
  const { default: contactHandler } = await import('./api/contact.js');

  app.post('/api/chat', (req, res) => {
    chatHandler(req, res);
  });

  app.post('/api/contact', (req, res) => {
    contactHandler(req, res);
  });
}

await setupRoutes();

// --- Static Files ---
if (existsSync(distDir)) {
  app.use(express.static(distDir));

  // SPA fallback — serve index.html for any non-API route
  app.use('/:any', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(resolve(distDir, 'index.html'));
  });
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(resolve(distDir, 'index.html'));
  });
} else {
  console.log('\nWARNING: Build not found. Run `npm run build` first.\n');

  app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.send(
      '<html><body style="background:#0a0f1e;color:#94a3b8;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;">' +
        '<div style="text-align:center">' +
        '<h1 style="color:#e2e8f0;">Portfolio Server</h1>' +
        '<p>Build not found. Run:</p>' +
        '<pre style="background:#1e293b;padding:12px;border-radius:8px;">npm run build && node server.js</pre>' +
        '</div></body></html>'
    );
  });
}

// --- Start ---
createServer(app).listen(PORT, () => {
  console.log('\n  Portfolio server running at http://localhost:' + PORT + '\n');
});

