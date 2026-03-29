import { Card, CardContent } from "@/components/ui/card";
import { Download, Smartphone, Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

export default function DownloadStats() {
  const [stats, setStats] = useState({
    users: { formatted: '0' },
    parkings: { formatted: '0' },
    rating: 5.0,
    downloads: '0'
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

/*   useEffect(() => {
    setStats({
      users: { formatted: "288k+" },
      parkings: { formatted: "2.88M" },
      rating: 5.0,
      downloads: "10k+",
    });
  }, []); */

  const downloadStats = [
    { number: stats.downloads, label: "Descargas", icon: Download },
    { number: Number(stats.rating).toFixed(1), label: "Calificación promedio", icon: Star },
    { number: stats.parkings.formatted, label: "Estacionamientos", icon: Smartphone },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {downloadStats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={index}
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <CardContent className="p-6 text-center">
              <IconComponent
                size={32}
                className="mx-auto mb-3 text-[#00AB00]"
              />
              <div className="text-3xl md:text-4xl font-bold mb-2 text-slate-200">
                {stat.number}
              </div>
              <div className="text-sm opacity-80 text-slate-100">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
