/**
 * GET /api/admin/dashboard
 *
 * Retorna métricas agregadas para o dashboard:
 * - Total de leads por status
 * - Taxa de conversão entre etapas
 * - Valor total do pipeline (valorEstimado dos leads não Perdidos)
 * - Leads por origem (utm_source)
 * - Leads dos últimos 30 dias agrupados por dia (gráfico de tendência)
 */
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../_lib/verifyToken.js';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://wmxyyxdloidbfcaphaox.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

const ALL_STATUS = [
  'Novo', 'Contatado', 'Qualificado', 'Reunião Agendada',
  'Proposta Enviada', 'Em Negociação', 'Ganho', 'Perdido'
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Método não permitido.' });

  // Buscar todos os leads não deletados de uma vez (evitar múltiplas queries)
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, status, valor_estimado, utm_source, criado_em')
    .is('deleted_at', null);

  if (error) {
    console.error('[GET /api/admin/dashboard]', error.message);
    return res.status(500).json({ success: false, message: 'Erro ao buscar métricas.' });
  }

  const total = leads.length;

  // 1. Total por status
  const porStatus = ALL_STATUS.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length;
    return acc;
  }, {});

  // 2. Valor do pipeline (exclui Perdidos)
  const valorPipeline = leads
    .filter(l => l.status !== 'Perdido' && l.valor_estimado)
    .reduce((sum, l) => sum + Number(l.valor_estimado), 0);

  // 3. Taxa de conversão simples: Ganho / Total (excluindo Perdidos)
  const ativos = leads.filter(l => l.status !== 'Perdido').length;
  const ganhos = porStatus['Ganho'];
  const taxaConversao = ativos > 0 ? ((ganhos / ativos) * 100).toFixed(1) : '0.0';

  // 4. Leads por origem
  const porOrigem = leads.reduce((acc, l) => {
    const src = l.utm_source || 'organico';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  // 5. Leads dos últimos 30 dias agrupados por dia
  const hoje = new Date();
  const trinta = new Date();
  trinta.setDate(trinta.getDate() - 29);

  const leadsRecentes = leads.filter(l => new Date(l.criado_em) >= trinta);

  const porDia = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(trinta);
    d.setDate(trinta.getDate() + i);
    const chave = d.toISOString().split('T')[0];
    porDia[chave] = 0;
  }
  leadsRecentes.forEach(l => {
    const chave = l.criado_em.split('T')[0];
    if (porDia[chave] !== undefined) porDia[chave]++;
  });

  const tendencia = Object.entries(porDia).map(([data, quantidade]) => ({ data, quantidade }));

  return res.status(200).json({
    success: true,
    metrics: {
      total,
      porStatus,
      valorPipeline: Number(valorPipeline.toFixed(2)),
      taxaConversao: Number(taxaConversao),
      porOrigem,
      tendencia,
    }
  });
}
