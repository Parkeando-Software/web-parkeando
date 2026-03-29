import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-slate-200/80 bg-white/82 p-3 shadow-lg transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/82"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-amber-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-slate-800" />
      )}
    </button>
  );
}
