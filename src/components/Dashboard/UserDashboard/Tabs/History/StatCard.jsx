import React from "react";

export default function StatCard({
  label,
  count,
  icon,
  active,
  onClick,
  color,
}) {
  const variants = {
    violet: {
      activeCard:
        "bg-violet-50 border-violet-500 dark:bg-violet-500/10 dark:border-violet-400 ring-violet-200",
      iconBox:
        "text-violet-600 bg-white dark:bg-violet-400/20 dark:text-violet-300",
    },
    blue: {
      activeCard:
        "bg-blue-50 border-[#0083E6] dark:bg-blue-500/10 dark:border-[#0083E6] ring-blue-200",
      iconBox: "text-[#0083E6] bg-white dark:bg-blue-400/20 dark:text-blue-300",
    },
    green: {
      activeCard:
        "bg-green-50 border-green-600 dark:bg-green-500/10 dark:border-green-400 ring-green-200",
      iconBox:
        "text-green-600 bg-white dark:bg-green-400/20 dark:text-green-300",
    },
  };

  const baseStyles =
    "bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 opacity-70 hover:opacity-100 hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-600";
  const activeStyles = `shadow-md border-2 ring-2 ${variants[color].activeCard}`;
  const currentStyle = active ? activeStyles : baseStyles;

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border text-left transition-all duration-200 w-full ${currentStyle}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p
            className={`text-xs font-medium uppercase tracking-wide ${
              active ? "text-slate-600 dark:text-slate-300" : "text-slate-500"
            }`}
          >
            {label}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {count}
          </p>
        </div>
        <div
          className={`p-2.5 rounded-xl shadow-sm transition-transform duration-300 ${
            variants[color].iconBox
          } ${active ? "scale-110" : ""}`}
        >
          {icon}
        </div>
      </div>
    </button>
  );
}
