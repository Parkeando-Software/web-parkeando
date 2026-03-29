import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6 text-slate-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-slate-800" />
      )}
    </button>
  );
}
