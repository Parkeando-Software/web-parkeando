import React from 'react';
import { Star } from 'lucide-react';

export default function ReputationCard({ reputation }) {
  return (
    <div className="md:col-span-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Nivel de Reputación</p>
        <Star size={24} className="text-yellow-500" />
      </div>
      <p className="text-5xl font-bold mt-2 text-slate-900 dark:text-white">
        {reputation}
      </p>
      <p className="text-xs mt-2 text-slate-500 dark:text-slate-400">
        Se incrementa 0.1 cada 10 puntos (Máx 10)
      </p>
    </div>
  );
}
