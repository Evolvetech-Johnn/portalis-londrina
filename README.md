# Portalis

**Agência de Geração de Leads para Imobiliárias e Corretores via Tráfego Pago**

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Banco | MongoDB Atlas (Mongoose) |
| Imagens | Cloudinary |
| Deploy | Render |

---

## Estrutura do Monorepo

```
Portalis/
├── frontend/    → React + Tailwind
└── backend/     → Node.js + Express + MongoDB
```

---

## Setup Local

### Pré-requisitos
- Node.js >= 18
- npm >= 9
- Conta no MongoDB Atlas (opcional para dev frontend)

### 1. Clonar e instalar dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar variáveis de ambiente

```bash
# Backend
cd backend
cp .env.example .env
# Edite o .env com suas credenciais
```

### 3. Iniciar em desenvolvimento

```bash
# Terminal 1 — Backend (porta 3001)
cd backend
npm run dev

# Terminal 2 — Frontend (porta 5173)
cd frontend
npm run dev
```

### 4. Verificar

- API health: http://localhost:3001/api/health
- Frontend: http://localhost:5173

---

## Variáveis de Ambiente

Consulte [`backend/.env.example`](./backend/.env.example) para a lista completa e documentada.

---

## Deploy (Render)

- **Backend**: Web Service (Node) → `npm start` → porta da var `PORT`
- **Frontend**: Static Site → `npm run build` → pasta `dist/`

Configure as variáveis de ambiente no painel do Render antes do primeiro deploy.
