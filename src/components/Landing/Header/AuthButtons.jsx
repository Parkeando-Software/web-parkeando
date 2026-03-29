import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Avatar from "@components/Dashboard/UserDashboard/Tabs/Profile/Avatar";

export function AuthButtons({ className = "" }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <Link
          to="/user"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2.5 text-slate-900 shadow-lg transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-200 lg:w-auto"
        >
          <Avatar avatar={user?.avatar ?? 0} size="sm" />
          <span className="font-medium">Mi Perfil</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link
        to="/login"
        className="block w-full rounded-full border border-slate-200/80 bg-white/82 px-5 py-3 text-center text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200 lg:w-auto"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="block w-full rounded-full bg-[linear-gradient(135deg,#00AB00,#1ed760)] px-5 py-3 text-center font-semibold text-white shadow-[0_18px_40px_rgba(0,171,0,0.28)] transition hover:-translate-y-0.5 hover:brightness-105 lg:w-auto"
      >
        Registro
      </Link>
    </div>
  );
}
