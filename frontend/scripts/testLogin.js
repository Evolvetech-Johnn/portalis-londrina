// Teste local do endpoint de login
// Roda com: node --env-file=.env.local scripts/testLogin.js

const EMAIL = 'johnathanlopes34@gmail.com';
const SENHA = 'Evolvetech123@';

const response = await fetch('http://localhost:5173/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: EMAIL, senha: SENHA }),
});

const data = await response.json();
console.log('Status:', response.status);
console.log('Response:', JSON.stringify(data, null, 2));
