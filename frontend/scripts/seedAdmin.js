/**
 * scripts/seedAdmin.js
 *
 * Cria o usuário administrador inicial no Supabase.
 * Rode UMA VEZ localmente: node frontend/scripts/seedAdmin.js
 *
 * Requer no .env.local:
 *   SUPABASE_URL=...
 *   SUPABASE_SERVICE_KEY=...
 *   ADMIN_NOME=Seu Nome
 *   ADMIN_EMAIL=seu@email.com
 *   ADMIN_PASSWORD=SenhaForte123!
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Carregar .env.local manualmente (sem dotenv, para simplicidade)
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

let env = {};
try {
  const raw = readFileSync(envPath, 'utf-8');
  raw.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && !key.startsWith('#')) {
      env[key.trim()] = rest.join('=').trim();
    }
  });
} catch {
  console.error('❌ .env.local não encontrado. Crie o arquivo com as variáveis necessárias.');
  process.exit(1);
}

const SUPABASE_URL       = env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;
const ADMIN_NOME         = env.ADMIN_NOME        || 'Admin';
const ADMIN_EMAIL        = env.ADMIN_EMAIL;
const ADMIN_PASSWORD     = env.ADMIN_PASSWORD;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('❌ Preencha SUPABASE_URL, SUPABASE_SERVICE_KEY, ADMIN_EMAIL e ADMIN_PASSWORD no .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function seed() {
  console.log(`🔐 Criando admin: ${ADMIN_EMAIL}`);

  // Verificar se já existe
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', ADMIN_EMAIL.toLowerCase())
    .single();

  if (existing) {
    console.log('⚠️  Usuário já existe. Nenhuma alteração foi feita.');
    process.exit(0);
  }

  // Hash da senha (12 rounds = seguro e razoavelmente rápido)
  const senha_hash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const { error } = await supabase.from('admin_users').insert({
    nome:       ADMIN_NOME,
    email:      ADMIN_EMAIL.toLowerCase(),
    senha_hash,
    role:       'admin',
  });

  if (error) {
    console.error('❌ Erro ao criar admin:', error.message);
    process.exit(1);
  }

  console.log('✅ Admin criado com sucesso!');
  console.log(`   Nome:  ${ADMIN_NOME}`);
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log('   Senha: [HASH — nunca fica em texto puro]');
  console.log('\n⚠️  REMOVA ADMIN_PASSWORD do .env.local agora que o usuário foi criado.');
}

seed();
