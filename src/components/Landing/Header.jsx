// components/header/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md shadow-sm h-20 dark:bg-slate-800/90 dark:shadow-none"
          : "bg-white shadow-md h-30 dark:bg-slate-900 dark:shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo Animado */}
        <motion.div
          animate={{ scale: isScrolled ? 0.8 : 1 }}
          className="flex items-center space-x-3 transition-transform duration-300"
        >
          <Link to="/">
            <img src={logo} alt="Logo" className="w-16 h-16 md:w-20 md:h-20 cursor-pointer" />
          </Link>
        </motion.div>

        {/* Navegación de Escritorio */}
        <DesktopNav scrollToSection={scrollToSection} />

        {/* Acciones de Escritorio (Auth + Theme) */}
        <div className="hidden lg:flex items-center space-x-2">
          <ThemeToggle />
          <AuthButtons />
        </div>

        {/* Botón Hamburguesa Móvil */}
        <div className="lg:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="ml-2 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            aria-label="Abrir menú"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Menú Móvil Overlay */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        scrollToSection={scrollToSection}
      />
    </header>
  );
}