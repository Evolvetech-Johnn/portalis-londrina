import { FilterX, CircleDollarSign, TrendingDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ProblemSection() {
  const shouldReduceMotion = useReducedMotion();

  const titleVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } }
  };

  const problems = [
    {
      icon: <FilterX className="w-6 h-6" />,
      title: "Leads desqualificados",
      description: "Perder tempo atendendo curiosos sem potencial de compra ou que não possuem crédito aprovado, drenando a energia do seu time."
    },
    {
      icon: <CircleDollarSign className="w-6 h-6" />,
      title: "Custo por portal insustentável",
      description: "Pagar fortunas mensais para Zap ou VivaReal e ainda ter que disputar o mesmo lead desgastado com outros 10 corretores."
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Falta de previsibilidade",
      description: "Viver na montanha-russa das indicações e ter meses fracos por não possuir um funil de vendas previsível e sempre ativo."
    }
  ];

  return (
    <section className="section bg-obsidian-800">
      <div className="container-lp">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="mb-4">
            O mercado imobiliário mudou, mas sua captação <span className="text-gradient">parou no tempo.</span>
          </h2>
          <p className="text-lg">
            O velho modelo de depender exclusivamente de indicações e portais saturados está custando vendas que deveriam ser suas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <ProblemCard key={idx} problem={prob} delay={idx * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ problem, delay }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="card-hover p-8"
    >
      <div className="icon-box-lg mb-6">
        {problem.icon}
      </div>
      <h4 className="mb-3 text-slate-50">{problem.title}</h4>
      <p className="text-sm">{problem.description}</p>
    </motion.div>
  );
}
