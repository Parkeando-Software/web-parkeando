import React, { useState } from "react";
import { DashboardHeader } from "@components/Dashboard/UserDashboard/DashboardHeader";
import DashboardTabs from "@components/Dashboard/UserDashboard/DashboardTabs";
import { DashboardTabContent } from "@components/Dashboard/UserDashboard/DashboardTabContent";
import Footer from "@components/Landing/Footer";
import { useTheme } from "@context/ThemeContext";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("perfil");

  const tabClasses = (tab) =>
    `flex items-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer transition-all ${
      activeTab === tab
        ? "bg-[#0083E6] text-white shadow-lg scale-105"
        : theme === "dark"
        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
        : "bg-white text-slate-600 border hover:bg-slate-100"
    }`;

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 bg-linear-to-tr ${
        theme === "dark"
          ? "dark:from-slate-900 dark:to-slate-800 text-white"
          : "from-blue-100 to-white  text-black"
      }`}
    >
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

      <main className="flex-1 pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#0083E6] dark:text-blue-400">
          Panel de Usuario
        </h1>

        {/* Tabs */}
        <div className="hidden lg:block">
          <DashboardTabs
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
            theme={theme}
          />
        </div>

        {/* Contenido dinámico */}
        <DashboardTabContent activeTab={activeTab} />
      </main>

      <Footer />
    </div>
  );
}
