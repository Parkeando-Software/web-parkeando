import React from "react";
import { motion } from "framer-motion";

export default function AuthLogin() {
  return (
    <motion.div
      key="loginText"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="text-white space-y-4 px-4"
    >
      <p className="text-lg font-bold tracking-widest text-[#0083E6] dark:text-blue-500 ">
        HOLA DE NUEVO
      </p>

      <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-500">
        Entra a tu mundo de estacionamiento inteligente
      </h1>

      <p className="text-slate-700 dark:text-slate-300 text-lg">
        Controla tus vehículos, revisa tu historial y comprueba tus ParkiPuntos
        en una interfaz más ligera y rápida. Todo bajo un mismo acceso.
      </p>

      <ul className="grid grid-cols-1 gap-2 pt-4 text-slate-600 dark:text-slate-300 text-m">
        <li>• Inicio rápido con biometría</li>
        <li>• Alertas inteligentes en vivo</li>
        <li>• Respaldo cifrado de datos</li>
        <li>• Historial de aparcamientos</li>
      </ul>
    </motion.div>
  );
}
