import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Map } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página não encontrada — Portalis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-obsidian-900">
        <div className="absolute inset-0 noise-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container-lp relative z-10 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-600/10 text-indigo-400 mb-8"
          >
            <Map className="w-12 h-12" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-7xl font-heading font-bold text-slate-50 mb-4"
          >
            404
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl text-slate-300 mb-6"
          >
            Página não encontrada
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-400 mb-10 max-w-md mx-auto"
          >
            Parece que você acessou uma URL inválida. Vamos voltar e focar em gerar leads para a sua imobiliária?
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/" className="btn-primary-lg inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Voltar para o início
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
