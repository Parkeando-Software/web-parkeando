import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@components/Landing/Header";
import Footer from "@components/Landing/Footer";
import { motion } from "framer-motion";
import { useTheme } from "@context/ThemeContext";

export default function ConfirmDeleteRequest() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de confirmación no proporcionado.");
      return;
    }

    const confirmRequest = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/account/delete-request/confirm/${token}`,
          { method: "POST" }
        );

        const data = await res.json().catch(() => null);

        if (res.ok) {
          setStatus("success");
          setMessage(
            "Hemos confirmado tu solicitud de eliminación. Tu cuenta será eliminada de forma permanente en un plazo máximo de 30 días. Si cambias de opinión, todavía puedes cancelar la solicitud dentro de ese período."
          );
        } else {
          setStatus("error");
          if (data?.error) setMessage(data.error);
          else if (data?.message) setMessage(data.message);
          else
            setMessage(
              "No se pudo confirmar la solicitud. El token puede ser inválido o haber expirado."
            );
        }
      } catch (e) {
        setStatus("error");
        setMessage(
          "Error de red al intentar confirmar la solicitud. Por favor, inténtalo más tarde."
        );
      }
    };

    confirmRequest();
  }, [token]);

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
          className="w-full max-w-lg relative z-10"
        >
          <div className="flex flex-col items-center mb-8">
             <Link to="/">
              <img src="/logo.png" alt="ParKeando" className="w-24 h-24 object-contain" />
            </Link>
          </div>

          <Card className={`w-full shadow-xl border-0 ${theme === "dark" ? "bg-slate-800/50 backdrop-blur-sm text-white" : "bg-white/80 backdrop-blur-sm"}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {status === "loading" && "Confirmando eliminación..."}
                {status === "success" && "Solicitud confirmada"}
                {status === "error" && "Error al confirmar"}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-6 text-center">
                {status === "loading" && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                      Estamos procesando la confirmación. Esto puede tardar unos
                      segundos.
                    </p>
                  </div>
                )}

                  {status === "success" && (
                    <>
                      <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{message}</p>
                      <div className="flex justify-center pt-4">
                        <Button asChild className="px-6 py-2 font-semibold text-lg shadow-lg hover:shadow-primary/25">
                          <Link to="/">
                            Ir a inicio
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}

                  {status === "error" && (
                    <>
                      <p className="text-red-500 font-medium">{message}</p>
                      <div className="flex justify-center pt-4 space-x-3">
                        <Button asChild variant="secondary" className="px-6 py-2 font-semibold text-lg">
                          <Link to="/">
                            Ir a inicio
                          </Link>
                        </Button>
                        <Button
                          onClick={() => window.location.reload()}
                          className="px-6 py-2 font-semibold text-lg shadow-lg hover:shadow-primary/25"
                        >
                          Reintentar
                        </Button>
                      </div>
                    </>
                  )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
