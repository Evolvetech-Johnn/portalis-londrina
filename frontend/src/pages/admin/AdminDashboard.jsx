import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, Users, DollarSign, Target, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erro ao carregar métricas');
        setMetrics(data.metrics);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-error-500/10 border border-error-500/20 text-error-400 rounded-lg">
        {error}
      </div>
    );
  }

  const { total, valorPipeline, taxaConversao, porOrigem, tendencia } = metrics;

  const origemData = Object.entries(porOrigem).map(([name, value]) => ({ name, value }));
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50">Dashboard</h1>
        <p className="text-slate-400">Visão geral do pipeline de vendas</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total de Leads" 
          value={total} 
          icon={Users} 
          color="text-indigo-400" 
          bg="bg-indigo-400/10" 
        />
        <MetricCard 
          title="Valor do Pipeline" 
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorPipeline)} 
          icon={DollarSign} 
          color="text-success-400" 
          bg="bg-success-400/10" 
        />
        <MetricCard 
          title="Taxa de Conversão" 
          value={`${taxaConversao}%`} 
          icon={Target} 
          color="text-warning-400" 
          bg="bg-warning-400/10" 
        />
        <MetricCard 
          title="Leads Ganho" 
          value={metrics.porStatus['Ganho'] || 0} 
          icon={TrendingUp} 
          color="text-blue-400" 
          bg="bg-blue-400/10" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-obsidian-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-slate-50 mb-6">Tendência de Leads (30 dias)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tendencia} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="data" 
                  tickFormatter={(val) => {
                    const [, m, d] = val.split('-');
                    return `${d}/${m}`;
                  }}
                  stroke="#475569" 
                  fontSize={12}
                />
                <YAxis stroke="#475569" fontSize={12} allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  labelFormatter={(val) => {
                    const [y, m, d] = val.split('-');
                    return `${d}/${m}/${y}`;
                  }}
                />
                <Area type="monotone" dataKey="quantidade" name="Leads" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-obsidian-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-slate-50 mb-6">Leads por Origem</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={origemData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                />
                <Bar dataKey="value" name="Leads" radius={[4, 4, 0, 0]}>
                  {origemData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-obsidian-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
      <div className={`p-3 rounded-lg ${bg} ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-50">{value}</p>
      </div>
    </div>
  );
}
