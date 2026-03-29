import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * ProtectedRoute
 * - Comprueba si existe un token de autenticación en localStorage (`authToken`).
 * - Si `adminOnly` es true, intenta leer `user` o `userData` de localStorage
 *   y comprobar un posible flag de rol (`role`, `is_admin`, `admin`).
 * - Si no está autenticado redirige a `/login`, guardando la ruta de origen en state.
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();

  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly) {
    const isAdmin = !!(user?.role_id === 3 || user?.is_admin || user?.admin === true);
    if (!isAdmin) return <Navigate to="/" replace />;
  }

  return children;
}
