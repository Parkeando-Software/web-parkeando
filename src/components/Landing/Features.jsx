import React from "react";
import { Zap } from "lucide-react";
import FeatureCard from "@components/Landing/FeatureSection/FeatureCard";
import FeaturesCTA from "@components/Landing/FeatureSection/FeaturesCTA";
import { features } from "@/utils/features";

export default function Features() {
  return (
    <section
      id="features"
      className="pt-32 pb-20 px-6 relative overflow-hidden bg-linear-to-tr from-blue-100 to-white dark:from-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8 dark:bg-blue-900 dark:text-blue-200">
            <Zap size={16} className="mr-2" />
            Características Principales
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-600 dark:text-slate-300 mb-6 tracking-tight">
            Todo lo que necesitas en <span className="text-[#0083E6] dark:text-blue-500 relative">una sola app</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl md:max-w-4xl mx-auto leading-relaxed">
            ParKeando combina tecnología avanzada con simplicidad para ofrecerte la mejor experiencia de estacionamiento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        <FeaturesCTA />
      </div>
    </section>
  );
}
