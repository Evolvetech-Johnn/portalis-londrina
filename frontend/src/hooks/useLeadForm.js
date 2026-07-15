import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLeadForm } from '../utils/formValidation.js';
import { formatPhone } from '../utils/phoneFormatter.js';

/**
 * useLeadForm — Hook de gerenciamento do formulário de captura de leads
 */
const INITIAL_FIELDS = {
  nome: '',
  telefone: '',
  empresa: '',
  mensagem: '',
};

const useLeadForm = () => {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'telefone' ? formatPhone(value) : value;

    setFields((prev) => ({ ...prev, [name]: formattedValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = validateLeadForm(fields);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus('loading');
      setErrorMessage('');

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const utm_source = urlParams.get('utm_source') || '';
        const utm_campaign = urlParams.get('utm_campaign') || '';

        const payload = {
          ...fields,
          utm_source,
          utm_campaign
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
          // Captura erros de validação retornados pelo backend (ex: array de errors)
          if (data.errors && data.errors.length > 0) {
            throw new Error(data.errors.map(err => err.msg).join(', '));
          }
          throw new Error(data.message || 'Erro ao enviar formulário.');
        }

        // Sucesso total. Reseta form e manda pro funil
        setFields(INITIAL_FIELDS);
        setStatus('idle');
        navigate('/obrigado');

      } catch (err) {
        setStatus('error');
        if (err.name === 'AbortError') {
          setErrorMessage('O servidor demorou muito para responder. Verifique sua conexão e tente novamente.');
        } else {
          setErrorMessage(
            err.message || 'Ocorreu um erro de rede. Por favor, tente novamente.'
          );
        }
      }
    },
    [fields, navigate]
  );

  const resetForm = useCallback(() => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  }, []);

  return { fields, errors, status, errorMessage, handleChange, handleSubmit, resetForm };
};

export default useLeadForm;
