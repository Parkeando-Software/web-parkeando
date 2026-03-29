import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { features } from "@/utils/features-data";
import logo from "@assets/logo.png";

export default function Features() {
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
            <h1 className="text-4xl font-bold mb-4">
              Características de ParKeando
            </h1>
            <p
              className={`text-xl mb-0 ${
                theme === "dark" ? "text-slate-300" : "text-gray-600"
              }`}
            >
              ParKeando es una plataforma colaborativa y gratuita para encontrar
              aparcamiento. Los usuarios avisan cuando dejan libre una plaza
              para que otros puedan ocuparla. No hay pagos ni reservas, solo
              ayuda entre conductores.
            </p>
          </div>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              }`}
            >
              <feature.icon
                className={`w-12 h-12 mb-4 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p
                className={
                  theme === "dark" ? "text-slate-300" : "text-gray-600"
                }
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">¿Listo para empezar?</h2>
          <p
            className={
              theme === "dark" ? "text-slate-300 mb-8" : "text-gray-600 mb-8"
            }
          >
            Únete a miles de usuarios que ya disfrutan de ParKeando
          </p>
          <button
            onClick={() => navigate("/user")}
            className={`px-8 py-3 rounded-lg transition-colors ${
              theme === "dark"
                ? "bg-blue-700 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
