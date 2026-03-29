import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useSwal } from "@/hooks/useSwal";
import api from "@/config/api";
import { useTheme } from "@context/ThemeContext";

const BRAND_PRIMARY = "#0083E6";

export default function Contact() {
  const Swal = useSwal();
  const { theme } = useTheme(); // ✅ accedemos al tema
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/contact", formData);
      if (!data.success)
        throw new Error(data.message || "Error al enviar el mensaje");

      Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Nos pondremos en contacto contigo pronto.",
        timer: 3000,
        showConfirmButton: false,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const bgCard = theme === "dark" ? "bg-slate-800/80" : "bg-white/80";
  const borderCard = theme === "dark" ? "border-slate-700" : "border-slate-200";
  const textHeading = theme === "dark" ? "text-white" : "text-slate-900";
  const textBody = theme === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <section
      className={`relative py-16 md:py-24 px-6 overflow-hidden min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-8">
          <Link
            to="/"
            className={`inline-flex items-center text-sm transition-colors ${
              theme === "dark"
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Cabecera */}
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex flex-col items-center">
            <img
              src="src/assets/logo.png"
              alt="ParKeando"
              width={120}
              height={120}
              className="mb-4"
            />
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium mb-4 border backdrop-blur-sm`}
              style={{
                backgroundColor: `${BRAND_PRIMARY}14`,
                color: BRAND_PRIMARY,
                borderColor: `${BRAND_PRIMARY}33`,
              }}
            >
              Contacto
            </div>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${textHeading}`}
          >
            Contáctanos
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${textBody}`}>
            ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
            Completa el formulario y nos pondremos en contacto contigo lo antes
            posible.
          </p>
        </header>

        <Card
          className={`p-6 shadow-xl border-4 ${bgCard} backdrop-blur-sm ${borderCard}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className={textBody}>
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={textBody}>
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className={textBody}>
                Asunto
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="¿Sobre qué nos quieres contactar?"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className={textBody}>
                Mensaje
              </Label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className={`w-full min-h-[100px] rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  theme === "dark"
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
                placeholder="Escribe tu mensaje aquí..."
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-linear-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700"
            >
              {loading ? (
                "Enviando..."
              ) : (
                <>
                  Enviar mensaje
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Card>

        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-1 gap-8 ${bgCard} backdrop-blur-sm rounded-2xl border ${borderCard} p-6`}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className={`font-semibold ${textHeading}`}>Email</h3>
              <p className={textBody}>info@parkeando.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
