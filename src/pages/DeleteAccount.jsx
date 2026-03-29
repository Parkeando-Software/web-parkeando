import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@config/api";
import { useSwal } from "@/hooks/useSwal";
import { Header } from "@components/Landing/Header";
import Footer from "@components/Landing/Footer";
import { motion } from "framer-motion";
import { useTheme } from "@context/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Info, UserCheck } from "lucide-react";

const BRAND_PRIMARY = "#0083E6"; 

export default function DeleteAccount() {
  const Swal = useSwal();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    reason: "",
    confirmation: false,
    additionalInfo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Pre-rellenar el email si el usuario está logueado
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.email) {
          setFormData(prev => ({
            ...prev,
            email: userData.email
          }));
        }
      } catch (error) {
        console.error("Error al parsear datos del usuario:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.confirmation) {
      Swal.fire({
        icon: 'warning',
        title: 'Confirmación requerida',
        text: 'Debes confirmar que entiendes las consecuencias de eliminar tu cuenta.',
        confirmButtonColor: BRAND_PRIMARY
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar solicitud al backend
      const response = await api.post('/account/delete-request', {
        email: formData.email,
        reason: formData.reason,
        additional_info: formData.additionalInfo
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Hemos recibido tu solicitud de eliminación de cuenta. Te contactaremos en un plazo de 30 días para confirmar la eliminación de tus datos.',
          confirmButtonColor: BRAND_PRIMARY,
          confirmButtonText: 'Entendido'
        }).then(() => {
          // Limpiar formulario
          setFormData({
            email: "",
            reason: "",
            confirmation: false,
            additionalInfo: ""
          });
          navigate("/");
        });
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo o contacta con nosotros directamente.',
        confirmButtonColor: BRAND_PRIMARY
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <main className={`flex-1 px-4 py-20 transition-all duration-300 ${isMenuOpen ? "pt-0" : "pt-24"}`}>
        <div className="container mx-auto max-w-4xl relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cabecera */}
            <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <div className="flex flex-col items-center mb-6">
                <img src="/logo.png" alt="ParKeando" className="w-24 h-24 object-contain mb-4" />
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium mb-4 border backdrop-blur-sm ${
                    theme === "dark" 
                      ? "bg-primary/20 text-primary border-primary/30" 
                      : "bg-primary/10 text-primary border-primary/20"
                  }`}
                >
                  Eliminación de Datos de <span className="font-extrabold">Parkeando</span>
                </div>
              </div>

              <h1 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Eliminación de Cuenta y Datos Personales
              </h1>

              <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
                Solicita la eliminación completa de tu cuenta y todos tus datos personales
              </p>
            </header>

            {/* Información importante */}
            <div className={`rounded-2xl border p-6 mb-8 shadow-sm backdrop-blur-sm ${
              theme === "dark" 
                ? "bg-orange-900/20 border-orange-800/50" 
                : "bg-orange-50/80 border-orange-200"
            }`}>
              <div className="flex items-start space-x-3">
                <div className="shrink-0">
                  <AlertTriangle className={`w-6 h-6 ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-orange-300" : "text-orange-800"}`}>
                    Información importante sobre la eliminación
                  </h3>
                  <ul className={`text-sm space-y-1 ${theme === "dark" ? "text-orange-200" : "text-orange-700"}`}>
                    <li>• La eliminación de tu cuenta es <strong>irreversible</strong></li>
                    <li>• Se eliminarán todos tus datos personales, historial y ParkiPoints</li>
                    <li>• No podrás recuperar tu cuenta ni tus datos una vez eliminados</li>
                    <li>• El proceso puede tardar hasta 30 días en completarse</li>
                    <li>• Te contactaremos para confirmar la eliminación</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mensaje para usuarios logueados */}
            {formData.email && (
              <div className={`rounded-2xl border p-6 mb-8 shadow-sm backdrop-blur-sm ${
                theme === "dark" 
                  ? "bg-blue-900/20 border-blue-800/50" 
                  : "bg-blue-50/80 border-blue-200"
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="shrink-0">
                    <UserCheck className={`w-6 h-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-blue-300" : "text-blue-800"}`}>
                      Usuario identificado
                    </h3>
                    <p className={`text-sm ${theme === "dark" ? "text-blue-200" : "text-blue-700"}`}>
                      Hemos detectado que tienes una sesión activa. Tu email ha sido pre-rellenado 
                      automáticamente. Si este no es tu email correcto, puedes modificarlo en el formulario.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Formulario */}
            <Card className={`border-0 shadow-xl ${theme === "dark" ? "bg-slate-800/50 backdrop-blur-sm text-white" : "bg-white/80 backdrop-blur-sm"}`}>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className={theme === "dark" ? "text-gray-200" : ""}>
                      Correo electrónico de la cuenta a eliminar *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                      className={theme === "dark" ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:ring-primary" : ""}
                    />
                  </div>

                  {/* Razón */}
                  <div className="space-y-2">
                    <Label htmlFor="reason" className={theme === "dark" ? "text-gray-200" : ""}>
                      Motivo de la eliminación *
                    </Label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        theme === "dark" 
                          ? "bg-slate-700/50 border-slate-600 text-white focus:ring-offset-slate-900" 
                          : "bg-white border-slate-200 text-slate-900"
                      }`}
                    >
                      <option value="" className={theme === "dark" ? "bg-slate-800" : ""}>Selecciona un motivo</option>
                      <option value="privacy" className={theme === "dark" ? "bg-slate-800" : ""}>Protección de privacidad</option>
                      <option value="no_use" className={theme === "dark" ? "bg-slate-800" : ""}>Ya no uso la aplicación</option>
                      <option value="dissatisfied" className={theme === "dark" ? "bg-slate-800" : ""}>No estoy satisfecho con el servicio</option>
                      <option value="duplicate" className={theme === "dark" ? "bg-slate-800" : ""}>Tengo una cuenta duplicada</option>
                      <option value="other" className={theme === "dark" ? "bg-slate-800" : ""}>Otro motivo</option>
                    </select>
                  </div>

                  {/* Información adicional */}
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo" className={theme === "dark" ? "text-gray-200" : ""}>
                      Información adicional (opcional)
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Cuéntanos más detalles sobre tu solicitud..."
                      className={theme === "dark" ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:ring-primary" : ""}
                    />
                  </div>

                  {/* Confirmación */}
                  <div className={`rounded-xl border p-4 ${
                    theme === "dark" 
                      ? "bg-red-900/20 border-red-800/50" 
                      : "bg-red-50/80 border-red-200"
                  }`}>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="confirmation"
                        name="confirmation"
                        checked={formData.confirmation}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor="confirmation" className={`text-sm cursor-pointer ${theme === "dark" ? "text-red-200" : "text-red-800"}`}>
                        <strong>Confirmo que entiendo las consecuencias:</strong> Al solicitar la eliminación de mi cuenta, 
                        todos mis datos personales, historial de uso, ParkiPoints y cualquier información asociada 
                        a mi cuenta serán eliminados permanentemente. Esta acción es irreversible y no podré recuperar 
                        mi cuenta ni mis datos.
                      </label>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.confirmation}
                      className="w-full py-6 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Enviando solicitud...</span>
                        </div>
                      ) : (
                        'Solicitar eliminación de cuenta'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <div className={`mt-8 rounded-2xl border p-6 shadow-sm backdrop-blur-sm ${
              theme === "dark" 
                ? "bg-slate-800/50 border-slate-700" 
                : "bg-white/80 border-slate-200"
            }`}>
              <div className="flex items-start space-x-3">
                <Info className={`w-6 h-6 shrink-0 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    ¿Necesitas ayuda?
                  </h3>
                  <div className={`text-sm space-y-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                    <p>
                      Si tienes dudas sobre este proceso o prefieres contactarnos directamente, 
                      puedes escribirnos a{" "}
                      <a 
                        className="text-primary hover:underline font-medium" 
                        href="mailto:info@parkeando.es"
                      >
                        info@parkeando.es
                      </a>
                    </p>
                    <p>
                      También puedes revisar nuestra{" "}
                      <Link 
                        to="/privacy" 
                        className="text-primary hover:underline font-medium"
                      >
                        Política de Privacidad
                      </Link>{" "}
                      para más información sobre cómo manejamos tus datos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cumplimiento RGPD */}
            <div className={`mt-6 text-xs text-center ${theme === "dark" ? "text-gray-500" : "text-slate-500"}`}>
              <p>
                Esta solicitud cumple con los requisitos del Reglamento General de Protección de Datos (RGPD) 
                y las políticas de Google Play Store para la eliminación de datos de usuarios.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
