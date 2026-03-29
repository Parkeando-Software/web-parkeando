import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "@components/Landing/ThemeToggle";
import { useScrollPosition } from "@hooks/useScrollPosition";
import logo from "@assets/logo.png";

export default function HeaderAuth() {
  const isScrolled = useScrollPosition(50);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md shadow-sm h-20 dark:bg-slate-800/90 dark:shadow-none"
          : "bg-white shadow-md h-30 dark:bg-slate-900 dark:shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <motion.div
          animate={{ scale: isScrolled ? 0.8 : 1 }}
          className="flex items-center transition-transform duration-300"
        >
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
            />
          </Link>
        </motion.div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
