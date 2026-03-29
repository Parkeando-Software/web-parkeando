import React, { useState, useEffect } from "react";
import { Header } from "@components/Landing/Header";
import Hero from "@components/Landing/Hero";
import Features from "@components/Landing/Features";
import Screenshots from "@components/Landing/Screenshots";
import Reviews from "@components/Landing/Reviews";
import Download from "@components/Landing/Download";
import Footer from "@components/Landing/Footer";
import ScrollToTopButton from "@components/Landing/ScrollToTopButton";
import { useTheme } from "@context/ThemeContext";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  return (
    <div
      className={`flex flex-col min-h-screen relative transition-colors duration-300 
        ${
          theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}
    >
      <Header
        scrollToSection={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main
        className={`flex-1 transition-all duration-300 ${
          isMenuOpen ? "pt-0" : "pt-24"
        }`}
      >
        <Hero />
        <Features />
        <Screenshots />
        <Reviews />
        <Download />
      </main>

      <Footer />

      <ScrollToTopButton disabled={isMenuOpen} />
    </div>
  );
}
