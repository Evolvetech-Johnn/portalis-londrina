/**
 * PATCH /api/admin/leads/[id]/status
 *
 * Atualiza somente o status do lead (usado pelo Kanban ao arrastar um card).
 * Body: { status: string, motivo_perda?: string }
 */
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../../_lib/verifyToken.js';

const VALID_STATUS = [
  'Novo', 'Contatado', 'Qualificado', 'Reunião Agendada',
  'Proposta Enviada', 'Em Negociação', 'Ganho', 'Perdido'
];

const VALID_MOTIVO = [
  'Sem orçamento', 'Sem resposta', 'Escolheu concorrente',
  'Não é o momento', 'Outro'
];

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://wmxyyxdloidbfcaphaox.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!requireAuth(req, res)) return;
  if (req.method !== 'PATCH') return res.status(405).json({ success: false, message: 'Método não permitido.' });

  const { id } = req.query;
  const { status, motivo_perda } = req.body ?? {};

  if (!VALID_STATUS.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status inválido. Valores aceitos: ${VALID_STATUS.join(', ')}`
    });
  }

  if (status === 'Perdido' && (!motivo_perda || motivo_perda.trim() === '')) {
    return res.status(400).json({
      success: false,
      message: `Informe o motivo da perda.`
    });
  }

  const updates = { status };
  if (status === 'Perdido') updates.motivo_perda = motivo_perda;
  else updates.motivo_perda = null; // limpa se saiu de "Perdido"

  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .is('deleted_at', null)
    .select()
    .single();

  if (error) {
    console.error('[PATCH /api/admin/leads/:id/status]', error.message);
    return res.status(500).json({ success: false, message: 'Erro ao atualizar status.' });
  }

  return res.status(200).json({ success: true, lead: data });
}
