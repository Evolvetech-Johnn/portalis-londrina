import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfUse() {
  const lastUpdated = "14 de Julho de 2026";

  return (
    <>
      <Helmet>
        <title>Termos de Uso — Portalis</title>
        <meta name="description" content="Termos de Uso dos serviços da Portalis." />
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
            <h1 className="text-3xl md:text-4xl text-slate-50 font-heading mb-2">Termos de Uso</h1>
            <p className="text-slate-400 text-sm mb-8">Última atualização: {lastUpdated}</p>

            <p>
              Ao acessar o site da <strong>Portalis</strong> e solicitar nossos serviços de diagnóstico e tráfego pago, 
              você concorda em cumprir estes Termos de Uso, todas as leis e regulamentos aplicáveis. Se você não 
              concorda com algum destes termos, está proibido de usar ou acessar este site.
            </p>

            <h2>1. Serviços e Limitações</h2>
            <p>
              A Portalis presta serviços de consultoria e operação em marketing digital, especificamente captação 
              de leads via tráfego pago para o setor imobiliário. Nós fornecemos os meios de captação (leads qualificados), 
              mas <strong>não garantimos fechamento de vendas</strong>. O sucesso da transação imobiliária final depende 
              exclusivamente do atendimento, técnica e agilidade da equipe comercial do cliente.
            </p>

            <h2>2. Precisão das Informações</h2>
            <p>
              Ao preencher nossos formulários, você garante que as informações fornecidas (nome, WhatsApp, 
              volume de vendas e empresa) são verdadeiras, precisas e pertencem a você ou à empresa que você 
              tem autoridade para representar.
            </p>

            <h2>3. Propriedade Intelectual</h2>
            <p>
              O conteúdo, a estrutura, as marcas registradas, o design e as informações proprietárias contidas no site 
              da Portalis são de propriedade exclusiva da agência. Você não possui o direito de copiar, modificar, 
              distribuir, vender ou alugar parte ou a totalidade de nossos serviços e materiais visuais.
            </p>

            <h2>4. Limitação de Responsabilidade</h2>
            <p>
              Em nenhum caso a Portalis será responsável por quaisquer danos (incluindo, sem limitação, 
              danos por perda de dados ou lucro, ou devido a interrupção dos negócios) decorrentes do uso ou da 
              incapacidade de usar os materiais e serviços da Portalis.
            </p>

            <h2>5. Modificações dos Termos</h2>
            <p>
              A Portalis pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar 
              este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
            </p>

            <h2>6. Foro Aplicável</h2>
            <p>
              Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você 
              se submete irrevogavelmente à jurisdição exclusiva dos tribunais do estado em que a agência possui sede.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
