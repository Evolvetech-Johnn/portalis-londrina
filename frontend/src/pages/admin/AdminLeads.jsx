import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LeadModal from '../../components/admin/LeadModal';

const COLUMNS = [
  'Novo', 'Contatado', 'Qualificado', 'Reunião Agendada',
  'Proposta Enviada', 'Em Negociação', 'Ganho', 'Perdido'
];

export default function AdminLeads() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  // Filters
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      // Trazendo todos os leads por enquanto para Kanban sem paginação complexa (ou usar limit alto)
      const res = await fetch('/api/admin/leads?limite=500', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao carregar leads');
      setLeads(data.leads || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Se dropou fora ou não mudou de coluna
    if (!destination || (destination.droppableId === source.droppableId)) return;

    const newStatus = destination.droppableId;
    let motivoPerda = null;

    if (newStatus === 'Perdido') {
      const motivo = window.prompt('Qual o motivo da perda?\n\n(Ex: Sem orçamento, Sem resposta, Escolheu concorrente, Não é o momento, Outro)');
      if (!motivo) return; // Cancela se não informar motivo
      motivoPerda = motivo;
    }

    // Otimistic update UI
    const originalLeads = [...leads];
    setLeads(leads.map(l => l.id === draggableId ? { ...l, status: newStatus, motivo_perda: motivoPerda } : l));

    try {
      const res = await fetch(`/api/admin/leads/${draggableId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, motivo_perda: motivoPerda })
      });

      if (!res.ok) {
        throw new Error('Falha ao atualizar status');
      }
    } catch (err) {
      alert(err.message);
      // Revert in case of error
      setLeads(originalLeads);
    }
  };

  const updateLeadInState = (updatedLead) => {
    if (updatedLead.deleted_at) {
      setLeads(leads.filter(l => l.id !== updatedLead.id));
    } else {
      setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
    }
  };

  // Filtragem local por nome/empresa
  const filteredLeads = leads.filter(l => {
    const term = search.toLowerCase();
    return (l.nome?.toLowerCase().includes(term) || l.empresa?.toLowerCase().includes(term));
  });

  const getLeadsByColumn = (status) => {
    return filteredLeads.filter(l => l.status === status);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header & Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">CRM Kanban</h1>
          <p className="text-slate-400">Arraste os cards para atualizar a etapa do funil</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar lead ou empresa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-obsidian-900 border border-slate-700 rounded-lg text-sm text-slate-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 w-64"
            />
          </div>
          <button className="p-2 bg-obsidian-900 border border-slate-700 rounded-lg text-slate-400 hover:text-slate-50 hover:bg-slate-800 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-error-500/10 border border-error-500/20 text-error-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 h-full items-start">
            {COLUMNS.map((column) => (
              <div key={column} className="flex-1 min-w-[140px] max-w-[320px] flex flex-col h-full">
                <div className="bg-obsidian-900/50 border border-slate-800 rounded-t-lg p-2 border-b-2"
                  style={{ borderBottomColor: getColumnColor(column) }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-300 text-xs truncate mr-2">{column}</h3>
                    <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full shrink-0">
                      {getLeadsByColumn(column).length}
                    </span>
                  </div>
                </div>

                <Droppable droppableId={column}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 overflow-y-auto p-2 bg-obsidian-900/30 rounded-b-lg border border-t-0 border-slate-800 transition-colors custom-scrollbar ${
                        snapshot.isDraggingOver ? 'bg-gold-900/10' : ''
                      }`}
                    >
                      {getLeadsByColumn(column).map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedLeadId(lead.id)}
                              className={`mb-2 bg-obsidian-900 border border-slate-700 p-3 rounded-lg shadow-sm cursor-pointer hover:border-gold-500/50 transition-all ${
                                snapshot.isDragging ? 'shadow-lg ring-2 ring-gold-500/50' : ''
                              }`}
                            >
                              <p className="font-semibold text-slate-100 text-[13px] leading-tight mb-1 line-clamp-2">{lead.nome}</p>
                              {lead.empresa && (
                                <p className="text-[11px] text-slate-400 mb-2 truncate">{lead.empresa}</p>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] text-slate-500">
                                  {format(new Date(lead.criado_em), "dd MMM", { locale: ptBR })}
                                </span>
                                {lead.valor_estimado && (
                                  <span className="text-[10px] font-medium text-success-400 truncate ml-1">
                                    R$ {lead.valor_estimado}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Modal */}
      {selectedLeadId && (
        <LeadModal
          leadId={selectedLeadId}
          onClose={() => setSelectedLeadId(null)}
          onUpdate={updateLeadInState}
        />
      )}
    </div>
  );
}

// Helpers
function getColumnColor(status) {
  switch(status) {
    case 'Novo': return '#6366f1';
    case 'Contatado': return '#3b82f6';
    case 'Qualificado': return '#8b5cf6';
    case 'Reunião Agendada': return '#f59e0b';
    case 'Proposta Enviada': return '#f97316';
    case 'Em Negociação': return '#ec4899';
    case 'Ganho': return '#10b981';
    case 'Perdido': return '#ef4444';
    default: return '#64748b';
  }
}
