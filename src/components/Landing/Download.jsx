import DownloadStats from "@components/Landing/DownloadSection/DownloadStats";
import DownloadButtons from "@components/Landing/DownloadSection/DownloadButtons";
import DownloadFeatures from "@components/Landing/DownloadSection/DownloadFeatures";
import DownloadCTA from "@components/Landing/DownloadSection/DownloadCTA";

export default function Download() {
  return (
    <section id="download" className="py-20 px-4 bg-linear-to-tr from-[#0083E6] via-blue-800 to-blue-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 text-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 mt-12 text-slate-200 dark:text-slate-300">
          Descarga <span className="text-[#00AB00]">ParKeando</span> ahora
        </h2>
        <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed text-slate-100 dark:text-slate-300">
          Únete a miles de usuarios que ya disfrutan de la comodidad de
          encontrar estacionamiento fácilmente. Disponible gratis en todas las
          plataformas.
        </p>

        <DownloadButtons />

        <DownloadStats />

        <DownloadFeatures />

        <DownloadCTA />
      </div>
    </section>
  );
}
