import drawer from "@assets/menuclaro.png";
import draweroscuro from "@assets/menuoscuro.png";
import liberarPlaza from "@assets/leave.png";
import mapaClaro from "@assets/screenmapa.png";
import ocuparPlaza from "@assets/ocupar.png";
import profile from "@assets/profile.png";

export const screenshots = [
  {
    id: "drawer",
    img: drawer,
    eyebrow: "Navegacion",
    title: "Todo a un toque",
    description: "Accede rapido al mapa, perfil, actividad y funciones clave desde un menu claro.",
  },
  {
    id: "draweroscuro",
    img: draweroscuro,
    eyebrow: "Modo oscuro",
    title: "Vision mas comoda",
    description: "La interfaz se adapta mejor a trayectos nocturnos y consultas rapidas con menos fatiga visual.",
  },
  {
    id: "mapaClaro",
    img: mapaClaro,
    eyebrow: "Mapa en vivo",
    title: "Lo importante se ve antes",
    description: "Consulta avisos utiles alrededor de ti y entiende rapido donde merece la pena ir.",
  },
  {
    id: "ocuparPlaza",
    img: ocuparPlaza,
    eyebrow: "Accion inmediata",
    title: "Confirma una plaza ocupada",
    description: "Ayuda a mantener el mapa actualizado para que la comunidad tome mejores decisiones.",
  },
  {
    id: "liberarPlaza",
    img: liberarPlaza,
    eyebrow: "Colaboracion",
    title: "Libera tu plaza en segundos",
    description: "Avisa de forma sencilla cuando vas a salir para que otro conductor pueda aprovecharla.",
  },
  {
    id: "profile",
    img: profile,
    eyebrow: "Tu cuenta",
    title: "Control total desde tu perfil",
    description: "Gestiona vehiculos, actividad y datos personales desde una vista simple y ordenada.",
  },
];
