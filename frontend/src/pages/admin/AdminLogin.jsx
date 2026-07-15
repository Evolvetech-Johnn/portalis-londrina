import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      login(data.token, data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-4">
      <Helmet>
        <title>Login Admin — Portalis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading font-bold text-slate-50 tracking-wide mb-2">
            Portalis<span className="text-indigo-500">.</span>Admin
          </h1>
          <p className="text-slate-400">Acesse o painel de gerenciamento de leads</p>
        </div>

        <div className="card-glass p-8 glow-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-md bg-error-500/10 border border-error-500/20 text-error-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full bg-obsidian-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-50 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-slate-300 mb-1">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                required
                className="w-full bg-obsidian-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-50 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar no Painel'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
