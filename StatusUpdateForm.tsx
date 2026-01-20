import React, { useState } from 'react';
import { EpsComponent, ComponentStatus } from '../types';

interface StatusUpdateFormProps {
  component: EpsComponent;
  onClose: () => void;
  onUpdate: (updated: EpsComponent) => void;
}

const StatusUpdateForm: React.FC<StatusUpdateFormProps> = ({ component, onClose, onUpdate }) => {
  const [status, setStatus] = useState<ComponentStatus>(component.status);
  const [fittedTo, setFittedTo] = useState(component.fittedTo || '');
  const [repairDate, setRepairDate] = useState(component.repairSentDate || '');
  const [maintRef, setMaintRef] = useState(component.maintenanceRef || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    const updated: EpsComponent = {
      ...component,
      status,
      fittedTo: status === ComponentStatus.SERVICEABLE ? fittedTo : undefined,
      repairSentDate: status === ComponentStatus.UNSERVICEABLE ? repairDate : undefined,
      maintenanceRef: status === ComponentStatus.UNSERVICEABLE ? maintRef : undefined,
      lastUpdated: new Date().toISOString().split('T')[0],
      history: [
        {
          status,
          timestamp,
          details: status === ComponentStatus.SERVICEABLE 
            ? (fittedTo ? `Fitted to ${fittedTo}` : 'Returned to Stock') 
            : `Maintenance logged: ${maintRef || 'N/A'}`
        },
        ...component.history
      ]
    };
    onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Update Component</h2>
            <p className="text-sm text-slate-500 font-medium">Serial: <span className="font-mono text-blue-600">{component.serialNumber}</span></p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Serviceability Status</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setStatus(ComponentStatus.SERVICEABLE)}
                  className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    status === ComponentStatus.SERVICEABLE 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                      : 'border-slate-100 bg-white text-slate-400 grayscale'
                  }`}
                >
                  <i className="fa-solid fa-circle-check text-xl"></i>
                  <span className="font-bold">SERVICEABLE</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(ComponentStatus.UNSERVICEABLE)}
                  className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    status === ComponentStatus.UNSERVICEABLE 
                      ? 'border-rose-500 bg-rose-50 text-rose-700' 
                      : 'border-slate-100 bg-white text-slate-400 grayscale'
                  }`}
                >
                  <i className="fa-solid fa-circle-xmark text-xl"></i>
                  <span className="font-bold">UNSERVICEABLE</span>
                </button>
              </div>
            </div>

            {status === ComponentStatus.SERVICEABLE ? (
              <div className="space-y-4 animate-in slide-in-from-top duration-300">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Fitted to Aircraft</label>
                  <input 
                    type="text" 
                    value={fittedTo}
                    onChange={(e) => setFittedTo(e.target.value)}
                    placeholder="e.g. M50-21"
                    className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-slate-400 mt-2">Leave blank if currently in stock.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-top duration-300">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sent for Repair Date</label>
                  <input 
                    type="date" 
                    value={repairDate}
                    onChange={(e) => setRepairDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Maintenance Reference</label>
                  <textarea 
                    value={maintRef}
                    onChange={(e) => setMaintRef(e.target.value)}
                    placeholder="AWD (Awaiting Demand) / DMD / ASB Reference..."
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all"
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Sync Records
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateForm;