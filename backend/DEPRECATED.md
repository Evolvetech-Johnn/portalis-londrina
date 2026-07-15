# BACKEND DEPRECIADO

Este diretório (`/backend`) foi utilizado durante o desenvolvimento inicial com **Express.js + MongoDB Atlas + Render**.

## Situação atual

A arquitetura foi migrada para:
- **Banco de dados:** Supabase (PostgreSQL)
- **Backend:** Vercel Serverless Functions (`/frontend/api/`)
- **Deploy:** Vercel + GitHub (CI/CD automático)

## Este diretório pode ser removido com segurança

Toda a lógica de API agora reside em:
- [`/frontend/api/leads.js`](../frontend/api/leads.js) — `POST /api/leads`
- [`/frontend/api/health.js`](../frontend/api/health.js) — `GET /api/health`

O setup do banco de dados e instruções de deploy estão documentados em:
- [`SUPABASE_SETUP.md`](../docs/SUPABASE_SETUP.md) (ver walkthrough no artifact do projeto)
