/**
 * verifyToken.js — Utilitário de autenticação JWT
 *
 * Importado por todas as rotas protegidas do painel admin.
 * Verifica o header Authorization: Bearer <token>
 */
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'TROQUE_ISSO_NO_VERCEL';

/**
 * Verifica o token JWT da requisição.
 * @param {object} req - Request object da Vercel Function
 * @returns {{ valid: boolean, payload?: object, error?: string }}
 */
export function verifyToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false, error: 'Token de autenticação não fornecido.' };
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { valid: false, error: 'Sessão expirada. Faça login novamente.' };
    }
    return { valid: false, error: 'Token inválido.' };
  }
}

/**
 * Middleware helper: chama verifyToken e já responde 401 se inválido.
 * Retorna true se passou, false se já respondeu com erro.
 */
export function requireAuth(req, res) {
  const { valid, error } = verifyToken(req);
  if (!valid) {
    res.status(401).json({ success: false, message: error });
    return false;
  }
  return true;
}
