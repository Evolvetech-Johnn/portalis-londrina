import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { motion, useInView, useSpring, useTransform, useReducedMotion } from 'framer-motion';

function AnimatedCounter({ from, to, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const springValue = useSpring(from, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (current) => {
    return prefix + Math.round(current) + suffix;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(to);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, springValue, to]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function SocialProof() {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    { value: 12, prefix: "", suffix: "M+", label: "em VGV gerado para clientes" },
    { value: 45, prefix: "-", suffix: "%", label: "no Custo de Aquisição (CAC)" },
    { value: 10, prefix: "", suffix: "k+", label: "leads exclusivos qualificados" }
  ];

  const testimonials = [
    {
      text: "Com a Portalis nós paramos de disputar clientes desgastados. O lead cai no CRM já sabendo do empreendimento e com intenção clara. Fechamos 3 vendas de médio padrão só no primeiro mês de campanha.",
      author: "Ricardo Mendes",
      role: "Diretor, Mendes & Co. Imóveis"
    },
    {
      text: "A qualidade da filtragem prévia que eles fazem mudou o dia a dia dos nossos corretores. Eles não perdem mais tempo no WhatsApp com curiosos. O retorno sobre investimento na plataforma pagou o ano inteiro em 45 dias.",
      author: "Carla Ferraz",
      role: "Gerente Comercial, Prime Properties"
    }
  ];

  return (
    <section className="section bg-obsidian-800">
      <div className="container-lp">
        
        {/* Título e Métricas */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-12">Números que <span className="text-gradient">falam por si.</span></h2>
          
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-b border-slate-800 py-10">
            {metrics.map((metric, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-heading text-slate-50 mb-2">
                  <AnimatedCounter from={0} to={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Depoimentos */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          {testimonials.map((test, idx) => (
            <TestimonialCard key={idx} data={test} delay={idx * 0.15} />
          ))}
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ data, delay }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      className="card-glass p-8 md:p-10"
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <Quote className="w-10 h-10 text-indigo-600/40 mb-6" />
      <p className="text-lg text-slate-200 mb-8 italic leading-relaxed">
        "{data.text}"
      </p>
      <div>
        <div className="font-semibold text-slate-50">{data.author}</div>
        <div className="text-sm text-slate-400">{data.role}</div>
      </div>
    </motion.div>
  );
}
