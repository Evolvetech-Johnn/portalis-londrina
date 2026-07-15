require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { configureCloudinary } = require('./src/config/cloudinary');
const leadRoutes = require('./src/routes/leadRoutes');
const errorHandler = require('./src/middleware/errorHandler');

// ── Inicialização de serviços externos ──────────────────────────────────────
connectDB();
configureCloudinary();

// ── App Express ─────────────────────────────────────────────────────────────
const app = express();

// Middlewares globais
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '10kb' })); // Limita payload para evitar DoS
app.use(express.urlencoded({ extended: true }));

// ── Rotas ───────────────────────────────────────────────────────────────────

// Health check — confirma que a API está no ar
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Portalis API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Recursos da API
app.use('/api/leads', leadRoutes);

// Rota não encontrada — deve vir ANTES do errorHandler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Rota '${req.originalUrl}' não encontrada.`,
  });
});

// ── Tratamento de erros centralizado ────────────────────────────────────────
app.use(errorHandler);

// ── Servidor ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Portalis API rodando em http://localhost:${PORT}`);
  console.log(`   Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health:   http://localhost:${PORT}/api/health\n`);
});
