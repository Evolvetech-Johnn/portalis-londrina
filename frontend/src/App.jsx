/**
 * App.jsx — Orquestrador da Landing Page Portalis
 *
 * Regra: este componente NÃO contém lógica de negócio.
 * Apenas importa e compõe as seções em ordem.
 * Toda lógica fica nos hooks em /hooks e nos componentes filhos.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layout
import MainLayout from './layouts/MainLayout.jsx';

// Pages
import Home from './pages/Home.jsx';
import ThankYou from './pages/ThankYou.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfUse from './pages/TermsOfUse.jsx';
import NotFound from './pages/NotFound.jsx';

// ── Componente ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Portalis — Geração de Leads para Imobiliárias e Corretores</title>
        <meta name="description" content="A Portalis conecta imobiliárias e corretores a compradores e locatários qualificados via tráfego pago. Leads previsíveis. Escala real." />
        <meta property="og:title" content="Portalis — Leads Qualificados para o Mercado Imobiliário" />
        <meta property="og:description" content="Tráfego pago especializado para imobiliárias e corretores de alto desempenho. Resultados previsíveis, escala real." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="obrigado" element={<ThankYou />} />
          <Route path="privacidade" element={<PrivacyPolicy />} />
          <Route path="termos" element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
