import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Power, Shield } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import DashboardNotificationIcon from "@components/Dashboard/UserDashboard/DashboardNotificationIcon";
import DashboardTabs from "@components/Dashboard/UserDashboard/DashboardTabs";
import Avatar from "@components/Dashboard/UserDashboard/Tabs/Profile/Avatar";
import { useAuth } from "@context/AuthContext";
import api from "@/config/api";
import apiRoutes from "@/config/apiRoutes";

export default function DashboardMobileMenu({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  theme,
}) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVariants = {
    // ... (rest of menuVariants code)
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
    // ... (rest of itemVariants code)
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    hover: {
      scale: 1.05,
      x: 5,
      color: "#16a34a",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const handleLogout = async () => {
    onClose();

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
          <div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-4 py-8">
            {/* Botón cerrar */}
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

            {/* Avatar seleccionable por el usuario */}
            <Avatar avatar={user?.avatar ?? 0} size="lg" />

            {/* Notificaciones */}
            <DashboardNotificationIcon mobile={true} />

            {/* Separador visual */}
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-slate-200 dark:bg-slate-700 my-8 rounded-full"
            />

            {/* Tabs */}
            <DashboardTabs
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                onClose();
              }}
              mobile={true}
              theme={theme}
            />

            {/* Separador visual */}
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-slate-200 dark:bg-slate-700 my-8 rounded-full"
            />

            {/* Enlace al panel de administrador si el usuario es admin */}
            {(user?.role_id === 3 || user?.is_admin || user?.admin === true) && (
              <Link
                to="/admin"
                onClick={onClose}
                className="flex items-center justify-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition rounded-lg mb-2"
              >
                <Shield className="mr-2 w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-800 dark:text-slate-200">
                  Panel Admin
                </span>
              </Link>
            )}

            {/* Cerrar sesión */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition rounded-lg"
            >
              <Power className="mr-2 w-5 h-5 text-red-500" />
              <span className="text-sm text-slate-800 dark:text-slate-200">
                Cerrar sesión
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
