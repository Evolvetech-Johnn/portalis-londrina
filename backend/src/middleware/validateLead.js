const { body, validationResult } = require('express-validator');

/**
 * Regras de validação para a rota POST /api/leads.
 * Usa express-validator para sanitização e validação declarativa.
 */
const leadValidationRules = [
  body('nome')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ max: 120 })
    .withMessage('Nome não pode exceder 120 caracteres'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('E-mail é obrigatório')
    .isEmail()
    .withMessage('E-mail inválido')
    .normalizeEmail(),

  body('telefone')
    .trim()
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/)
    .withMessage('Telefone inválido. Use (XX) XXXXX-XXXX'),

  body('empresa')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Nome da empresa não pode exceder 200 caracteres'),

  body('mensagem')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Mensagem não pode exceder 1000 caracteres'),
];

/**
 * Middleware que executa após leadValidationRules.
 * Se houver erros de validação, retorna 422 com detalhes.
 * Se não houver, passa para o próximo middleware/controller.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      error: 'Dados de entrada inválidos',
      details: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

module.exports = { leadValidationRules, handleValidationErrors };
