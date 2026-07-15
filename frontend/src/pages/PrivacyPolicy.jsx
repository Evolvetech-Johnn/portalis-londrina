import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "14 de Julho de 2026";

  return (
    <>
      <Helmet>
        <title>Política de Privacidade — Portalis</title>
        <meta name="description" content="Política de Privacidade da Portalis. Saiba como coletamos, usamos e protegemos seus dados." />
      </Helmet>

      <div className="bg-obsidian-900 min-h-screen pt-24 pb-16">
        <div className="container-lp max-w-3xl">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o início
            </Link>
          </div>

          <div className="card-glass p-8 md:p-12 prose prose-invert prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl text-slate-50 font-heading mb-2">Política de Privacidade</h1>
            <p className="text-slate-400 text-sm mb-8">Última atualização: {lastUpdated}</p>

            <p>
              A <strong>Portalis</strong> leva a sua privacidade a sério. Esta Política de Privacidade explica como coletamos, 
              usamos, divulgamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços 
              de geração de leads B2B para o mercado imobiliário.
            </p>

            <h2>1. Informações que Coletamos</h2>
            <p>Podemos coletar as seguintes informações sobre você:</p>
            <ul>
              <li><strong>Dados de Contato:</strong> Nome, número de telefone (WhatsApp) e endereço de e-mail.</li>
              <li><strong>Dados Profissionais:</strong> Nome da imobiliária e volume aproximado de vendas mensais.</li>
              <li><strong>Dados de Navegação e Dispositivo:</strong> Endereço IP, tipo de navegador, sistema operacional e interações com o site (via cookies e pixels de rastreamento).</li>
            </ul>

            <h2>2. Como Usamos Suas Informações</h2>
            <p>Utilizamos as informações coletadas para:</p>
            <ul>
              <li>Fornecer e gerenciar nossos serviços de captação de leads.</li>
              <li>Entrar em contato para realizar o diagnóstico estratégico solicitado.</li>
              <li>Personalizar campanhas de marketing e medir a eficácia de nossos anúncios (ex: Meta Pixel, Google Analytics).</li>
              <li>Cumprir obrigações legais e prevenir fraudes.</li>
            </ul>

            <h2>3. Compartilhamento de Dados</h2>
            <p>
              Nós <strong>não vendemos, alugamos ou comercializamos</strong> suas informações pessoais para terceiros. 
              Podemos compartilhar dados apenas com provedores de serviços de extrema confiança que nos auxiliam na 
              operação do site e na condução de nossos negócios (como provedores de hospedagem na nuvem e ferramentas 
              de CRM), exigindo deles o mesmo padrão de confidencialidade e conformidade com a LGPD.
            </p>

            <h2>4. Política de Cookies</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes (como web beacons e pixels) para rastrear a atividade 
              em nossos serviços e manter certas informações. Você pode instruir seu navegador a recusar todos os cookies, 
              no entanto, se você não aceitar cookies, poderá não conseguir usar algumas partes do nosso site.
            </p>

            <h2>5. Seus Direitos (LGPD)</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:</p>
            <ul>
              <li>Confirmar a existência de tratamento de dados.</li>
              <li>Acessar seus dados.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>

            <h2>6. Contato do Encarregado (DPO)</h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, 
              entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail:
              <br />
              <strong><a href="mailto:privacidade@portalis.com.br" className="text-indigo-400">privacidade@portalis.com.br</a></strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
