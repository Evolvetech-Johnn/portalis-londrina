import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * ScrollToFormLink
 * 
 * CTA que sempre chega ao formulário com scroll suave,
 * independente de a âncora ser acessada da Home ou de outra rota.
 *
 * Comportamento:
 * 1. Se já estiver na Home (/): scroll suave imediato para #lead-form.
 * 2. Se estiver em outra rota (/privacidade, /termos, etc.):
 *    navega para / e aguarda o componente montar antes de fazer o scroll.
 */
export default function ScrollToFormLink({ children, className = '' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      const scrollToForm = () => {
        const el = document.getElementById('lead-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      if (location.pathname === '/') {
        // Já está na Home — só rola
        scrollToForm();
      } else {
        // Vai para Home primeiro, depois rola assim que o DOM estiver pronto
        navigate('/');
        // requestAnimationFrame duplo garante que o React renderizou a página
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollToForm);
        });
      }
    },
    [location.pathname, navigate]
  );

  return (
    <a
      href="/#lead-form"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
