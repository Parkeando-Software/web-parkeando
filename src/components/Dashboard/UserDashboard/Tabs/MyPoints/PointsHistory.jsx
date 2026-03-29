import React from 'react';
import { History, X } from 'lucide-react';
import PointsHistoryItem from './PointsHistoryItem';

export default function PointsHistory({ 
  history, 
  loading, 
  showAll, 
  onToggleShowAll,
  formatDate,
  historyRef,
  onHide
}) {
  const displayedHistory = showAll ? history : history.slice(0, 5);

  return (
    <div ref={historyRef} className="pt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <History size={20} className="mr-2 text-[#0083E6]" />
          Historial de Puntos
        </h2>
        
        {onHide && (
          <button
            onClick={onHide}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
            aria-label="Ocultar historial"
          >
            <X size={16} />
            <span>Ocultar</span>
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <p className="text-slate-500 dark:text-slate-400">Cargando historial...</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {displayedHistory.map((item) => (
              <PointsHistoryItem 
                key={item.id} 
                item={item} 
                formatDate={formatDate}
              />
            ))}
            
            {history.length === 0 && (
              <p className="text-center text-slate-500 dark:text-slate-400 p-8 border rounded-lg border-dashed">
                Aún no tienes actividad de puntos.
              </p>
            )}
          </div>
          
          {/* Show more button */}
          {history.length > 5 && !showAll && (
            <div className="mt-4 text-center">
              <button
                onClick={() => onToggleShowAll(true)}
                className="px-6 py-2 bg-[#0083E6] hover:bg-[#006bb3] text-white rounded-lg transition font-medium"
              >
                Ver todos ({history.length} transacciones)
              </button>
            </div>
          )}
          
          {showAll && history.length > 5 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => onToggleShowAll(false)}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg transition font-medium"
              >
                Ver menos
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
