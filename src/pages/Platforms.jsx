import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Smartphone,
  Map,
  Globe,
  History,
  Navigation,
  Bell,
  Clock,
  Database,
  BarChart,
  Car,
  PieChart,
} from "lucide-react";
import { useTheme } from "@context/ThemeContext";
import logo from "@assets/logo.png";

export default function Platforms() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const webUrl = import.meta.env.VITE_WEB_URL || window.location.origin;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const platforms = [
    {
      type: "App Móvil",
      features: [
        { text: "Navegación intuitiva", icon: Map },
        { text: "Acceso rápido en movimiento", icon: Clock },
        { text: "Navegación GPS integrada", icon: Navigation },
        { text: "Notificaciones en tiempo real", icon: Bell },
        { text: "Modo offline para zonas sin cobertura", icon: Database },
      ],
      benefits:
        "Perfecta para usuarios en movimiento que necesitan acceso rápido",
      icon: Smartphone,
    },
    {
      type: "Plataforma Web",
      features: [
        { text: "Gestión detallada de cuenta", icon: Database },
        { text: "Visualización de estadísticas", icon: PieChart },
        { text: "Historial de estacionamiento en tu bolsillo", icon: History },
        { text: "Administración de vehículos", icon: Car },
        { text: "Reportes mensuales detallados", icon: BarChart },
      ],
      benefits: "Ideal para planificación y gestión administrativa",
      icon: Globe,
    },
  ];

  const bgCard = theme === "dark" ? "bg-slate-800/80" : "bg-white/80";
  const borderCard = theme === "dark" ? "border-slate-700" : "border-slate-200";
  const textHeading = theme === "dark" ? "text-white" : "text-slate-900";
  const textBody = theme === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
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
            <h1 className={`text-4xl font-bold mb-4 ${textHeading}`}>
              ParKeando en Todas Partes
            </h1>
            <p className={`text-xl mb-4 ${textBody}`}>
              Accede a ParKeando como prefieras: desde tu móvil o desde la web
            </p>
          </div>
        </div>

        {/* Grid de plataformas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 ${bgCard} border ${borderCard}`}
            >
              <platform.icon className="w-16 h-16 mb-6 mx-auto text-blue-600" />
              <h3
                className={`text-2xl font-semibold mb-4 text-center ${textHeading}`}
              >
                {platform.type}
              </h3>
              <ul className="space-y-3 mb-20">
                {platform.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-green-500 shrink-0" />
                    <span className={textBody}>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <p className={`italic text-center ${textBody}`}>
                {platform.benefits}
              </p>
            </div>
          ))}
        </div>

        {/* Sección de descarga */}
        <div className="text-center mt-16">
          <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>
            Disponible donde lo necesites
          </h2>
          <p className={`mb-8 ${textBody}`}>
            Descarga nuestra app o accede vía web para comenzar a usar ParKeando
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.parkeando.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-block"
            >
              Descargar App
            </a>
            <button
              onClick={() => navigate("/user")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Acceder vía Web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
