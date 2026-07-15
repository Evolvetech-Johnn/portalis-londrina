import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ── Validação server-side ────────────────────────────────────────────────────
function validateBody({ nome, telefone, mensagem }) {
  const errors = [];
  if (!nome || nome.trim().length < 2)
    errors.push('Nome é obrigatório e deve ter ao menos 2 caracteres.');
  if (!telefone || telefone.trim().replace(/\D/g, '').length < 10)
    errors.push('WhatsApp inválido. Informe DDD + número (10 ou 11 dígitos).');
  if (!mensagem || mensagem.trim() === '')
    errors.push('Selecione o volume de vendas mensal.');
  return errors;
}

// ── Handler principal ────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  const allowedOrigin = process.env.FRONTEND_URL || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  }

  const { nome, telefone, empresa, mensagem, utm_source, utm_campaign } = req.body ?? {};

  // Validação
  const errors = validateBody({ nome, telefone, mensagem });
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join(' ') });
  }

  // Inserir no Supabase
  const { error } = await supabase.from('leads').insert({
    nome:         nome.trim(),
    whatsapp:     telefone.trim(),
    empresa:      empresa?.trim() || null,
    volume_mes:   mensagem.trim(),
    utm_source:   utm_source || 'organico',
    utm_campaign: utm_campaign || '',
  });

  if (error) {
    console.error('[POST /api/leads] Erro Supabase:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao salvar o lead. Tente novamente.',
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Lead recebido com sucesso!',
  });
}
