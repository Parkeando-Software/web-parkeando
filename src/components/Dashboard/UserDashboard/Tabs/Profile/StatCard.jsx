import React from 'react';

export default function StatCard({ icon, color, label, value }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
      <div className={`${color} p-3 rounded-lg shadow-sm`}>{icon}</div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}