import React, { useState } from 'react';
import { EpsComponent, ComponentStatus } from '../types';

interface ComponentListProps {
  components: EpsComponent[];
  onSelect: (component: EpsComponent) => void;
}

const ComponentList: React.FC<ComponentListProps> = ({ components, onSelect }) => {
  const [filter, setFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | ComponentStatus>('All');

  const filtered = components.filter(c => {
    const matchesSerial = c.serialNumber.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSerial && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-800">Fleet Inventory</h3>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search Serial Number..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
          >
            <option value="All">All Statuses</option>
            <option value={ComponentStatus.SERVICEABLE}>Serviceable</option>
            <option value={ComponentStatus.UNSERVICEABLE}>Unserviceable</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Serial Number</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Location / Reference</th>
              <th className="px-6 py-4">Last Sync</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(comp => (
              <tr key={comp.serialNumber} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-mono font-medium text-slate-900">{comp.serialNumber}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    comp.status === ComponentStatus.SERVICEABLE 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${comp.status === ComponentStatus.SERVICEABLE ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    {comp.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {comp.status === ComponentStatus.SERVICEABLE 
                    ? (comp.fittedTo ? `Fitted to ${comp.fittedTo}` : 'In Stock')
                    : (comp.maintenanceRef || 'Pending Repair')
                  }
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{comp.lastUpdated}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onSelect(comp)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComponentList;