import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@context/ThemeContext";
import { SECTIONS, CONTENT, BRAND_PRIMARY } from "@utils/privacy-content";
import logo from "@assets/logo.png";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("");
  const { theme } = useTheme();

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentSection = "";
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) currentSection = section.id;
      });
      if (currentSection !== activeSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Definición de estilos según el tema
  const bgCard = theme === "dark" ? "bg-slate-800" : "bg-white/80";
  const borderCard = theme === "dark" ? "border-slate-700" : "border-slate-200";
  const textCard = theme === "dark" ? "text-slate-300" : "text-slate-700";
  const textHeading = theme === "dark" ? "text-white" : "text-slate-900";
  const textBody = theme === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <section
      className={`relative py-16 md:py-24 px-6 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
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

        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="ParKeando"
              width={120}
              height={120}
              className="mb-4"
            />
            <div
              className="px-4 py-2 rounded-full text-sm font-medium mb-4 border backdrop-blur-sm"
              style={{
                backgroundColor: `${BRAND_PRIMARY}14`,
                color: BRAND_PRIMARY,
                borderColor: `${BRAND_PRIMARY}40`,
              }}
            >
              Legal
            </div>
          </div>
          <h1
            className={`whitespace-nowrap text-4xl md:text-5xl font-bold tracking-tight ml-4 mb-4 ${textHeading}`}
          >
            Política de Privacidad de ParKeando
          </h1>
          <p className={`${textHeading}`}>
            Última actualización: <time dateTime="2025-01-01">01/01/2025</time>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
          {/* Índice lateral */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav
              className={`sticky top-24 rounded-2xl border ${borderCard} ${bgCard} backdrop-blur-sm p-4 shadow-sm transition-all`}
            >
              <p
                className={`text-sm font-bold uppercase tracking-wider mb-3 ${textBody}`}
              >
                Contenido
              </p>
              <ol className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById(section.id)
                            ?.scrollIntoView({ behavior: "smooth" });
                          setActiveSection(section.id);
                        }}
                        className={`block py-2 px-3 text-sm rounded-lg transition-all duration-200 border-l-2 ${
                          isActive
                            ? `bg-blue-50/10 text-[${BRAND_PRIMARY}] font-semibold border-[${BRAND_PRIMARY}] translate-x-1`
                            : `border-transparent ${textBody} hover:text-blue-500 hover:bg-slate-100/50`
                        }`}
                        style={{ color: isActive ? BRAND_PRIMARY : undefined }}
                      >
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          {/* Contenido */}
          <article className="lg:col-span-9 space-y-12">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <h2
                  className={`text-2xl md:text-3xl font-semibold mb-6 ${textBody}`}
                >
                  {section.title}
                </h2>
                <div
                  className={`rounded-2xl border ${borderCard} ${bgCard} p-6 shadow-sm ${textCard}`}
                >
                  {
                    CONTENT[
                      section.id === "base-legal" ? "baseLegal" : section.id
                    ]
                  }
                </div>
              </section>
            ))}
            <div
              className={`mt-12 pt-8 border-t ${borderCard} text-sm ${textBody}`}
            >
              Si tienes dudas sobre esta política, contáctanos en{" "}
              <a
                href="mailto:info@parkeando.es"
                className="text-blue-700 hover:underline font-medium"
              >
                info@parkeando.es
              </a>
              . También puedes consultar nuestros{" "}
              <Link to="/terms" className="text-blue-700 hover:underline font-medium">
                Términos y Condiciones
              </Link>{" "}
              y nuestra{" "}
              <Link to="/cookies" className="text-blue-700 hover:underline font-medium">
                Política de Cookies
              </Link>.
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
