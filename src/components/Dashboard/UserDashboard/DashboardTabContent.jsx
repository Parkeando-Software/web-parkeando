import { motion } from "framer-motion";
import Profile from "@components/Dashboard/UserDashboard/Tabs/Profile/Profile";
import Vehicles from "@components/Dashboard/UserDashboard/Tabs/Vehicles/Vehicles";
import History from "@components/Dashboard/UserDashboard/Tabs/History/History";
import MyPoints from "@components/Dashboard/UserDashboard/Tabs/MyPoints/MyPoints";
import Lottery from "@components/Dashboard/UserDashboard/Tabs/Lottery/Lottery";

export function DashboardTabContent({ activeTab }) {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border dark:border-slate-700"
    >
      {activeTab === "perfil" && <Profile />}
      {activeTab === "vehiculos" && <Vehicles />}
      {activeTab === "historial" && <History />}
      {activeTab === "puntos" && <MyPoints />}
      {activeTab === "sorteos" && <Lottery />}
    </motion.div>
  );
}
