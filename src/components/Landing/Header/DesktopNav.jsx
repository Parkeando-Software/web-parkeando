import React from "react";
import { NAV_ITEMS } from "@utils/menu-sections";

export function DesktopNav({ scrollToSection }) {
  return (
    <nav className="hidden lg:flex items-center space-x-10 text-slate-700 dark:text-slate-200 text-xl font-semibold">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="hover:text-green-600 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}