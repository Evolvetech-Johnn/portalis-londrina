/**
 * GET /api/admin/leads
 *
 * Lista todos os leads (exceto soft-deleted) com filtros opcionais:
 *   ?status=Novo
 *   ?origem=google
 *   ?de=2026-01-01&ate=2026-12-31
 *   ?pagina=1&limite=25
 */
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../_lib/verifyToken.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Método não permitido.' });

  const { status, origem, de, ate, pagina = 1, limite = 25 } = req.query;
  const offset = (Number(pagina) - 1) * Number(limite);

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .is('deleted_at', null)
    .order('criado_em', { ascending: false })
    .range(offset, offset + Number(limite) - 1);

  if (status)  query = query.eq('status', status);
  if (origem)  query = query.eq('utm_source', origem);
  if (de)      query = query.gte('criado_em', de);
  if (ate)     query = query.lte('criado_em', ate);

  const { data, error, count } = await query;

  if (error) {
    console.error('[GET /api/admin/leads]', error.message);
    return res.status(500).json({ success: false, message: 'Erro ao buscar leads.' });
  }

  return res.status(200).json({
    success: true,
    total: count,
    pagina: Number(pagina),
    limite: Number(limite),
    leads: data,
  });
}
