import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Runs the Vercel serverless functions (api/chat.js, api/contact.js) in-process
// during `npm run dev`, so the chatbot and contact form work without a second
// server. Production (Vercel) still serves api/ natively — this only applies in dev.
function apiDevPlugin() {
  const routes = {
    '/api/chat': './api/chat.js',
    '/api/contact': './api/contact.js',
  };

  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      // Load .env (GROQ_API_KEY, RESEND_API_KEY, ...) into process.env for the
      // handlers below — Vite doesn't do this for arbitrary server-side vars.
      const env = loadEnv('development', process.cwd(), '');
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }

      server.middlewares.use(async (req, res, next) => {
        const modulePath = routes[req.url?.split('?')[0]];
        if (!modulePath || req.method !== 'POST') return next();

        // Polyfill the Vercel Node response helpers these handlers expect
        // (res.status().json()) — Vite's raw http.ServerResponse lacks them.
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (body) => {
          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        };

        const fail = (err) => {
          console.error('[api-dev-middleware]', err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Dev API error: ' + err.message }));
          } else {
            res.end();
          }
        };

        try {
          const { default: handler } = await server.ssrLoadModule(modulePath);

          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
              await handler(req, res);
            } catch (err) {
              fail(err);
            }
          });
        } catch (err) {
          fail(err);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
});
