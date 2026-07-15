import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://wmxyyxdloidbfcaphaox.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

const JWT_SECRET = process.env.JWT_SECRET || 'portalis_dev_secret_change_in_production';
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
    return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });
  }

  // Buscar admin pelo email
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('id, nome, email, senha_hash, role')
    .eq('email', email.toLowerCase().trim())
    .single();

  if (error || !user) {
    // Mensagem genérica por segurança (não revelar se email existe ou não)
    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  }

  // Comparar senha
  const senhaValida = await bcrypt.compare(senha, user.senha_hash);
  if (!senhaValida) {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  }

  // Gerar JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, nome: user.nome, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  return res.status(200).json({
    success: true,
    token,
    user: { id: user.id, nome: user.nome, email: user.email, role: user.role },
  });
}
