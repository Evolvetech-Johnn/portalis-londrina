import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToFormLink from './ScrollToFormLink';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-950 pt-16 pb-8 border-t border-slate-800/50">
      <div className="container-lp">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-heading text-slate-50 mb-4 inline-block hover:text-indigo-400 transition-colors">Portalis</Link>
            <p className="text-slate-400 max-w-sm mb-6">
              Agência especializada em tráfego pago B2B para o mercado imobiliário. Transformamos budget de marketing em leads exclusivos e previsíveis.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-obsidian-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600/20 hover:text-indigo-400 transition-colors font-medium text-xs" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-obsidian-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600/20 hover:text-indigo-400 transition-colors font-medium text-xs" aria-label="LinkedIn">
                IN
              </a>
              <a href="https://wa.me/5543988704856" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-obsidian-800 flex items-center justify-center text-slate-400 hover:bg-[#25D366]/20 hover:text-[#25D366] transition-colors font-medium text-xs" aria-label="WhatsApp">
                WA
              </a>
            </div>
          </div>

          {/* Links úteis */}
          <div>
            <h4 className="text-slate-50 text-sm tracking-wider uppercase mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-indigo-300 text-sm">Sobre nós</Link></li>
              <li><ScrollToFormLink className="text-slate-400 hover:text-indigo-300 text-sm">Diagnóstico</ScrollToFormLink></li>
              <li><Link to="/" className="text-slate-400 hover:text-indigo-300 text-sm">Cases de Sucesso</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-slate-50 text-sm tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/termos" className="text-slate-400 hover:text-indigo-300 text-sm">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="text-slate-400 hover:text-indigo-300 text-sm">Política de Privacidade</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} Portalis. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
