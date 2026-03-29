import React from 'react';
import { Calendar, Filter } from 'lucide-react';

export default function EmptyDateSelection() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl opacity-50"></div>
        <div className="relative bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-full">
          <Calendar size={48} className="text-[#0083E6]" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        Selecciona un periodo
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        Usa los filtros de año y mes para explorar tu historial de aparcamientos
      </p>
      
      <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
        <Filter size={16} />
        <span>Filtros disponibles arriba</span>
      </div>
    </div>
  );
}
