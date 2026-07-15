import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
//
// ── Desenvolvimento local ───────────────────────────────────────────────────
// Para rodar o projeto completo (frontend + Serverless Functions) em dev:
//   npx vercel dev
//
// Para rodar só o frontend (sem API):
//   npm run dev
// ───────────────────────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});

