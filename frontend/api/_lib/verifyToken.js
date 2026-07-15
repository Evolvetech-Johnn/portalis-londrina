import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'portalis_dev_secret_change_in_production';

/**
 * Extrai e valida o JWT do header Authorization: Bearer <token>
 * Retorna { ok: true, payload } ou { ok: false, status, message }
 */
export function verifyToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { ok: false, status: 401, message: 'Token de autenticação ausente.' };
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { ok: true, payload };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { ok: false, status: 401, message: 'Sessão expirada. Faça login novamente.' };
    }
    return { ok: false, status: 401, message: 'Token inválido.' };
  }
}
