import DownloadStats from "@components/Landing/DownloadSection/DownloadStats";
import DownloadButtons from "@components/Landing/DownloadSection/DownloadButtons";
import DownloadFeatures from "@components/Landing/DownloadSection/DownloadFeatures";
import DownloadCTA from "@components/Landing/DownloadSection/DownloadCTA";

export default function Download() {
  return (
    <section id="download" className="landing-section overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.7rem] bg-[linear-gradient(135deg,#062a50_0%,#0083E6_54%,#00AB00_150%)] px-6 py-16 text-white shadow-[0_34px_100px_rgba(0,74,140,0.35)] md:px-10 lg:px-14">
          <div className="absolute left-[-4.5rem] top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-50">
                Disponible ahora
              </div>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                Descarga <span className="text-emerald-300">ParKeando</span>
                <span className="block">y aparca mejor desde hoy.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-sky-50/88 md:text-xl">
                Menos tiempo buscando sitio, menos vueltas y una experiencia
                mucho mas clara cada vez que sales con el coche.
              </p>
            </div>

            <DownloadButtons />
            <DownloadStats />
            <DownloadFeatures />
            <DownloadCTA />
          </div>
        </div>
      </div>
    </section>
  );
}
