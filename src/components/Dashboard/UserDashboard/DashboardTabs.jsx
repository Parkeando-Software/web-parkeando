import { User, Car, History, Star, Gift } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardTabs({ activeTab, setActiveTab, theme, mobile }) {
  const mobileItemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    hover: { scale: 1.1, x: 10, color: "#16a34a", transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 },
  };

  if (mobile) {
    const items = [
      { id: "perfil", label: "Mi Perfil", icon: <User size={26} /> },
      { id: "vehiculos", label: "Mis Vehículos", icon: <Car size={26} /> },
      { id: "historial", label: "Historial", icon: <History size={26} /> },
      { id: "puntos", label: "Mis Puntos", icon: <Star size={26} /> },
      { id: "sorteos", label: "Sorteos", icon: <Gift size={26} /> },
    ];

    return (
      <div className="flex flex-col items-center space-y-6 w-full">
        {items.map((item) => (
          <motion.button
            key={item.id}
            variants={mobileItemVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setActiveTab(item.id)}
            className="relative flex items-center gap-3 text-3xl md:text-2xl font-semibold px-6 py-2 rounded-lg"
          >
            {item.icon}
            {item.label}

            {activeTab === item.id && (
              <motion.div
                layout
                className="absolute inset-0 bg-green-600/20 dark:bg-blue-400/30 rounded-lg"
              />
            )}
          </motion.button>
        ))}
      </div>
    );
  }

  // Desktop
  const tabClasses = (tab) =>
    `flex items-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer transition-all ${
      activeTab === tab
        ? "bg-[#0083E6] text-white shadow-lg scale-105"
        : theme === "dark"
        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
        : "bg-white text-slate-600 border hover:bg-slate-100"
    }`;

  return (
    <div className="flex justify-center gap-4 mb-12 flex-wrap">
      <button className={tabClasses("perfil")} onClick={() => setActiveTab("perfil")}>
        <User size={18} /> Mi Perfil
      </button>

      <button className={tabClasses("vehiculos")} onClick={() => setActiveTab("vehiculos")}>
        <Car size={18} /> Mis Vehículos
      </button>

      <button className={tabClasses("historial")} onClick={() => setActiveTab("historial")}>
        <History size={18} /> Historial
      </button>

      <button className={tabClasses("puntos")} onClick={() => setActiveTab("puntos")}>
        <Star size={18} /> Mis Puntos
      </button>

      <button className={tabClasses("sorteos")} onClick={() => setActiveTab("sorteos")}>
        <Gift size={18} /> Sorteos
      </button>
    </div>
  );
}
