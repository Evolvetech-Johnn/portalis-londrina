/**
 * Middleware centralizado de tratamento de erros.
 * Deve ser registrado como ÚLTIMO middleware no Express (após as rotas).
 * Formata todos os erros em um envelope JSON consistente.
 */
const errorHandler = (err, req, res, next) => {
  // Log detalhado apenas em desenvolvimento
  if (process.env.NODE_ENV !== 'production') {
    console.error('❌ [ErrorHandler]:', err);
  }

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: 'Dados inválidos',
      details: messages,
    });
  }

  // Erro de chave duplicada do MongoDB (ex: e-mail já cadastrado)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: `O campo '${field}' já está cadastrado.`,
    });
  }

  // Erro de cast do Mongoose (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'ID inválido fornecido.',
    });
  }

  // Erro genérico — não expõe stack em produção
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error:
      process.env.NODE_ENV === 'production'
        ? 'Erro interno do servidor.'
        : err.message || 'Erro interno do servidor.',
  });
};

module.exports = errorHandler;
