import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { NAV_ITEMS } from "@utils/menu-sections";
import { AuthButtons } from "@components/Landing/Header/AuthButtons";

export function MobileMenu({ isOpen, onClose, scrollToSection }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex h-screen w-full items-start justify-center overflow-y-auto bg-slate-950/50 p-2 pt-2 backdrop-blur-md md:p-6 md:pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="premium-panel mt-0 flex w-full max-w-sm flex-col gap-5 overflow-hidden p-6 max-[900px]:max-h-[calc(100vh-1rem)] max-[900px]:overflow-y-auto"
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                  Navegacion
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  ParKeando
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-[#00AB00] p-2 text-white shadow-lg transition hover:brightness-110"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    onClose();
                  }}
                  className="group flex items-center justify-between rounded-[1.2rem] border border-white/70 bg-white/82 px-5 py-4 text-left text-lg font-semibold text-slate-800 shadow-sm transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/72 dark:text-slate-100"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="text-slate-400 transition-transform group-hover:translate-x-1 dark:text-slate-500" size={18} />
                </button>
              ))}
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-700" />

            <AuthButtons className="w-full flex-col gap-3" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
