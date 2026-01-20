import React, { useState, useMemo } from 'react';
import { INITIAL_COMPONENTS } from './constants';
import { EpsComponent, ComponentStatus, FleetStats } from './types';
import Dashboard from './components/Dashboard';
import ComponentList from './components/ComponentList';
import StatusUpdateForm from './components/StatusUpdateForm';

const App: React.FC = () => {
  const [components, setComponents] = useState<EpsComponent[]>(INITIAL_COMPONENTS);
  const [selectedComponent, setSelectedComponent] = useState<EpsComponent | null>(null);

  const stats: FleetStats = useMemo(() => {
    const total = components.length;
    const serviceable = components.filter(c => c.status === ComponentStatus.SERVICEABLE).length;
    const unserviceable = total - serviceable;
    return {
      total,
      serviceable,
      unserviceable,
      serviceabilityRate: total > 0 ? (serviceable / total) * 100 : 0
    };
  }, [components]);

  const recentLogs = useMemo(() => {
    return components
      .flatMap(c => c.history.map(h => ({ ...h, serialNumber: c.serialNumber })))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }, [components]);

  const handleUpdate = (updated: EpsComponent) => {
    setComponents(prev => prev.map(c => c.serialNumber === updated.serialNumber ? updated : c));
    setSelectedComponent(null);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <i className="fa-solid fa-plane-up"></i>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-tight">PC-7 MK II EPS STATUS</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">
                FLAIT ELEKTRONIK KOLEJ TENTERA UDARA
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-600 tracking-tight">System Online</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 leading-none">KETUA FLAIT ELEKTRONIK</p>
                <p className="text-[10px] text-slate-400 font-medium">KAPT MUHAMMAD SYAM KUSHAINI TUDM</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-200">
                <i className="fa-solid fa-user text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-8">
          {/* Main Dashboard Stats */}
          <Dashboard stats={stats} />
          
          {/* Recent Activity Mini-Feed */}
          {recentLogs.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <i className="fa-solid fa-clock-rotate-left text-blue-500"></i>
                Recent Updates
              </h3>
              <div className="space-y-3">
                {recentLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-blue-600 w-16">{log.serialNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        log.status === ComponentStatus.SERVICEABLE ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
                      <span className="text-slate-500 truncate max-w-[200px] sm:max-w-md">{log.details}</span>
                    </div>
                    <span className="text-slate-400 font-medium">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Component Inventory List */}
          <ComponentList 
            components={components} 
            onSelect={(comp) => setSelectedComponent(comp)} 
          />
        </div>
      </main>

      {/* Update Modal */}
      {selectedComponent && (
        <StatusUpdateForm 
          component={selectedComponent} 
          onClose={() => setSelectedComponent(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Footer Mobile Stats */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-2xl z-40 flex justify-between items-center">
         <div className="flex gap-4">
            <div className="text-center">
              <p className="text-[10px] font-bold text-emerald-600 uppercase">SVC</p>
              <p className="font-black text-slate-900">{stats.serviceable}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-rose-600 uppercase">U/S</p>
              <p className="font-black text-slate-900">{stats.unserviceable}</p>
            </div>
         </div>
         <div className="text-right">
           <p className="text-[10px] font-bold text-slate-400 uppercase">Availability</p>
           <p className="font-black text-blue-600">{stats.serviceabilityRate.toFixed(1)}%</p>
         </div>
      </div>
    </div>
  );
};

export default App;