import { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import ScrollToFormLink from './ScrollToFormLink';

const Hero = memo(function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-obsidian-900">
      {/* Imagem de Fundo (Cloudinary) - Substitua 'portalis/hero-bg' pelo seu public_id real */}
      <div className="absolute inset-0 opacity-20">
        <OptimizedImage 
          publicId="samples/landscapes/architecture-signs" // Placeholder padrão do Cloudinary demo
          alt="Fundo decorativo arquitetura abstrata"
          className="w-full h-full object-cover"
          priority={true} // Priority true porque é above-the-fold
        />
        {/* Gradiente para mesclar a imagem suavemente com o fundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/40 via-obsidian-900/80 to-obsidian-900"></div>
      </div>

      {/* Elementos decorativos do background */}
      <div className="absolute inset-0 noise-overlay"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-lp relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="badge-gold mb-6 inline-flex">
              Tráfego Pago Especializado
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="mb-6 text-slate-50">
            Pare de dividir comissões com portais que entregam <span className="text-gradient-gold">leads frios.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Assuma o controle da sua captação. Tráfego pago especializado para imobiliárias e corretores de alto desempenho. Leads previsíveis e exclusivos, direto no seu WhatsApp.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full sm:w-auto"
            >
              <ScrollToFormLink className="btn-primary-lg w-full sm:w-auto inline-flex items-center justify-center">
                Quero meu diagnóstico gratuito
                <ArrowRight className="w-5 h-5 ml-1" />
              </ScrollToFormLink>
            </motion.div>
          </motion.div>
          
          <motion.p variants={itemVariants} className="mt-8 text-sm text-slate-500 font-medium tracking-wide uppercase">
            Sem pegadinhas. Sem taxas ocultas. Resultados baseados em dados reais.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});

export default Hero;
