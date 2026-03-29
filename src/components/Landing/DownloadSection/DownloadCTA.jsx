import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadCTA() {
  return (
    <div className="text-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <Clock size={48} className="mx-auto mb-4 text-[#00AB00]" />
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-200">
          ¿Qué esperas para empezar?
        </h3>
        <p className="text-lg mb-6 opacity-90 text-slate-100">
          Descarga ParKeando hoy y nunca más pierdas tiempo buscando
          estacionamiento
        </p>
        <Button
          className="bg-[#00AB00] hover:bg-green-700 text-lg text-slate-200 font-bold px-8 py-8 rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => {
            const el = document.getElementById("download");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Descargar Gratis Ahora
        </Button>
      </div>
    </div>
  );
}
