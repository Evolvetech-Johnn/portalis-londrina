import { CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollToFormLink from './ScrollToFormLink';

export default function SolutionSection() {
  const shouldReduceMotion = useReducedMotion();

  const benefits = [
    "Leads 100% exclusivos, nunca revendidos para sua concorrência.",
    "Campanhas altamente segmentadas pelo padrão do imóvel (MCMV, Médio, Alto).",
    "Filtros de qualificação prévia de intenção e análise básica de crédito.",
    "Controle total sobre o seu orçamento e escala de captação."
  ];

  const leftVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } }
  };

  return (
    <section className="section bg-obsidian-900 section-glow overflow-hidden">
      <div className="container-lp">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Coluna de texto */}
          <motion.div 
            className="relative"
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="badge-indigo mb-6 inline-flex">
              A Solução
            </span>
            <h2 className="mb-6">
              Sua máquina própria de aquisição de <span className="text-gradient">clientes.</span>
            </h2>
            <p className="text-lg mb-8">
              Na Portalis, não vendemos cliques nem visualizações vazias. Construímos ecossistemas de conversão focados em trazer o cliente certo, no momento exato da jornada de compra, com exclusividade absoluta para o seu time comercial.
            </p>
            
            <ul className="space-y-4 mb-10">
              {benefits.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 font-medium">{text}</span>
                </li>
              ))}
            </ul>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="inline-block"
            >
              <ScrollToFormLink className="btn-primary inline-flex items-center justify-center">
                Ver como funciona na prática
              </ScrollToFormLink>
            </motion.div>
          </motion.div>

          {/* Coluna visual (Dashboard / Abstract) */}
          <motion.div 
            className="relative"
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="absolute inset-0 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="card-glass p-8 relative glow-border">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h5 className="text-slate-50">Performance da Campanha</h5>
                <span className="badge-success">Ao vivo</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Leads Qualificados Gerados</span>
                    <span className="text-indigo-300 font-mono">+142%</span>
                  </div>
                  <div className="w-full h-2 bg-obsidian-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-gradient rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Custo por Lead (CPL)</span>
                    <span className="text-success-400 font-mono">-38%</span>
                  </div>
                  <div className="w-full h-2 bg-obsidian-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-success-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '33%' }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-obsidian-900/50 rounded-lg border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                  <span className="text-indigo-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <h6 className="text-sm text-slate-100">Novo lead recebido no WhatsApp</h6>
                  <p className="text-xs text-slate-400 mt-1">Interesse: Imóvel Alto Padrão - Zona Sul</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
