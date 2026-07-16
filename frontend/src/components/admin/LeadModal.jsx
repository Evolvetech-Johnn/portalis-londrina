import { useState, useEffect } from 'react';
import { X, Save, Trash2, Calendar, MessageSquare, DollarSign, User, Link as LinkIcon, Building2, Edit2, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function LeadModal({ leadId, onClose, onUpdate }) {
  const { token } = useAuth();
  const [lead, setLead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Formulário editável
  const [valorEstimado, setValorEstimado] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [novaObservacao, setNovaObservacao] = useState('');
  
  // Informações principais editáveis
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editNome, setEditNome] = useState('');
  const [editWhatsapp, setEditWhatsapp] = useState('');
  const [editEmpresa, setEditEmpresa] = useState('');
  const [editVolumeMes, setEditVolumeMes] = useState('');

  // Agenda
  const [isScheduling, setIsScheduling] = useState(false);
  const [agendaTipo, setAgendaTipo] = useState('Ligação');
  const [agendaTitulo, setAgendaTitulo] = useState('');
  const [agendaData, setAgendaData] = useState('');
  const [agendaHora, setAgendaHora] = useState('');

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await fetch(`/api/admin/leads/${leadId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erro ao carregar lead');
        setLead(data.lead);
        setValorEstimado(data.lead.valor_estimado || '');
        setResponsavel(data.lead.responsavel || '');
        
        setEditNome(data.lead.nome || '');
        setEditWhatsapp(data.lead.whatsapp || '');
        setEditEmpresa(data.lead.empresa || '');
        setEditVolumeMes(data.lead.volume_mes || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLead();
  }, [leadId, token]);

  const handleSave = async () => {
    setIsSaving(true);
    setError('');

    let updatedObservacoes = lead.observacoes || [];
    if (novaObservacao.trim()) {
      updatedObservacoes = [
        ...updatedObservacoes,
        { texto: novaObservacao.trim(), criado_em: new Date().toISOString() }
      ];
    }

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          valor_estimado: valorEstimado ? Number(valorEstimado) : null,
          responsavel: responsavel.trim() || null,
          observacoes: updatedObservacoes,
          nome: editNome.trim() || undefined,
          whatsapp: editWhatsapp.trim() || undefined,
          empresa: editEmpresa.trim() || null,
          volume_mes: editVolumeMes.trim() || null,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao atualizar lead');
      
      onUpdate(data.lead);
      onClose();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este lead? (Soft delete)')) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Erro ao excluir lead');
      
      onUpdate({ ...lead, deleted_at: new Date().toISOString() }); // Pass back pseudo deleted lead so kanban can remove it
      onClose();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  const handleSchedule = async () => {
    if (!agendaTitulo || !agendaData || !agendaHora) {
      alert('Preencha título, data e hora.');
      return;
    }
    
    setIsSaving(true);
    try {
      const data_agendada = new Date(`${agendaData}T${agendaHora}`).toISOString();
      const res = await fetch('/api/admin/agenda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lead_id: leadId,
          tipo: agendaTipo,
          titulo: agendaTitulo,
          data_agendada
        })
      });

      if (!res.ok) throw new Error('Falha ao agendar atividade');
      
      alert('Atividade agendada com sucesso!');
      setIsScheduling(false);
      setAgendaTitulo('');
      setAgendaData('');
      setAgendaHora('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/80 backdrop-blur-sm">
        <div className="bg-obsidian-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400">Carregando dados do lead...</p>
        </div>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/80 backdrop-blur-sm p-4">
      <div className="bg-obsidian-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-obsidian-950/50">
          <div>
            {isEditingInfo ? (
              <input 
                type="text" 
                value={editNome} 
                onChange={(e) => setEditNome(e.target.value)}
                className="text-xl font-semibold bg-obsidian-900 border border-slate-700 rounded px-2 py-1 text-slate-50 focus:border-gold-500 focus:outline-none w-full max-w-sm"
              />
            ) : (
              <h2 className="text-xl font-semibold text-slate-50">{lead.nome}</h2>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300`}>
                {lead.status}
              </span>
              <span className="text-xs text-slate-500">
                Criado em {format(new Date(lead.criado_em), "dd 'de' MMM, yyyy", { locale: ptBR })}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {error && (
            <div className="p-3 bg-error-500/10 border border-error-500/20 text-error-400 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Dados Principais */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-300">Dados Principais</h3>
              <button 
                onClick={() => setIsEditingInfo(!isEditingInfo)}
                className="text-xs flex items-center gap-1 text-gold-500 hover:text-gold-400 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                {isEditingInfo ? 'Concluir edição' : 'Editar dados'}
              </button>
            </div>

            {isEditingInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">WhatsApp</label>
                    <input type="text" value={editWhatsapp} onChange={(e) => setEditWhatsapp(e.target.value)} className="w-full bg-obsidian-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-slate-50 focus:border-gold-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Empresa</label>
                    <input type="text" value={editEmpresa} onChange={(e) => setEditEmpresa(e.target.value)} className="w-full bg-obsidian-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-slate-50 focus:border-gold-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Volume Mensal</label>
                    <input type="text" value={editVolumeMes} onChange={(e) => setEditVolumeMes(e.target.value)} className="w-full bg-obsidian-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-slate-50 focus:border-gold-500 focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-4 pt-5">
                  <InfoRow icon={LinkIcon} label="Origem (UTM)" value={lead.utm_source || 'Orgânico'} />
                  <InfoRow icon={LinkIcon} label="Campanha" value={lead.utm_campaign || '-'} />
                  {lead.motivo_perda && (
                    <InfoRow icon={X} label="Motivo da Perda" value={<span className="text-error-400 font-medium">{lead.motivo_perda}</span>} />
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <InfoRow icon={MessageSquare} label="WhatsApp" value={
                    <a href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">
                      {lead.whatsapp}
                    </a>
                  } />
                  <InfoRow icon={Building2} label="Empresa" value={lead.empresa || 'Não informada'} />
                  <InfoRow icon={Target} label="Volume Mensal" value={lead.volume_mes} />
                </div>
                <div className="space-y-4">
                  <InfoRow icon={LinkIcon} label="Origem (UTM)" value={lead.utm_source || 'Orgânico'} />
                  <InfoRow icon={LinkIcon} label="Campanha" value={lead.utm_campaign || '-'} />
                  {lead.motivo_perda && (
                    <InfoRow icon={X} label="Motivo da Perda" value={<span className="text-error-400 font-medium">{lead.motivo_perda}</span>} />
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-800" />

          {/* Campos Editáveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-500" /> Valor Estimado (R$)
              </label>
              <input
                type="number"
                value={valorEstimado}
                onChange={(e) => setValorEstimado(e.target.value)}
                className="w-full bg-obsidian-950 border border-slate-700 rounded-md px-3 py-2 text-slate-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                placeholder="Ex: 5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" /> Responsável
              </label>
              <input
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                className="w-full bg-obsidian-950 border border-slate-700 rounded-md px-3 py-2 text-slate-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                placeholder="Nome do consultor"
              />
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Agendar Atividade */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" /> Agendar Atividade
              </h3>
              <button
                onClick={() => setIsScheduling(!isScheduling)}
                className="text-xs text-gold-500 hover:text-gold-400"
              >
                {isScheduling ? 'Cancelar' : '+ Novo Agendamento'}
              </button>
            </div>

            {isScheduling && (
              <div className="bg-obsidian-950 border border-slate-700 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Tipo de Atividade</label>
                    <select
                      value={agendaTipo}
                      onChange={(e) => setAgendaTipo(e.target.value)}
                      className="w-full bg-obsidian-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-50 focus:border-gold-500 focus:outline-none"
                    >
                      <option value="Ligação">Ligação</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Reunião">Reunião</option>
                      <option value="Email">Email</option>
                      <option value="Tarefa">Tarefa Geral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Título/Resumo</label>
                    <input
                      type="text"
                      value={agendaTitulo}
                      onChange={(e) => setAgendaTitulo(e.target.value)}
                      placeholder="Ex: Ligar para confirmar..."
                      className="w-full bg-obsidian-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Data</label>
                    <input
                      type="date"
                      value={agendaData}
                      onChange={(e) => setAgendaData(e.target.value)}
                      className="w-full bg-obsidian-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Hora</label>
                    <input
                      type="time"
                      value={agendaHora}
                      onChange={(e) => setAgendaHora(e.target.value)}
                      className="w-full bg-obsidian-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSchedule}
                    disabled={isSaving}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white text-xs font-medium rounded-md transition-colors"
                  >
                    Salvar Agendamento
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Histórico / Observações */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" /> Histórico de Observações
            </h3>
            
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {(!lead.observacoes || lead.observacoes.length === 0) ? (
                <p className="text-sm text-slate-500 italic">Nenhuma observação registrada.</p>
              ) : (
                lead.observacoes.map((obs, idx) => (
                  <div key={idx} className="bg-obsidian-950 border border-slate-800 rounded-md p-3">
                    <p className="text-sm text-slate-300 mb-1">{obs.texto}</p>
                    <p className="text-xs text-slate-500">
                      {format(new Date(obs.criado_em), "dd/MM/yyyy 'às' HH:mm")}
                    </p>
                  </div>
                ))
              )}
            </div>

            <textarea
              value={novaObservacao}
              onChange={(e) => setNovaObservacao(e.target.value)}
              placeholder="Adicionar nova observação..."
              className="w-full bg-obsidian-950 border border-slate-700 rounded-md px-3 py-2 text-slate-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm h-20 resize-none"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-obsidian-950/50 flex items-center justify-between">
          <button
            onClick={handleDelete}
            disabled={isSaving}
            className="flex items-center gap-2 px-3 py-2 text-sm text-error-400 hover:bg-error-500/10 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Excluir Lead
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Icon helper
import { Target } from 'lucide-react';
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
        <div className="text-sm text-slate-100">{value}</div>
      </div>
    </div>
  );
}
