import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

export default function ReviewStats() {
  const [stats, setStats] = useState({
    users: { formatted: "0" },
    parkings: { formatted: "0" },
    rating: 5.0,
    total_reviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(apiRoutes.landingStats());
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching landing stats:", error);
      }
    };

    fetchStats();
  }, []);

  const reviewStats = [
    {
      id: 1,
      value: Number(stats.rating).toFixed(1),
      label: "Calificacion media",
      color: "text-yellow-500",
    },
    {
      id: 2,
      value: stats.total_reviews > 0 ? `${stats.total_reviews}+` : "0",
      label: "Resenas verificadas",
      color: "text-[#0083E6]",
    },
    {
      id: 3,
      value: "100%",
      label: "Ganas de repetir",
      color: "text-[#00AB00]",
    },
  ];

  return (
    <div className="premium-panel rounded-[2rem] p-8">
      <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
        {reviewStats.map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="metric-card cursor-pointer border-0"
          >
            <div className={`text-3xl font-extrabold md:text-4xl ${stat.color}`}>
              {stat.value}
            </div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
