import React from "react";
import { motion } from "framer-motion";

export default function AuthRegister() {
  return (
    <motion.div
      key="registerText"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="text-white space-y-4 px-4"
    >
      <p className="text-lg font-bold tracking-widest text-[#0083E6] dark:text-blue-500 ">
        BIENVENIDO
      </p>

      <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-500">
        Una cuenta ligera, todo tu viaje de parking conectado
      </h1>

      <p className="text-slate-700 dark:text-slate-300 text-lg">
        Diseñamos una nueva experiencia más compacta: menos pasos, validaciones
        claras y recordatorios en vivo para que ubiques tus plazas libremente.
      </p>

      <ul className="grid grid-cols-1 gap-2 pt-4 text-slate-600 dark:text-slate-300 text-m">
        <li>• Perfiles y matrículas en minutos</li>
        <li>• Notificaciones contextuales</li>
        <li>• ParkiPuntos conectados a sorteos</li>
        <li>• Privacidad y control granular</li>
      </ul>
    </motion.div>
  );
}
