import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "@/config/api";
import { Header } from "@components/Landing/Header";
import Footer from "@components/Landing/Footer";
import { motion } from "framer-motion";
import { useTheme } from "@context/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ActivateAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Leer token desde query string
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("No se proporcionó un token de activación.");
      return;
    }

    const activateAccount = async () => {
      try {
        const response = await api.get(`/activate/${token}`);
        setStatus("success");
        setMessage(response.data.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message || "No se pudo activar la cuenta."
        );
      }
    };

    activateAccount();
  }, [location.search]);

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
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {status === "loading" && "Activando cuenta..."}
                {status === "success" && "¡Cuenta activada!"}
                {status === "error" && "Error"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {status === "loading" && (
                 <div className="flex justify-center">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                 </div>
              )}
              
              {status !== "loading" && (
                <>
                  <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{message}</p>
                  
                  {status === "success" && (
                    <>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Ya puedes iniciar sesión en la aplicación o en la web.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                        <Button asChild className="px-6 py-2 font-semibold text-lg shadow-lg hover:shadow-primary/25">
                          <Link to="/login">
                            Iniciar sesión
                          </Link>
                        </Button>
                        <Button asChild variant="secondary" className="px-6 py-2 font-semibold text-lg">
                          <Link to="/">
                            Ir al inicio
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}
                   {status === "error" && (
                      <div className="flex justify-center pt-2">
                        <Button asChild variant="secondary" className="px-6 py-2 font-semibold text-lg">
                          <Link to="/">
                            Ir al inicio
                          </Link>
                        </Button>
                      </div>
                   )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
