/**
 * PATCH  /api/admin/agenda/[id]  → Atualiza atividade (ex: status para 'Concluída')
 * DELETE /api/admin/agenda/[id]  → Remove a atividade
 */
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../../_lib/verifyToken.js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://wmxyyxdloidbfcaphaox.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!requireAuth(req, res)) return;

  const { id } = req.query;
  if (!id) return res.status(400).json({ success: false, message: 'ID da atividade não informado.' });

  // ── PATCH ────────────────────────────────────────────────────────────
  if (req.method === 'PATCH') {
    const { status, titulo, data_agendada } = req.body ?? {};
    
    const updates = {};
    if (status !== undefined) updates.status = status;
    if (titulo !== undefined) updates.titulo = titulo;
    if (data_agendada !== undefined) updates.data_agendada = data_agendada;

    const { data, error } = await supabase
      .from('lead_atividades')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[PATCH /api/admin/agenda/:id]', error.message);
      return res.status(500).json({ success: false, message: 'Erro ao atualizar atividade.' });
    }

    return res.status(200).json({ success: true, atividade: data });
  }

  // ── DELETE ───────────────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('lead_atividades')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[DELETE /api/admin/agenda/:id]', error.message);
      return res.status(500).json({ success: false, message: 'Erro ao deletar atividade.' });
    }

    return res.status(200).json({ success: true, message: 'Atividade deletada com sucesso.' });
  }

  return res.status(405).json({ success: false, message: 'Método não permitido.' });
}
