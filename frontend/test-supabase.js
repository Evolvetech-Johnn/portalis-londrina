import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wmxyyxdloidbfcaphaox.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHl5eGRsb2lkYmZjYXBoYW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA3MjM3NSwiZXhwIjoyMDk5NjQ4Mzc1fQ.RFr2xWarcF4McR5fkv6L_TdMF_TvGhPtgU-lgcNJsKc'
);

async function test() {
  console.log('Testing Supabase Connection...');
  const { data, error } = await supabase.from('leads').insert({
    nome: 'Teste',
    whatsapp: '43999999999',
    empresa: 'Teste',
    volume_mes: 'Até 5 vendas',
    utm_source: 'organico',
    utm_campaign: '',
  }).select();

  if (error) {
    console.error('Supabase Error:', error);
  } else {
    console.log('Supabase Success:', data);
  }
}

test();
