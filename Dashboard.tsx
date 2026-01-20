import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FleetStats } from '../types';

interface DashboardProps {
  stats: FleetStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const data = [
    { name: 'Serviceable', value: stats.serviceable, color: '#10b981' },
    { name: 'Unserviceable', value: stats.unserviceable, color: '#ef4444' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Inventory</p>
        <p className="text-4xl font-bold text-slate-900 mt-2">{stats.total}</p>
        <div className="mt-4 h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 w-full"></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Serviceable</p>
        <p className="text-4xl font-bold text-slate-900 mt-2">{stats.serviceable}</p>
        <div className="mt-4 h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${(stats.serviceable / stats.total) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Unserviceable</p>
        <p className="text-4xl font-bold text-slate-900 mt-2">{stats.unserviceable}</p>
        <div className="mt-4 h-1.5 w-full bg-rose-100 rounded-full overflow-hidden">
          <div className="h-full bg-rose-500" style={{ width: `${(stats.unserviceable / stats.total) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={40} outerRadius={55} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Serviceability Rate</p>
        <p className="text-4xl font-bold text-slate-900 mt-2">{stats.serviceabilityRate.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Dashboard;