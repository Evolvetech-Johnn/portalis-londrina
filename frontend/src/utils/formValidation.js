/**
 * formValidation.js — Utilitário de validação client-side do formulário de leads
 *
 * Espelha as regras de validação do backend para feedback imediato ao usuário.
 * Não faz requisições de rede — apenas validação síncrona.
 */

const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida todos os campos do formulário de lead.
 *
 * @param {Object} fields - Objeto com os campos do formulário
 * @param {string} fields.nome
 * @param {string} fields.email
 * @param {string} fields.telefone
 * @param {string} [fields.empresa]
 * @param {string} [fields.mensagem]
 * @returns {Object} errors — Objeto com as mensagens de erro por campo.
 *                            Vazio se não houver erros.
 *
 * @example
 * const errors = validateLeadForm({ nome: '', email: 'x', telefone: '' });
 * // { nome: 'Nome é obrigatório', email: 'E-mail inválido', telefone: 'Telefone é obrigatório' }
 */
export const validateLeadForm = (fields) => {
  const errors = {};

  // Nome
  if (!fields.nome || fields.nome.trim().length === 0) {
    errors.nome = 'Nome é obrigatório';
  } else if (fields.nome.trim().length > 120) {
    errors.nome = 'Nome não pode exceder 120 caracteres';
  }

  // E-mail
  if (!fields.email || fields.email.trim().length === 0) {
    errors.email = 'E-mail é obrigatório';
  } else if (!EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = 'E-mail inválido';
  }

  // Telefone
  if (!fields.telefone || fields.telefone.trim().length === 0) {
    errors.telefone = 'Telefone é obrigatório';
  } else if (!PHONE_REGEX.test(fields.telefone.trim())) {
    errors.telefone = 'Use o formato (XX) XXXXX-XXXX';
  }

  // Empresa (opcional, mas com limite de tamanho)
  if (fields.empresa && fields.empresa.trim().length > 200) {
    errors.empresa = 'Nome da empresa não pode exceder 200 caracteres';
  }

  // Mensagem (opcional, mas com limite de tamanho)
  if (fields.mensagem && fields.mensagem.trim().length > 1000) {
    errors.mensagem = 'Mensagem não pode exceder 1000 caracteres';
  }

  return errors;
};

/**
 * Valida um único campo (útil para validação on-blur).
 *
 * @param {string} fieldName - Nome do campo
 * @param {string} value - Valor atual do campo
 * @returns {string | undefined} Mensagem de erro ou undefined
 */
export const validateField = (fieldName, value) => {
  const errors = validateLeadForm({ [fieldName]: value });
  return errors[fieldName];
};
