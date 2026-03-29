import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

export default function ReviewStats() {
  const [stats, setStats] = useState({
    users: { formatted: '0' },
    parkings: { formatted: '0' },
    rating: 5.0,
    total_reviews: 0
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
      label: "Calificación promedio",
      color: "text-yellow-600"
    },
    {
      id: 2,
      value: stats.total_reviews > 0 ? `${stats.total_reviews}+` : "0",
      label: "Reseñas verificadas",
      color: "text-blue-600"
    },
    {
      id: 3,
      value: "100%",
      label: "Usuarios satisfechos",
      color: "text-green-600"
    }
  ];

  return (
    <div className="bg-linear-to-bl from-blue-50 via-blue-200 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {reviewStats.map((stat) => {
          const darkColor = stat.color.replace("-600", "-300");

          return (
            <motion.div
              key={stat.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="cursor-pointer"
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} dark:${darkColor}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
