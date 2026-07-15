import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();
  
  const faqs = [
    {
      q: "Vocês garantem vendas?",
      a: "Não. Nós garantimos a entrega de leads reais com alta intenção de compra e crédito (quando aplicável). O fechamento final da venda sempre dependerá da agilidade e técnica do seu time comercial."
    },
    {
      q: "Existe fidelidade de contrato?",
      a: "Trabalhamos com modelos flexíveis, sem amarras. No entanto, recomendamos um ciclo mínimo de 3 meses para maturação das campanhas, otimização do algoritmo e construção de um funil previsível."
    },
    {
      q: "Em quanto tempo os leads começam a chegar?",
      a: "Após o nosso alinhamento estratégico inicial e o setup das campanhas (que leva cerca de 5 a 7 dias úteis), a campanha entra no ar. Os primeiros contatos costumam chegar entre 24 e 48 horas após a ativação."
    },
    {
      q: "Qual o orçamento mínimo para investir em tráfego?",
      a: "Não cobramos um percentual do seu orçamento, mas sugerimos um investimento mínimo viável em mídia (Google/Meta) que será discutido durante o diagnóstico, pois varia de acordo com a sua região, concorrência e metas de VGV."
    }
  ];

  return (
    <section className="section bg-obsidian-900 section-glow">
      <div className="container-lp">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-12">Dúvidas <span className="text-gradient">Frequentes.</span></h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} faq={faq} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AccordionItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-obsidian-800 transition-all duration-300 hover:border-slate-700">
      <button
        type="button"
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:bg-obsidian-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-100 pr-8">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className={`w-5 h-5 text-slate-400 ${isOpen ? 'text-gold-400' : ''}`} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5">
              <p className="text-slate-300 pt-2 border-t border-slate-700/50">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
