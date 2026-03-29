import React from "react";
import { Link } from "react-router-dom";
import FooterSection from "@components/Landing/Footer/FooterSection";
import footerSections from "@/utils/footer-sections.json";
import { useCookie } from "@/context/CookieContext";
import logo from "@assets/logo.png";

export default function Footer() {
  const { setSettingsOpen } = useCookie();

  return (
    <footer className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      <div className="absolute left-[-5rem] top-8 h-40 w-40 rounded-full bg-sky-500/12 blur-3xl" />
      <div className="absolute right-[-4rem] bottom-0 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 flex items-center space-x-3">
              <img
                src={logo}
                alt="ParKeando"
                width={42}
                height={42}
                className="rounded-2xl"
              />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-100/55">
                  Smart street parking
                </div>
                <span className="text-xl font-extrabold text-[#00B100]">
                  ParKeando
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-slate-400">
              La solución más inteligente para encontrar estacionamiento en tu
              ciudad.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-center gap-3 text-center md:flex-row">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} ParKeando. Todos los derechos
              reservados.
            </p>
            <button
              onClick={() => setSettingsOpen(true)}
              className="text-sm text-slate-400 underline decoration-slate-600 underline-offset-4 transition hover:text-white"
            >
              Preferencias de cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
