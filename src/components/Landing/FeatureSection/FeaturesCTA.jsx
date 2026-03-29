import React from "react";
import { ArrowRight } from "lucide-react";

export default function FeaturesCTA() {
  return (
    <div className="mt-14 text-center md:mt-16">
      <div className="premium-panel relative overflow-hidden p-10 md:p-12">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-sky-200/35 to-transparent dark:from-sky-500/10" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-emerald-200/35 to-transparent dark:from-emerald-500/10" />

        <h3 className="relative text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          Todo pensado para que aparcar se sienta menos pesado y mucho mas rapido.
        </h3>
        <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Descubre una experiencia mas clara, mas util y mas agradable desde el
          primer uso.
        </p>
        <button
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#0083E6,#19a1ff)] px-8 py-4 font-bold text-white shadow-[0_22px_44px_rgba(0,131,230,0.28)] transition hover:-translate-y-0.5 hover:brightness-105"
          onClick={() => {
            const el = document.getElementById("screenshots");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Ver la experiencia
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
