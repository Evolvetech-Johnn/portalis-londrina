const { validationResult } = require('express-validator');
const Lead = require('../models/Lead');

const createLead = async (req, res) => {
  try {
    // 1. Validação Server-Side
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { nome, telefone, empresa, mensagem, utm_source, utm_campaign } = req.body;

    // 2. Mapeamento dos campos do frontend para o schema
    // O frontend envia: telefone -> backend: whatsapp
    // O frontend envia: empresa -> backend: nomeImobiliaria
    // O frontend envia: mensagem -> backend: quantidadeImoveisMes
    const newLead = new Lead({
      nome,
      whatsapp: telefone,
      nomeImobiliaria: empresa || '',
      quantidadeImoveisMes: mensagem,
      origem: {
        utm_source: utm_source || 'organico',
        utm_campaign: utm_campaign || ''
      }
    });

    // 3. Salvar no MongoDB
    await newLead.save();

    // 4. Retornar Sucesso
    res.status(201).json({
      success: true,
      message: 'Lead recebido com sucesso!',
      data: {
        id: newLead._id
      }
    });

  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno no servidor ao processar o lead.' 
    });
  }
};

module.exports = {
  createLead
};
