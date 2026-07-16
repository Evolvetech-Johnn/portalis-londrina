/**
 * GET  /api/admin/agenda  → Lista atividades
 * POST /api/admin/agenda  → Cria uma atividade
 */
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../_lib/verifyToken.js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://wmxyyxdloidbfcaphaox.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!requireAuth(req, res)) return;

  // ── GET ──────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { lead_id, status } = req.query;

    let query = supabase
      .from('lead_atividades')
      .select(`
        *,
        leads ( nome, empresa, status )
      `)
      .order('data_agendada', { ascending: true });

    if (lead_id) query = query.eq('lead_id', lead_id);
    if (status) query = query.eq('status', status);

    const { data, error } = await query;

    if (error) {
      console.error('[GET /api/admin/agenda]', error.message);
      return res.status(500).json({ success: false, message: 'Erro ao carregar agenda.' });
    }

    return res.status(200).json({ success: true, atividades: data });
  }

  // ── POST ─────────────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { lead_id, tipo, titulo, data_agendada } = req.body ?? {};

    if (!lead_id || !tipo || !titulo || !data_agendada) {
      return res.status(400).json({ success: false, message: 'Dados incompletos para agendar.' });
    }

    const { data, error } = await supabase
      .from('lead_atividades')
      .insert([{
        lead_id,
        tipo,
        titulo,
        data_agendada
      }])
      .select()
      .single();

    if (error) {
      console.error('[POST /api/admin/agenda]', error.message);
      return res.status(500).json({ success: false, message: 'Erro ao criar atividade.' });
    }

    return res.status(201).json({ success: true, atividade: data });
  }

  return res.status(405).json({ success: false, message: 'Método não permitido.' });
}
