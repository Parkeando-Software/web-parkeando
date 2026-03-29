import React from "react";
import {
  SquareParking,
  LocateFixed,
  Navigation,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { formatDate, handleOpenMap } from "@utils/history-utils";

export default function HistoryItem({ item, address }) {
  const isReleased = item.type?.toLowerCase() === "released";

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        handleOpenMap(item);
      }}
      className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden hover:-translate-y-1"
    >
      {/* Borde lateral de color */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${
          isReleased ? "bg-[#0083E6]" : "bg-green-500"
        }`}
      />

      <div className="p-4 pl-6 flex items-center gap-4">
        {/* Icono */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
            isReleased
              ? "bg-blue-50 text-[#0083E6] dark:bg-blue-900/20"
              : "bg-green-50 text-green-600 dark:bg-green-900/20"
          }`}
        >
          {isReleased ? <LocateFixed size={20} /> : <SquareParking size={20} />}
        </div>

        {/* Información */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base truncate pr-2 group-hover:text-[#0083E6] transition-colors">
              {address}
            </h3>
            <ExternalLink
              size={14}
              className="text-slate-300 group-hover:text-[#0083E6] opacity-0 group-hover:opacity-100 transition-all shrink-0"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`px-2 py-0.5 rounded-md font-medium border ${
                isReleased
                  ? "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                  : "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
              }`}
            >
              {isReleased ? "Liberada" : "Ocupada"}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(item.created_at)}
            </span>
          </div>
        </div>

        {/* Flecha Desktop */}
        <div className="hidden md:block text-slate-300 group-hover:translate-x-1 transition-transform">
          <Navigation size={18} />
        </div>
      </div>
    </div>
  );
}
