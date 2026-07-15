/**
 * POST /api/auth/login
 *
 * Corpo esperado: { email: string, senha: string }
 * Retorna: { success: true, token: string, user: { nome, email, role } }
 */
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://wmxyyxdloidbfcaphaox.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

const JWT_SECRET = process.env.JWT_SECRET || 'TROQUE_ISSO_NO_VERCEL';
const JWT_EXPIRES = '7d';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  }

  const { email, senha } = req.body ?? {};

  // Validação básica
  if (!email || !senha) {
    return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios.' });
  }

  // Buscar usuário no banco
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('id, nome, email, senha_hash, role')
    .eq('email', email.toLowerCase().trim())
    .single();

  // Resposta genérica para não vazar se o email existe ou não
  const GENERIC_ERROR = 'Email ou senha incorretos.';

  if (error || !user) {
    return res.status(401).json({ success: false, message: GENERIC_ERROR });
  }

  // Comparar senha com hash
  const senhaValida = await bcrypt.compare(senha, user.senha_hash);
  if (!senhaValida) {
    return res.status(401).json({ success: false, message: GENERIC_ERROR });
  }

  // Gerar JWT
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  return res.status(200).json({
    success: true,
    token,
    user: { nome: user.nome, email: user.email, role: user.role },
  });
}
