import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ACCENTS = {
  green: { fg: "#1A7F5A", bg: "#E9F4EF", darkFg: "#7EDDC2" },
  blue: { fg: "#1F5E8C", bg: "#E8F2FA", darkFg: "#90CAF9" },
  purple: { fg: "#5A4D8C", bg: "#F0ECF8", darkFg: "#CBA3FF" },
  orange: { fg: "#8A5A2E", bg: "#F7EFE7", darkFg: "#FBBF77" },
  indigo: { fg: "#404C99", bg: "#ECEFFA", darkFg: "#A5B4FC" },
  pink: { fg: "#8A3E52", bg: "#F9EEF1", darkFg: "#F9A8D4" },
};

const BRAND_PRIMARY = "#0083E6";
const getAccent = (key) => ACCENTS[key] || { fg: BRAND_PRIMARY, bg: "#EAF4FE" };

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.15 },
  }),
};

export default function FeatureCard({ icon: Icon, title, description, color, image, index }) {
  const accent = getAccent(color);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    setIsDark(html.classList.contains("dark"));
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="flex h-full"
    >
      <Card className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex-1 min-h-[300px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/60" />
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: accent.fg }} />
        <CardContent className="relative p-7 flex flex-col h-full">
          <div className="flex mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center ring-1 dark:ring-white/10 ring-black/5" style={{ backgroundColor: accent.bg, color: accent.fg }}>
              <Icon size={26} aria-hidden="true" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-2" style={{ color: isDark ? accent.darkFg : accent.fg }}>
              {title}
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-white">{description}</p>

            {/* Enlace a las bases del sorteo si la tarjeta es la del sorteo tecnológico */}
            {typeof title === "string" && title.toLowerCase().includes("sorteo") && (
              <div className="mt-4">
                <Link
                  to="/bases"
                  className="inline-block text-sm font-medium text-[#0083E6] dark:text-blue-300 hover:underline"
                  aria-label="Ver bases del sorteo"
                >
                  Ver bases del sorteo
                </Link>
              </div>
            )}
          </div>
          <div className="mt-auto h-px w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: accent.fg, opacity: 0.6 }} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
