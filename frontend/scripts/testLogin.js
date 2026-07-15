import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Carregar .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');
const raw = readFileSync(envPath, 'utf-8');
const env = {};
raw.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && !key.startsWith('#')) env[key.trim()] = rest.join('=').trim();
});

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
const JWT_SECRET = env.JWT_SECRET;

async function testLogin(email, senha) {
  console.log(`\n🔐 Testando login: ${email}`);

  const { data: user, error } = await supabase
    .from('admin_users')
    .select('id, nome, email, senha_hash, role')
    .eq('email', email.toLowerCase())
    .single();

  if (error || !user) {
    console.error('❌ Usuário não encontrado:', error?.message);
    return;
  }

  const ok = await bcrypt.compare(senha, user.senha_hash);
  if (!ok) {
    console.error('❌ Senha incorreta');
    return;
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  console.log('✅ Login válido!');
  console.log('   Nome:', user.nome);
  console.log('   Role:', user.role);
  console.log('   Token (7d):', token.substring(0, 60) + '...');
}

testLogin('admin@portalis.com.br', 'Portalis@2026!');
