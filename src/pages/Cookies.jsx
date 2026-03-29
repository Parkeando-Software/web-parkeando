import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@context/ThemeContext";
import { cookiesSections } from "@utils/cookies-data";
import logo from "@assets/logo.png";

const BRAND_PRIMARY = "#0083E6";

export default function Cookies() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentSection = "";
      cookiesSections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) currentSection = section.id;
      });
      if (currentSection !== activeSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

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
              className={`px-4 py-2 rounded-full text-sm font-medium mb-4 border ${borderCard} backdrop-blur-sm`}
              style={{
                backgroundColor: `${BRAND_PRIMARY}14`,
                color: BRAND_PRIMARY,
              }}
            >
              Legal · Cookies
            </div>
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tight ml-4 mb-4 ${textHeading}`}
          >
            Política de Cookies de ParKeando
          </h1>
          <p className={textBody}>
            Última actualización: <time dateTime="2025-01-01">01/01/2025</time>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
          <aside className="hidden lg:block lg:col-span-3">
            <nav
              className={`sticky top-24 rounded-2xl border ${borderCard} ${bgCard} backdrop-blur-sm p-4 shadow-sm transition-all duration-300`}
            >
              <p
                className={`text-sm font-bold mb-4 uppercase tracking-wider ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Índice de contenidos
              </p>
              <ol className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar pr-2">
                {cookiesSections.map((section, idx) => {
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
                        <span className="mr-1 opacity-50">{idx + 1}.</span>{" "}
                        {section.title.replace(/^\d+\.\s/, "")}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <article className="lg:col-span-9">
            <div className="prose prose-slate max-w-none">
              {cookiesSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-12 scroll-mt-28"
                >
                  <h2
                    className={`text-2xl md:text-3xl font-semibold mb-6 ${textHeading}`}
                  >
                    {section.title}
                  </h2>
                  <div
                    className={`rounded-2xl border ${borderCard} ${bgCard} p-6 md:p-8 ${textCard} shadow-sm leading-relaxed`}
                  >
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            <div
              className={`mt-12 pt-8 border-t ${
                theme === "dark" ? "border-slate-800" : "border-slate-100"
              } text-sm ${textBody}`}
            >
              Para más información sobre privacidad, consulta nuestra{" "}
              <Link to="/privacy" className="text-blue-700 hover:underline">
                Política de Privacidad
              </Link>
              {" "}y nuestros{" "}
              <Link to="/terms" className="text-blue-700 hover:underline">
                Términos y Condiciones
              </Link>.
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
