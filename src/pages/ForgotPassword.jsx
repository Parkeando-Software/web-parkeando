import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Landing/Header";
import Footer from "@/components/Landing/Footer";
import { useTheme } from "@/context/ThemeContext";
import { useSwal } from "@/hooks/useSwal";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";
import AnimatedInput from "@components/Auth/AnimatedInput";

export default function ForgotPassword() {
  const Swal = useSwal();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Introduce tu correo",
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.post(apiRoutes.forgotPassword(), { email });
      Swal.fire({
        icon: "success",
        title: "Enviado",
        text: "Revisa tu correo para el enlace de restablecimiento",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => navigate("/login"));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "No se pudo enviar el correo";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-linear-to-tr transition-colors duration-300 ${
        theme === "dark"
          ? "dark:from-slate-900 dark:to-slate-800 text-white"
          : "from-blue-100 to-white text-black"
      }`}
    >
      <Header />

      <main className="flex-1 pt-64 pb-20 flex justify-center items-start px-4">
        <div className="w-full max-w-md bg-white/50 dark:bg-slate-900/90 shadow-lg rounded-2xl p-10">
          <h2 className="text-2xl font-semibold mb-10 text-center  text-slate-600 dark:text-slate-100">
            Recuperar contraseña
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatedInput
              label="Correo"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar enlace"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <Button asChild variant="link" className="text-primary hover:text-primary/80">
              <Link to="/login">
                Volver a iniciar sesión
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
