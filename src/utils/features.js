import { MapPin, Clock, HandCoins, Smartphone, Gift, Bell } from "lucide-react";
import mapBg from "@assets/feature-map.jpg";
import clockBg from "@assets/feature-clock.jpg";
import shieldBg from "@assets/feature-shield.jpg";
import phoneBg from "@assets/feature-phone.jpg";
import cardBg from "@assets/feature-card.jpg";
import bellBg from "@assets/feature-bell.jpg";

export const features = [
  {
    icon: MapPin,
    title: "Ubicación en Tiempo Real",
    description:
      "Encuentra estacionamientos disponibles cerca de ti con precisión GPS avanzada",
    color: "green",
    image: mapBg,
  },
  {
    icon: Clock,
    title: "Encuentra tu plaza",
    description: "Localiza las plazas libres que dejan otros conductores",
    color: "blue",
    image: clockBg,
  },
  {
    icon: HandCoins,
    title: "ParkiPuntos",
    description:
      "Notifica plazas libres, acumula ParkiPuntos y consigue números para participar en nuestros sorteos",
    color: "purple",
    image: shieldBg,
  },
  {
    icon: Smartphone,
    title: "App Intuitiva",
    description:
      "Interfaz moderna y fácil de usar, diseñada para la máxima simplicidad",
    color: "orange",
    image: phoneBg,
  },
  {
    icon: Gift,
    title: "Sorteos Periódicos",
    description:
      "Participa en increíbles sorteos periódicos, cargados de tecnología y más",
    color: "indigo",
    image: cardBg,
    showBases: true,
  },
  {
    icon: Bell,
    title: "Notificaciones Inteligentes",
    description:
      "Alertas personalizadas sobre reservas, ofertas y recordatorios",
    color: "pink",
    image: bellBg,
  },
];


