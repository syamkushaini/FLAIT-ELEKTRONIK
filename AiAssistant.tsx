
import React, { useState, useEffect } from 'react';
import { getFleetInsights } from '../services/geminiService';
import { EpsComponent } from '../types';

interface AiAssistantProps {
  components: EpsComponent[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ components }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getFleetInsights(components);
    setInsight(result || "No data available.");
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [components]);

  return (
    /* Changed class to className below */
    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <i className="fa-solid fa-microchip"></i>
        </div>
        <div>
          <h3 className="font-bold text-blue-100">Fleet Maintenance AI</h3>
          <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Real-time Analysis</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-slate-800 rounded animate-pulse w-1/2"></div>
          </div>
        ) : insight ? (
          <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-line prose prose-invert">
            {insight}
          </div>
        ) : (
          <p className="text-slate-500 text-sm italic">Initializing analysis...</p>
        )}
      </div>

      <button 
        onClick={fetchInsights}
        className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-rotate text-[10px]"></i>
        Refresh Insights
      </button>
    </div>
  );
};

export default AiAssistant;
