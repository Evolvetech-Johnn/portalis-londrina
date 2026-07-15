/**
 * phoneFormatter.js — Utilitário de formatação de número de telefone brasileiro
 *
 * Formata o input do usuário em tempo real para o padrão (XX) XXXXX-XXXX.
 * Suporta celulares (9 dígitos) e fixos (8 dígitos).
 */

/**
 * Remove todos os caracteres não numéricos de uma string.
 *
 * @param {string} value
 * @returns {string} Apenas os dígitos
 */
export const stripNonDigits = (value) => value.replace(/\D/g, '');

/**
 * Formata um número de telefone brasileiro conforme o usuário digita.
 * Máscara: (XX) XXXXX-XXXX (celular) ou (XX) XXXX-XXXX (fixo)
 *
 * @param {string} value - Valor bruto do input (pode conter máscaras)
 * @returns {string} Valor formatado
 *
 * @example
 * formatPhone('11987654321')  // '(11) 98765-4321'
 * formatPhone('1133334444')   // '(11) 3333-4444'
 * formatPhone('(11) 9876')    // '(11) 9876'
 */
export const formatPhone = (value) => {
  const digits = stripNonDigits(value);

  // Limita a 11 dígitos (celular) ou 10 (fixo)
  const capped = digits.slice(0, 11);

  if (capped.length === 0) return '';

  // DDD
  if (capped.length <= 2) {
    return `(${capped}`;
  }

  // (XX) ...
  if (capped.length <= 6) {
    return `(${capped.slice(0, 2)}) ${capped.slice(2)}`;
  }

  // Celular: (XX) XXXXX-XXXX (11 dígitos)
  if (capped.length === 11) {
    return `(${capped.slice(0, 2)}) ${capped.slice(2, 7)}-${capped.slice(7)}`;
  }

  // Fixo ou celular incompleto: (XX) XXXX-XXXX (até 10 dígitos)
  if (capped.length <= 10) {
    const start = capped.slice(0, 2);
    const middle = capped.slice(2, 6);
    const end = capped.slice(6);
    return end ? `(${start}) ${middle}-${end}` : `(${start}) ${middle}`;
  }

  return value;
};

/**
 * Verifica se um telefone formatado é válido (10 ou 11 dígitos).
 *
 * @param {string} phone - Telefone (pode ter máscara)
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const digits = stripNonDigits(phone);
  return digits.length === 10 || digits.length === 11;
};
