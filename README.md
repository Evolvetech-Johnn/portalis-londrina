# Portalis

**Agência de Geração de Leads para Imobiliárias e Corretores via Tráfego Pago**

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Vercel Serverless Functions |
| Banco | Supabase (PostgreSQL) |
| Imagens | Cloudinary |
| Deploy | Vercel |

---

## Estrutura do Projeto

```
Portalis/
└── frontend/    → React + Tailwind + Vercel Serverless Functions (api/)
```

---

## Setup Local

### Pré-requisitos
- Node.js >= 18
- npm >= 9
- Conta no Supabase

### 1. Clonar e instalar dependências

```bash
# Frontend
cd frontend
npm install
```

### 2. Configurar variáveis de ambiente

```bash
# Frontend
cd frontend
cp .env.example .env.local
# Edite o .env.local com suas credenciais do Supabase e Cloudinary
```

### 3. Iniciar em desenvolvimento

```bash
# Terminal — Frontend + API (porta 5173)
cd frontend
npm run dev
```

### 4. Verificar

- API health: http://localhost:5173/api/health
- Frontend: http://localhost:5173

---

## Variáveis de Ambiente

Consulte [`frontend/.env.example`](./frontend/.env.example) para a lista completa e documentada.

---

## Deploy (Vercel)

- **Frontend + API**: Vercel → conecte o repositório GitHub, configure as variáveis de ambiente e faça deploy automático.
