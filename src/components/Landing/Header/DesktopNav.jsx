import React from "react";
import { NAV_ITEMS } from "@utils/menu-sections";

export function DesktopNav({ scrollToSection }) {
  return (
    <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/72 p-2 shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/72 lg:flex">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="group relative rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-white hover:text-[#0083E6] dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <span className="relative z-10">{item.label}</span>
          <span className="absolute inset-x-4 bottom-1 h-0.5 scale-x-0 rounded-full bg-[#0083E6] transition-transform duration-300 group-hover:scale-x-100 dark:bg-sky-300" />
        </button>
      ))}
    </nav>
  );
}
