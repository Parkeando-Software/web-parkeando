import { Search, Map, Users, Bell, LineChart, Info } from "lucide-react";

export const features = [
  {
    title: "Colaboracion entre conductores",
    description:
      "La comunidad de usuarios avisa cuando va a dejar libre una plaza de aparcamiento para que otros puedan aprovecharla.",
    icon: Users,
  },
  {
    title: "Aviso de plazas libres",
    description:
      "Indica facilmente en la app que vas a dejar tu plaza. Otros usuarios veran tu aviso en el mapa en tiempo real.",
    icon: Bell,
  },
  {
    title: "Mapa colaborativo",
    description:
      "Consulta el mapa para ver las plazas que otros usuarios van a dejar proximamente. La informacion se actualiza al instante.",
    icon: Map,
  },
  {
    title: "Sistema de puntos",
    description:
      "Cada plaza liberada o cada notificacion de plaza ocupada genera un numero dentro del sistema para reflejar tu actividad en la comunidad.",
    icon: LineChart,
  },
  {
    title: "Gratuita y sin pagos",
    description:
      "ParKeando es completamente gratuita. No hay pagos, comisiones ni reservas. Solo colaboracion entre conductores.",
    icon: Info,
  },
  {
    title: "Busqueda inteligente",
    description:
      "Encuentra plazas libres cerca de tu destino gracias a los avisos de otros usuarios.",
    icon: Search,
  },
];
