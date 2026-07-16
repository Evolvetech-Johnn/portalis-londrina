/**
 * App.jsx — Orquestrador da Landing Page Portalis
 *
 * Regra: este componente NÃO contém lógica de negócio.
 * Apenas importa e compõe as seções em ordem.
 * Toda lógica fica nos hooks em /hooks e nos componentes filhos.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layout
import MainLayout from './layouts/MainLayout.jsx';

// Pages
import Home from './pages/Home.jsx';
import ThankYou from './pages/ThankYou.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfUse from './pages/TermsOfUse.jsx';
import NotFound from './pages/NotFound.jsx';

// Admin
import { AuthProvider } from './contexts/AuthContext.jsx';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminLeads from './pages/admin/AdminLeads.jsx';
import AdminAgenda from './pages/admin/AdminAgenda.jsx';

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
      
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="obrigado" element={<ThankYou />} />
            <Route path="privacidade" element={<PrivacyPolicy />} />
            <Route path="termos" element={<TermsOfUse />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin">
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            
            <Route path="login" element={<AdminLogin />} />
            
            <Route element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="agenda" element={<AdminAgenda />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
