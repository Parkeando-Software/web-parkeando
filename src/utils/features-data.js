import { Search, Map, Users, Bell, LineChart, Info } from "lucide-react";

export const features = [
  {
    title: "Colaboración entre conductores",
    description:
      "La comunidad de usuarios avisa cuando va a dejar libre una plaza de aparcamiento para que otros puedan aprovecharla.",
    icon: Users,
  },
  {
    title: "Aviso de plazas libres",
    description:
      "Indica fácilmente en la app que vas a dejar tu plaza. Otros usuarios verán tu aviso en el mapa en tiempo real.",
    icon: Bell,
  },
  {
    title: "Mapa colaborativo",
    description:
      "Consulta el mapa para ver las plazas que otros usuarios van a dejar próximamente. La información se actualiza al instante.",
    icon: Map,
  },
  {
    title: "Sistema de puntos",
    description:
      "Gana puntos cada vez que ayudas a la comunidad avisando que dejas tu plaza. ¡Tu colaboración tiene recompensa!",
    icon: LineChart,
  },
  {
    title: "Gratuita y sin pagos",
    description:
      "ParKeando es completamente gratuita. No hay pagos, comisiones ni reservas. Solo colaboración entre conductores.",
    icon: Info,
  },
  {
    title: "Búsqueda inteligente",
    description:
      "Encuentra plazas libres cerca de tu destino gracias a los avisos de otros usuarios.",
    icon: Search,
  },
];
