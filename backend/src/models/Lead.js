const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
  },
  whatsapp: {
    type: String,
    required: [true, 'O WhatsApp é obrigatório'],
    trim: true,
  },
  nomeImobiliaria: {
    type: String,
    trim: true,
  },
  quantidadeImoveisMes: {
    type: String,
    required: [true, 'A quantidade de vendas/mês é obrigatória'],
    enum: [
      'Ainda não realizo vendas consistentes',
      'Até 5 vendas',
      '6 a 15 vendas',
      '16 a 30 vendas',
      'Mais de 30 vendas'
    ]
  },
  origem: {
    utm_source: String,
    utm_campaign: String
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Lead', leadSchema);
