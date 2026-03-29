import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPinned, Menu } from "lucide-react";
import { ThemeToggle } from "@components/Landing/ThemeToggle";
import { DesktopNav } from "@components/Landing/Header/DesktopNav";
import { MobileMenu } from "@components/Landing/Header/MobileMenu";
import { AuthButtons } from "@components/Landing/Header/AuthButtons";
import { useScrollPosition } from "@hooks/useScrollPosition";
import logo from "@assets/logo.png";

export function Header({ scrollToSection }) {
  const isScrolled = useScrollPosition(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[1.75rem] border px-4 py-3 transition-all duration-300 sm:px-6 ${
          isScrolled
            ? "border-white/75 bg-white/82 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/82"
            : "border-white/55 bg-white/56 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/58"
        }`}
      >
        <motion.div
          animate={{ scale: isScrolled ? 0.94 : 1 }}
          className="transition-transform duration-300"
        >
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <img
                src={logo}
                alt="ParKeando"
                className="h-14 w-14 rounded-2xl shadow-lg md:h-16 md:w-16"
              />
              <div className="absolute -bottom-1 -right-1 rounded-full border border-white/80 bg-white p-1 text-[#0083E6] shadow-md dark:border-slate-800 dark:bg-slate-900">
                <MapPinned size={12} />
              </div>
            </div>
            <div className="hidden min-[420px]:block">
              <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                Smart street parking
              </div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                ParKeando
              </div>
            </div>
          </Link>
        </motion.div>

        <DesktopNav scrollToSection={scrollToSection} />

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <AuthButtons />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="rounded-full border border-slate-200/80 bg-white/88 p-3 text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/88 dark:text-slate-100"
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        scrollToSection={scrollToSection}
      />
    </header>
  );
}
