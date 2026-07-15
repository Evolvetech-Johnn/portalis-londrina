import useLeadForm from '../hooks/useLeadForm';
import { Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function LeadForm() {
  const { fields, errors, status, errorMessage, handleChange, handleSubmit } = useLeadForm();
  const shouldReduceMotion = useReducedMotion();

  const titleVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="lead-form" className="section bg-obsidian-800 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 noise-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container-lp relative z-10">
        <div className="max-w-lg mx-auto">
          
          <motion.div 
            className="text-center mb-10"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="mb-4">Descubra o potencial da sua <span className="text-gradient">imobiliária.</span></h2>
            <p className="text-lg">
              Preencha os dados abaixo e entraremos em contato para um diagnóstico sem compromisso.
            </p>
          </motion.div>

          <div className="card-glass p-6 sm:p-8 relative glow-border min-h-[450px] flex flex-col justify-center">
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              <AnimatePresence>
                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-lg bg-error-500/10 border border-error-500/20 text-error-400 text-sm mb-6">
                      {errorMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="nome" className="form-label form-label-required">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className={`input-field ${errors.nome ? 'input-field-error' : ''}`}
                  placeholder="Seu nome"
                  autoComplete="name"
                  value={fields.nome}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
                <AnimatePresence>
                  {errors.nome && (
                    <motion.span 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="form-error-msg"
                    >
                      {errors.nome}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="telefone" className="form-label form-label-required">WhatsApp</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  className={`input-field ${errors.telefone ? 'input-field-error' : ''}`}
                  placeholder="(00) 00000-0000"
                  inputMode="tel"
                  autoComplete="tel"
                  value={fields.telefone}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
                <AnimatePresence>
                  {errors.telefone && (
                    <motion.span 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="form-error-msg"
                    >
                      {errors.telefone}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="empresa" className="form-label">Nome da Imobiliária (Opcional)</label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  className="input-field"
                  placeholder="Sua imobiliária"
                  autoComplete="organization"
                  value={fields.empresa}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
              </div>

              {/* Campo B2B Qualificador de Volume */}
              <div>
                <label htmlFor="mensagem" className="form-label form-label-required">Qual seu volume atual de vendas/mês?</label>
                <select
                  id="mensagem"
                  name="mensagem"
                  className={`input-field appearance-none ${errors.mensagem ? 'input-field-error' : ''} ${!fields.mensagem ? 'text-slate-500' : 'text-slate-50'}`}
                  value={fields.mensagem}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="Ainda não realizo vendas consistentes">Ainda não realizo vendas consistentes</option>
                  <option value="Até 5 vendas">Até 5 vendas</option>
                  <option value="6 a 15 vendas">6 a 15 vendas</option>
                  <option value="16 a 30 vendas">16 a 30 vendas</option>
                  <option value="Mais de 30 vendas">Mais de 30 vendas</option>
                </select>
                <AnimatePresence>
                  {errors.mensagem && (
                    <motion.span 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="form-error-msg"
                    >
                      {errors.mensagem}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4">
                <motion.button 
                  type="submit" 
                  className="btn-primary-lg w-full relative"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Enviando...
                    </span>
                  ) : (
                    'Solicitar Diagnóstico'
                  )}
                </motion.button>
                <p className="text-center text-xs text-slate-500 mt-4">
                  Seus dados estão seguros conosco. Não fazemos spam.
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
