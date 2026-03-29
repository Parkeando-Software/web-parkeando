import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { faqCategories } from "@/utils/faq-data";
import logo from "@assets/logo.png";

export default function Help() {
  const [activeCategory, setActiveCategory] = useState("general");
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            to="/"
            className={`inline-flex items-center text-sm transition-colors ${
              theme === "dark"
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Cabecera */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="ParKeando"
              width={120}
              height={120}
              className="mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">Centro de Ayuda</h1>
            <p
              className={
                theme === "dark"
                  ? "text-slate-300 text-xl"
                  : "text-gray-600 text-xl"
              }
            >
              Encuentra respuestas a todas tus preguntas sobre ParKeando
            </p>
          </div>
        </div>

        {/* Sección de contacto rápido */}
        <div
          className={`rounded-lg shadow-lg p-8 mb-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center ${
            theme === "dark" ? "bg-slate-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-6">
            ¿Necesitas ayuda inmediata?
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-4xl">📧</span>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p
                  className={
                    theme === "dark" ? "text-slate-300" : "text-gray-600"
                  }
                >
                  info@parkeando.es
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación de categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(faqCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : theme === "dark"
                  ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {faqCategories[category].title}
            </button>
          ))}
        </div>

        {/* Preguntas frecuentes */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqCategories[activeCategory].questions.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg p-6 ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold mb-3">{faq.q}</h3>
                <p
                  className={
                    theme === "dark" ? "text-slate-300" : "text-gray-600"
                  }
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de soporte adicional */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p
            className={
              theme === "dark" ? "text-slate-300 mb-8" : "text-gray-600 mb-8"
            }
          >
            Nuestro equipo de soporte está disponible para ayudarte
          </p>
          <Link
            to="/contact"
            className={`px-8 py-3 rounded-lg inline-block transition-colors ${
              theme === "dark"
                ? "bg-blue-700 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Contactar Soporte
          </Link>
        </div>
      </div>
    </div>
  );
}
