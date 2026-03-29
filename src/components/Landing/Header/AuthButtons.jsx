import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Avatar from "@components/Dashboard/UserDashboard/Tabs/Profile/Avatar";

export function AuthButtons({ className = "" }) {
  const { isAuthenticated, user } = useAuth();

  // Si el usuario está autenticado, mostrar botón de perfil
  if (isAuthenticated) {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <Link
          to="/user"
          className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 transition cursor-pointer w-full lg:w-auto"
        >
          <Avatar avatar={user?.avatar ?? 0} size="sm" />
          <span className="font-medium">Mi Perfil</span>
        </Link>
      </div>
    );
  }

  // Si no está autenticado, mostrar botones de Login y Registro
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Link
        to="/login"
        className="px-5 py-3 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 transition cursor-pointer w-full lg:w-auto text-center block"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-5 py-3 rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 transition cursor-pointer w-full lg:w-auto text-center block"
      >
        Registro
      </Link>
    </div>
  );
}