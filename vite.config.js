import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy /api/* to vercel dev (port 3000) when running `npm run dev`
    // For production-like dev with serverless functions, use `npm run dev:vercel` instead
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
