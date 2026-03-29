import React from 'react';

export default function PointsHistoryItem({ item, formatDate }) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-md transition">
      <div className="flex flex-col">
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {item.description || 'Transacción de puntos'}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatDate(item.created_at)}
        </span>
      </div>
      <span 
        className={`font-bold text-lg ${
          item.points > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}
      >
        {item.points > 0 ? '+' : ''}{item.points}
      </span>
    </div>
  );
}
