import React from "react";
import { Zap } from "lucide-react";
import FeaturesCTA from "@components/Landing/FeatureSection/FeaturesCTA";
import stepsImage from "@assets/features-steps.png";

export default function Features() {
  return (
    <section id="features" className="landing-section pt-14 md:pt-18">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="section-badge mb-8 text-slate-700 dark:text-slate-200">
            <Zap size={16} className="text-[#0083E6]" />
            Asi funciona ParKeando
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl dark:text-white">
            Cuatro pasos para
            <span className="block text-[#0083E6]">entender el valor al instante.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl dark:text-slate-300">
            Una dinamica visual, clara y facil de entender tanto para usuarios
            como para cualquiera que vea el producto por primera vez.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.8rem] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(125,211,252,0.16),rgba(255,255,255,0.96))] p-1 md:rounded-[2.4rem] md:p-3 shadow-[0_28px_70px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-[linear-gradient(180deg,rgba(14,165,233,0.08),rgba(15,23,42,0.9))]">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
          <img
            src={stepsImage}
            alt="Cuatro pasos de funcionamiento de ParKeando"
            className="relative z-10 mx-auto w-[104%] max-w-none rounded-[1.2rem] object-contain shadow-[0_18px_40px_rgba(0,131,230,0.14)] md:w-full md:rounded-[1.85rem]"
          />
        </div>

        <FeaturesCTA />
      </div>
    </section>
  );
}
