import { Target, Layers, Rocket, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "1. Diagnóstico Estratégico",
      description: "Mapeamos seus melhores produtos e definimos com precisão o perfil do seu cliente ideal (ICP)."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "2. Estruturação de Campanha",
      description: "Criamos os anúncios, as landing pages de alta conversão e toda a integração técnica."
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "3. Lançamento e Otimização",
      description: "A campanha vai pro ar. Otimizamos o investimento diariamente com base em dados reais de conversão."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "4. Leads na Mesa",
      description: "Você recebe contatos qualificados diretamente no CRM ou WhatsApp e foca apenas em fechar negócio."
    }
  ];

  return (
    <section className="section bg-obsidian-900">
      <div className="container-lp">
        <motion.div 
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-gold mb-4 inline-flex">O Processo</span>
          <h2>Do zero aos primeiros leads em <span className="text-gradient">4 passos.</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Linha conectora (visível apenas desktop) */}
          <div className="hidden lg:block absolute top-10 left-12 right-12 h-[2px] bg-obsidian-800 z-0">
            <motion.div 
              className="h-full bg-gold-600/30 w-full"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />
          </div>

          {steps.map((step, idx) => (
            <StepCard key={idx} step={step} delay={idx * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, delay }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center text-center group"
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="icon-box-lg bg-obsidian-900 border-2 border-slate-800 group-hover:border-gold-500 group-hover:shadow-glow-gold transition-all duration-300 mb-6">
        {step.icon}
      </div>
      <h4 className="mb-3 text-slate-50">{step.title}</h4>
      <p className="text-sm text-slate-400">{step.description}</p>
    </motion.div>
  );
}
