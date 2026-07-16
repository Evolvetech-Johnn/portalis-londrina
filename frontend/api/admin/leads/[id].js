/**
 * GET    /api/admin/leads/[id]  → detalhe do lead
 * PATCH  /api/admin/leads/[id]  → atualizar dados gerais (observacoes, valorEstimado, etc.)
 * DELETE /api/admin/leads/[id]  → soft delete (seta deleted_at)
 */
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../_lib/verifyToken.js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://wmxyyxdloidbfcaphaox.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!requireAuth(req, res)) return;

  const { id } = req.query;
  if (!id) return res.status(400).json({ success: false, message: 'ID não informado.' });

  // ── GET — Detalhe ──────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error || !data) return res.status(404).json({ success: false, message: 'Lead não encontrado.' });
    return res.status(200).json({ success: true, lead: data });
  }

  // ── PATCH — Atualizar dados gerais ────────────────────────────────────────
  if (req.method === 'PATCH') {
    const { observacoes, valor_estimado, responsavel, motivo_perda, empresa, nome, whatsapp, volume_mes } = req.body ?? {};

    // Campos permitidos para atualização geral
    const updates = {};
    if (observacoes    !== undefined) updates.observacoes     = observacoes;
    if (valor_estimado !== undefined) updates.valor_estimado  = valor_estimado;
    if (responsavel    !== undefined) updates.responsavel     = responsavel;
    if (motivo_perda   !== undefined) updates.motivo_perda    = motivo_perda;
    if (empresa        !== undefined) updates.empresa         = empresa;
    if (nome           !== undefined) updates.nome            = nome;
    if (whatsapp       !== undefined) updates.whatsapp        = whatsapp;
    if (volume_mes     !== undefined) updates.volume_mes      = volume_mes;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Nenhum campo enviado para atualização.' });
    }

    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();

    if (error) {
      console.error('[PATCH /api/admin/leads/:id]', error.message);
      return res.status(500).json({ success: false, message: 'Erro ao atualizar lead.' });
    }

    return res.status(200).json({ success: true, lead: data });
  }

  // ── DELETE — Soft delete ──────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('leads')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .is('deleted_at', null);

    if (error) {
      console.error('[DELETE /api/admin/leads/:id]', error.message);
      return res.status(500).json({ success: false, message: 'Erro ao remover lead.' });
    }

    return res.status(200).json({ success: true, message: 'Lead removido com sucesso.' });
  }

  return res.status(405).json({ success: false, message: 'Método não permitido.' });
}
