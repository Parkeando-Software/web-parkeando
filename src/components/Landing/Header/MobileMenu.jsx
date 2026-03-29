import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@utils/menu-sections";
import { AuthButtons } from "@components/Landing/Header/AuthButtons";

export function MobileMenu({ isOpen, onClose, scrollToSection }) {
  // Bloqueo del scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    hover: {
      scale: 1.1,
      x: 10,
      color: "#16a34a",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full h-screen z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm flex justify-center p-6 overflow-auto"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-8 py-8">
            {/* Botón cerrar animado */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="self-end p-2 rounded-full text-blue-100 bg-green-600 dark:bg-slate-800 hover:bg-green-700 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <X size={28} />
            </motion.button>

            {/* Links de navegación */}
            <motion.div
              className="flex flex-col items-center w-full space-y-8"
              variants={itemVariants}
            >
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    scrollToSection(item.id);
                    onClose();
                  }}
                  className="text-3xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Separador visual (más ancho y visible) */}
            <motion.div
              variants={itemVariants}
              className="w-2/3 h-1 bg-slate-200 dark:bg-slate-700 my-6 rounded-full opacity-90"
            />

            {/* Botones de Auth */}
            <motion.div
              className="w-full flex flex-col items-center gap-4"
              variants={itemVariants}
            >
              <AuthButtons className="flex-col space-y-4 space-x-0 w-full max-w-xs" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
