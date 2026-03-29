import React from "react";

export default function FeaturesCTA() {
  return (
    <div className="text-center mt-20">
      <div className="relative rounded-3xl p-12 text-white shadow-md overflow-hidden bg-blue-700 dark:bg-blue-950">
        <div className="absolute inset-0 bg-black/10" />
        <h3 className="relative text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-100 dark:text-slate-300">
          ¿Listo para revolucionar tu experiencia de estacionamiento?
        </h3>
        <p className="relative text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto text-slate-100 dark:text-slate-300">
          Únete a miles de conductores que ya disfrutan de la comodidad de ParKeando
        </p>
        <button
          className="relative text-white bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg cursor-pointer border border-white/30"
          onClick={() => {
            const el = document.getElementById("download");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Comenzar Ahora
        </button>
      </div>
    </div>
  );
}
