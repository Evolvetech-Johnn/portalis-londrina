/**
 * seedAdmin.js — Script one-shot para criar o usuário administrador inicial.
 *
 * Como rodar (apenas uma vez):
 *   1. Certifique-se que o .env.local tem ADMIN_EMAIL e ADMIN_PASSWORD
 *   2. cd frontend
 *   3. node --env-file=.env.local scripts/seedAdmin.js
 *
 * NUNCA commite esse script com credenciais reais.
 * NUNCA rode em produção mais de uma vez (verificação de duplicata já protege).
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Lê do ambiente
const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_EMAIL          = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD       = process.env.ADMIN_PASSWORD;
const ADMIN_NOME           = process.env.ADMIN_NOME || 'Administrador';

// Validação das variáveis
const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'ADMIN_EMAIL', 'ADMIN_PASSWORD']
  .filter(k => !process.env[k]);

if (missing.length > 0) {
  console.error(`❌ Variáveis de ambiente faltando: ${missing.join(', ')}`);
  console.error('   Rode com: node --env-file=.env.local scripts/seedAdmin.js');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function seed() {
  console.log(`\n🌱 Criando usuário admin: ${ADMIN_EMAIL}\n`);

  // Verificar se já existe
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', ADMIN_EMAIL.toLowerCase())
    .single();

  if (existing) {
    console.log('⚠️  Usuário admin já existe. Nenhuma alteração feita.');
    process.exit(0);
  }

  // Hash da senha (12 rounds = seguro e rápido)
  const senha_hash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  // Inserir no banco
  const { data, error } = await supabase
    .from('admin_users')
    .insert({ nome: ADMIN_NOME, email: ADMIN_EMAIL.toLowerCase(), senha_hash, role: 'admin' })
    .select('id, nome, email, role')
    .single();

  if (error) {
    console.error('❌ Erro ao criar admin:', error.message);
    process.exit(1);
  }

  console.log('✅ Admin criado com sucesso!');
  console.log(`   ID:    ${data.id}`);
  console.log(`   Nome:  ${data.nome}`);
  console.log(`   Email: ${data.email}`);
  console.log(`   Role:  ${data.role}`);
  console.log('\n   Guarde bem o email e senha — eles não podem ser recuperados sem acesso ao banco.\n');
}

seed();
