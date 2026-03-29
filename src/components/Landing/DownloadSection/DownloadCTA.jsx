import { Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadCTA() {
  return (
    <div className="text-center">
      <div className="rounded-[2rem] border border-white/14 bg-slate-950/16 p-8 backdrop-blur-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-300/16">
          <Clock3 size={34} className="text-emerald-200" />
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          Menos tiempo buscando. Mas tiempo para ti.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-sky-50/84">
          Descarga ParKeando y empieza a moverte por la ciudad con una
          sensacion mucho mas ligera.
        </p>
        <Button
          className="mt-8 h-auto rounded-full bg-[linear-gradient(135deg,#00AB00,#19d968)] px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(0,171,0,0.28)] transition hover:-translate-y-0.5 hover:brightness-105"
          onClick={() => {
            const el = document.getElementById("download");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Descargar gratis ahora
        </Button>
      </div>
    </div>
  );
}
