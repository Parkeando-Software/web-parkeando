import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AuthLogin from "@components/Auth/AuthLogin";
import AuthRegister from "@components/Auth/AuthRegister";
import LoginForm from "@components/Auth/LoginForm";
import RegisterForm from "@components/Auth/RegisterForm";

export default function AuthForm({
  onLogin,
  onRegister,
  onForgotPassword,
  onLoginWithGoogle,
  initialTab = "login",
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [showPassLogin, setShowPassLogin] = useState(false);
  const [showPassRegister, setShowPassRegister] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 items-start">
      {/* ----------- IZQUIERDA (texto animado) ----------- */}
      <AnimatePresence mode="wait">
        {activeTab === "login" ? (
          <AuthLogin key="leftLogin" />
        ) : (
          <AuthRegister key="leftRegister" />
        )}
      </AnimatePresence>

      {/* ----------- DERECHA (tu formulario) ----------- */}
      <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-md md:p-10 dark:bg-slate-950/50">
        {/* Tabs */}
        <div className="flex relative mb-6">
          <button
            className={`flex-1 py-3 text-center font-medium z-10 transition-colors ${
              activeTab === "login" ? "text-[#0083E6]" : "text-slate-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            <span className="cursor-pointer">Iniciar sesión</span>
          </button>

          <button
            className={`flex-1 py-3 text-center font-medium z-10 transition-colors ${
              activeTab === "register" ? "text-[#0083E6]" : "text-slate-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            <span className="cursor-pointer">Registrarse</span>
          </button>

          <motion.div
            layout
            className="absolute bottom-0 w-1/2 h-1 bg-blue-500 rounded-full"
            animate={{ x: activeTab === "login" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          />
        </div>

        {/* Contenedor animado del formulario */}
        <motion.div
          layout
          className="relative overflow-hidden"
          transition={{ type: "spring", stiffness: 200, damping: 23 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <LoginForm
                formData={formData}
                handleChange={handleChange}
                onLogin={onLogin}
                showPassLogin={showPassLogin}
                setShowPassLogin={setShowPassLogin}
                onForgotPassword={onForgotPassword}
                onLoginWithGoogle={onLoginWithGoogle}
                loading={loading}
              />
            ) : (
              <RegisterForm
                formData={formData}
                handleChange={handleChange}
                onRegister={onRegister}
                showPassRegister={showPassRegister}
                setShowPassRegister={setShowPassRegister}
                showConfirmPass={showConfirmPass}
                setShowConfirmPass={setShowConfirmPass}
                setFormData={setFormData}
                onLoginWithGoogle={onLoginWithGoogle}
                loading={loading}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
