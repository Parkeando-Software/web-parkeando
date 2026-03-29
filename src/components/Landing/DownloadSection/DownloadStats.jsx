import { Card, CardContent } from "@/components/ui/card";
import { Download, MapPinned, Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

export default function DownloadStats() {
  const DOWNLOADS_FALLBACK = "5875";
  const PARKINGS_FALLBACK = "8378";
  const [stats, setStats] = useState({
    users: { formatted: "0" },
    parkings: { formatted: "0" },
    rating: 5.0,
    downloads: "0",
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

  const downloadStats = [
    {
      // Usar de nuevo stats.downloads cuando queramos recuperar el dato real
      number: DOWNLOADS_FALLBACK,
      label: "Descargas",
      icon: Download,
    },
    {
      number: Number(stats.rating).toFixed(1),
      label: "Calificación media",
      icon: Star,
    },
    {
      // Usar de nuevo stats.parkings.formatted cuando queramos recuperar el dato real
      number: PARKINGS_FALLBACK,
      label: "Estacionamientos compartidos",
      icon: MapPinned,
    },
  ];

  return (
    <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      {downloadStats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={index}
            className="overflow-hidden rounded-[1.75rem] border-white/14 bg-white/10 text-white shadow-none backdrop-blur-lg"
          >
            <CardContent className="p-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12">
                <IconComponent size={28} className="text-emerald-300" />
              </div>
              <div className="text-3xl font-extrabold md:text-4xl">
                {stat.number}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/72">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
