const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { createLead } = require('../controllers/leadController');

const router = express.Router();

// Rate limiting específico para a criação de leads (evitar bots/spam)
// Máximo de 5 requisições por IP a cada 15 minutos
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message: 'Muitas requisições enviadas deste IP, por favor tente novamente mais tarde.'
  }
});

// Middleware de validação
const validateLead = [
  body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('telefone').trim().notEmpty().withMessage('WhatsApp é obrigatório'),
  body('mensagem').trim().notEmpty().withMessage('A quantidade de imóveis é obrigatória'),
];

router.post('/', leadLimiter, validateLead, createLead);

module.exports = router;
