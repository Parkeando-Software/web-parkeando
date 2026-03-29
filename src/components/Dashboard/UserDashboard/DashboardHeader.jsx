import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Power, Shield } from "lucide-react";
import logo from "@assets/logo.png";
import DashboardMobileMenu from "@components/Dashboard/UserDashboard/DashboardMobileMenu";
import { ThemeToggle } from "@components/Landing/ThemeToggle";
import DashboardNotificationIcon from "@components/Dashboard/UserDashboard/DashboardNotificationIcon";
import Avatar from "@components/Dashboard/UserDashboard/Tabs/Profile/Avatar";
import { useAuth } from "@context/AuthContext"; // Importación clave
import api from "@/config/api";
import apiRoutes from "@/config/apiRoutes";

export function DashboardHeader({
  scrollToSection,
  activeTab,
  setActiveTab,
  theme,
}) {
  // 1. Obtener 'user' y 'logout' del contexto de autenticación
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    setIsDropdownOpen(false);

    try {
      // Llamar al endpoint de logout en el backend
      await api.post(apiRoutes.logout());
    } catch (error) {
      // Continuar con el logout aunque falle la llamada al backend
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      // Cerrar sesión en el cliente
      logout();
      
      // Redirigir directamente a login
      navigate("/login");
    }
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md h-28 dark:bg-slate-900 dark:shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          animate={{ scale: 1 }}
          className="flex items-center space-x-3"
        >
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
            />
          </Link>
        </motion.div>

        {/* Acciones Desktop */}
        <div className="hidden lg:flex items-center space-x-4 relative">
          <ThemeToggle />

          {/* Icono de notificaciones */}
          <DashboardNotificationIcon />

          {/* Avatar con dropdown de cerrar sesión */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none cursor-pointer"
              aria-label="Menú de usuario"
            >
              {/* Avatar seleccionable por el usuario */}
              <Avatar avatar={user?.avatar ?? 0} size="md" />
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700 z-50"
              >
                {/* Enlace al panel de administrador si el usuario es admin */}
                {(user?.role_id === 3 || user?.is_admin || user?.admin === true) && (
                  <Link
                    to="/admin"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                  >
                    <Shield className="mr-2 w-5 h-5 text-blue-500" />
                    <span className="text-sm text-slate-800 dark:text-slate-200">
                      Panel Admin
                    </span>
                  </Link>
                )}
                
                {/* Botón cerrar sesión con icono de Power */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                >
                  <Power className="mr-2 w-5 h-5 text-red-500" />
                  <span className="text-sm text-slate-800 dark:text-slate-200">
                    Cerrar sesión
                  </span>
                </button>
              </motion.div>
            )}
          </div>
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

      {/* Menú móvil */}
      <DashboardMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        scrollToSection={scrollToSection} 
      />
    </header>
  );
}
