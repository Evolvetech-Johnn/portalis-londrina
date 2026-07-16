import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, CheckCircle2, Clock, Trash2, Loader2, Phone, MessageSquare, Mail, User, AlertCircle } from 'lucide-react';
import { format, isBefore, isToday, startOfDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminAgenda() {
  const { token } = useAuth();
  const [atividades, setAtividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAtividades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchAtividades = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/agenda', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao carregar agenda');
      setAtividades(data.atividades || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, novoStatus) => {
    try {
      // Optimistic update
      setAtividades(prev => prev.map(a => a.id === id ? { ...a, status: novoStatus } : a));

      const res = await fetch(`/api/admin/agenda/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: novoStatus })
      });

      if (!res.ok) throw new Error('Falha ao atualizar atividade');
    } catch (err) {
      alert(err.message);
      fetchAtividades(); // Revert on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover esta atividade?')) return;
    try {
      // Optimistic update
      setAtividades(prev => prev.filter(a => a.id !== id));

      const res = await fetch(`/api/admin/agenda/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Falha ao deletar atividade');
    } catch (err) {
      alert(err.message);
      fetchAtividades(); // Revert on error
    }
  };

  // Grouping
  const hoje = startOfDay(new Date());

  const pendentes = atividades.filter(a => a.status === 'Pendente');
  const atrasados = pendentes.filter(a => isBefore(parseISO(a.data_agendada), hoje));
  const tarefasHoje = pendentes.filter(a => isToday(parseISO(a.data_agendada)));
  const futuros = pendentes.filter(a => !isBefore(parseISO(a.data_agendada), hoje) && !isToday(parseISO(a.data_agendada)));
  const concluidos = atividades.filter(a => a.status === 'Concluída');

  const getIconForType = (tipo) => {
    switch (tipo) {
      case 'WhatsApp': return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'Ligação': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'Email': return <Mail className="w-4 h-4 text-purple-500" />;
      case 'Reunião': return <User className="w-4 h-4 text-gold-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  const renderAtividadeCard = (atividade) => (
    <div key={atividade.id} className="group bg-obsidian-900 border border-slate-800 rounded-lg p-4 flex gap-4 items-start shadow-sm hover:border-slate-700 transition-colors">
      <div className="pt-1">
        <button 
          onClick={() => handleUpdateStatus(atividade.id, atividade.status === 'Concluída' ? 'Pendente' : 'Concluída')}
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            atividade.status === 'Concluída' 
              ? 'bg-success-500 border-success-500 text-white' 
              : 'border-slate-600 hover:border-gold-500 hover:bg-gold-500/10'
          }`}
        >
          {atividade.status === 'Concluída' && <CheckCircle2 className="w-3 h-3" />}
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            {getIconForType(atividade.tipo)}
            <h4 className={`text-sm font-semibold truncate ${atividade.status === 'Concluída' ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
              {atividade.titulo}
            </h4>
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {format(parseISO(atividade.data_agendada), "dd/MM 'às' HH:mm", { locale: ptBR })}
          </span>
        </div>

        {atividade.leads && (
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="font-medium text-slate-300">{atividade.leads.nome}</span>
            {atividade.leads.empresa && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                <span>{atividade.leads.empresa}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
        <button onClick={() => handleDelete(atividade.id)} className="p-1.5 text-slate-500 hover:text-error-400 hover:bg-error-500/10 rounded">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-gold-500" />
          Agenda de Follow-ups
        </h1>
        <p className="text-slate-400 mt-1">Gerencie suas ligações, reuniões e retornos agendados.</p>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-error-500/10 border border-error-500/20 text-error-400 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna 1: Atrasados e Hoje */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Atrasados */}
          {atrasados.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-error-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Atrasados ({atrasados.length})
              </h2>
              <div className="space-y-3">
                {atrasados.map(renderAtividadeCard)}
              </div>
            </section>
          )}

          {/* Hoje */}
          <section>
            <h2 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">
              Hoje ({tarefasHoje.length})
            </h2>
            {tarefasHoje.length === 0 ? (
              <div className="bg-obsidian-900/50 border border-slate-800 border-dashed rounded-lg p-6 text-center">
                <p className="text-slate-400 text-sm">Nenhuma atividade agendada para hoje.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tarefasHoje.map(renderAtividadeCard)}
              </div>
            )}
          </section>

          {/* Próximos */}
          <section>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Próximos dias ({futuros.length})
            </h2>
            <div className="space-y-3">
              {futuros.map(renderAtividadeCard)}
            </div>
          </section>

        </div>

        {/* Coluna 2: Concluídos Recentes (Histórico) */}
        <div className="space-y-6">
          <section className="bg-obsidian-900/30 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-success-500 uppercase tracking-wider mb-4">
              Concluídos ({concluidos.length})
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {concluidos.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">Nenhum histórico recente.</p>
              ) : (
                concluidos.map(renderAtividadeCard)
              )}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
