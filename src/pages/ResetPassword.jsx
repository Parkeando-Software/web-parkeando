import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import api from "@/config/api";
import apiRoutes from "@/config/apiRoutes";
import { useSwal } from "@/hooks/useSwal";
import { encrypt, decrypt } from "@/utils/crypto";
import { Header } from "@components/Landing/Header";
import Footer from "@components/Landing/Footer";
import { motion } from "framer-motion";
import { useTheme } from "@context/ThemeContext";

export default function ResetPassword() {
  const Swal = useSwal();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (tokenParam && emailParam) {
      // Guarda cifrado en localStorage
      localStorage.setItem("reset_token", encrypt(tokenParam));
      localStorage.setItem("reset_email", encrypt(emailParam));

      // Limpia la URL
      navigate("/reset-password", { replace: true });

      setToken(tokenParam);
      setEmail(emailParam);
    } else {
      // Recupera si ya se guardaron antes
      const storedToken = decrypt(localStorage.getItem("reset_token"));
      const storedEmail = decrypt(localStorage.getItem("reset_email"));

      if (storedToken && storedEmail) {
        setToken(storedToken);
        setEmail(storedEmail);
      } else {
        Swal.fire({
          icon: "error",
          title: "Enlace inválido",
          text: "El enlace de restablecimiento no es válido o ha expirado.",
        }).then(() => navigate("/"));
      }
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    setIsLoading(true);

    try {
      await api.post(apiRoutes.resetPassword(), {
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      });

      // Borra los datos del almacenamiento
      localStorage.removeItem("reset_token");
      localStorage.removeItem("reset_email");

      Swal.fire({
        icon: "success",
        title: "Contraseña restablecida",
        text: "Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión.",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => navigate("/login"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "No se pudo restablecer la contraseña",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-slate-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Verificando enlace...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen relative transition-colors duration-300 
        ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-black"}`}
    >
      <Header
        scrollToSection={(id) => {
          navigate(`/#${id}`);
        }}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className={`flex-1 flex items-center justify-center px-4 py-20 transition-all duration-300 ${isMenuOpen ? "pt-0" : "pt-24"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="flex flex-col items-center mb-8">
             <Link to="/">
              <img src="/logo.png" alt="ParKeando" className="w-24 h-24 object-contain" />
            </Link>
          </div>
          
          <Card className={`w-full shadow-xl border-0 ${theme === "dark" ? "bg-slate-800/50 backdrop-blur-sm text-white" : "bg-white/80 backdrop-blur-sm"}`}>
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Nueva Contraseña</CardTitle>
              <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                Ingresa tu nueva contraseña para <span className="font-medium text-primary">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className={theme === "dark" ? "text-gray-200" : ""}>
                    Nueva Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className={`pr-10 ${theme === "dark" ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:ring-primary" : ""}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                      tabIndex={-1}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className={theme === "dark" ? "text-gray-200" : ""}>
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className={`pr-10 ${theme === "dark" ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:ring-primary" : ""}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                      tabIndex={-1}
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-2 font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Restableciendo...</span>
                    </div>
                  ) : (
                    "Restablecer Contraseña"
                  )}
                </Button>
              </form>

              <div className="text-center mt-6 flex items-center justify-center gap-4 text-sm">
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Ir a iniciar sesión
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  to="/"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Volver al inicio
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
