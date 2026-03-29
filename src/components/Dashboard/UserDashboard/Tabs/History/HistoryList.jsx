import React from "react";
import { TrendingUp } from "lucide-react";
import HistoryItem from "@components/Dashboard/UserDashboard/Tabs/History/HistoryItem";

export default function HistoryList({ loading, data }) {
  if (loading) {
    return (
      <div className="space-y-4 min-h-[200px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 w-full bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/30 dark:bg-slate-800/30 min-h-[200px]">
        <TrendingUp size={40} className="text-slate-300 mb-3" />
        <p className="text-slate-500 text-sm">No se encontraron registros.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 min-h-[200px]">
      <div className="grid gap-4">
        {data.map((row) => (
          <HistoryItem
            key={row.item.id}
            item={row.item}
            address={row.address}
          />
        ))}
      </div>
    </div>
  );
}
