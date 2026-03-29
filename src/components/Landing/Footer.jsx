import React from "react";
import { Link } from "react-router-dom";
import FooterSection from "@components/Landing/Footer/FooterSection";
import footerSections from "@/utils/footer-sections.json";
import { useCookie } from "@/context/CookieContext";
import logo from "@assets/logo.png";

export default function Footer() {
  const { setSettingsOpen } = useCookie();
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img
                src={logo}
                alt="ParKeando"
                width={32}
                height={32}
                className="cursor-pointer"
              />
              <span className="text-xl font-bold text-[#00B100] cursor-pointer">
                ParKeando
              </span>
            </Link>
            <p className="text-gray-400">
              La solución más inteligente para encontrar estacionamiento en tu
              ciudad.
            </p>
          </div>

          {/* Secciones del footer */}
          {footerSections.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex justify-center">
            <p className="text-gray-400 text-center">
              &copy; {new Date().getFullYear()} ParKeando. Todos los derechos
              reservados.
            </p>
            <div className="ml-4">
               <button 
                  onClick={() => setSettingsOpen(true)}
                  className="text-gray-400 hover:text-white text-sm underline"
                >
                  Preferencias de cookies
               </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
