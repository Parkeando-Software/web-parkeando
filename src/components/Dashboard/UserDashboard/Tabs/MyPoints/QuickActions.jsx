import React from 'react';
import { History } from 'lucide-react';
import EarnPointsDialog from './EarnPointsDialog';

export default function QuickActions({ onViewHistory }) {
  return (
    <div className="md:col-span-1 flex flex-col justify-between space-y-4">
      <button 
        onClick={onViewHistory}
        className="flex-1 flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition min-h-[50px]"
      >
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
          Ver Historial Completo
        </span>
        <History size={20} className="text-slate-500 dark:text-slate-400" />
      </button>
      
      <EarnPointsDialog />
    </div>
  );
}
