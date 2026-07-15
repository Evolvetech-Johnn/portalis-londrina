import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function ThankYou() {
  
  // Disparo dos pixels de conversão isolados na rota /obrigado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Pixel do Meta
      if (window.fbq) {
        window.fbq('track', 'Lead');
      }
      // Tag do Google
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-SEU_CONVERSIONS_ID/sua_label_de_conversao',
        });
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Obrigado! Solicitação Recebida — Portalis</title>
        {/* Desabilitar indexação da página de obrigado para evitar acesso orgânico fantasma */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-obsidian-900">
        <div className="absolute inset-0 noise-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-success-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container-lp relative z-10">
          <div className="max-w-xl mx-auto text-center card-glass p-8 md:p-12 glow-border">
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-500/20 text-success-400 mb-8"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-3xl md:text-4xl text-slate-50"
            >
              Diagnóstico Solicitado!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-slate-300 mb-10"
            >
              Recebemos os seus dados com sucesso. Nossa equipe de especialistas entrará em contato muito em breve para agendar seu alinhamento estratégico.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              {/* WhatsApp CTA */}
              <a 
                href="https://wa.me/5543988704856?text=Olá,%20acabei%20de%20solicitar%20um%20diagnóstico%20pelo%20site%20da%20Portalis!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary-lg w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-none"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp Agora
              </a>

              {/* Voltar CTA */}
              <Link to="/" className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Voltar para o início
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
