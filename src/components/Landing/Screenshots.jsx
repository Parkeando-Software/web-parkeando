import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";
import frame from "@assets/mobile-frame.png";
import { screenshots } from "@utils/screenshots";

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (idx) => {
    setCurrentIndex(idx);

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      sliderRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section id="screenshots" className="landing-section pt-14 md:pt-18">
      <div className="container mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-2xl">
            <div className="section-badge mb-8 text-slate-700 dark:text-slate-200">
              <LayoutDashboard size={16} className="text-[#0083E6]" />
              Asi se vive ParKeando
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl dark:text-white">
              Una experiencia que se entiende
              <span className="block text-[#00AB00]">desde el primer toque.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl dark:text-slate-300">
              Todo esta pensado para que encuentres sitio, actues rapido y
              no pierdas tiempo descifrando la app.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="metric-card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Rapidez
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  Menos pasos y decisiones mas claras.
                </p>
              </div>

              <div className="metric-card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Claridad
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  Informacion util justo cuando la necesitas.
                </p>
              </div>
            </div>
          </div>

          <div className="premium-panel relative overflow-hidden p-6 md:p-8">
            <div className="grid items-center gap-6 md:grid-cols-[0.66fr_0.34fr]">
              <div
                ref={sliderRef}
                className="relative mx-auto w-full max-w-[330px] justify-self-center"
              >
                <div className="absolute inset-x-8 top-10 h-48 rounded-full bg-sky-400/24 blur-3xl dark:bg-sky-500/20" />
                <div className="relative h-[650px]">
                  <img
                    src={frame}
                    alt="Marco del telefono"
                    className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
                  />

                  <div className="absolute left-[7.8%] right-[7.8%] top-[6.4%] bottom-[5.9%] overflow-hidden rounded-[1.8rem] md:left-[5.7%] md:right-[5.7%] md:top-[3.6%] md:bottom-[3.6%] md:rounded-[2.25rem]">
                    <div
                      className="flex h-full transition-transform duration-700 ease-out"
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      {screenshots.map((slide) => (
                        <div key={slide.id} className="flex h-full w-full shrink-0 items-center justify-center overflow-hidden">
                          <img
                            src={slide.img}
                            alt={slide.id}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto grid w-full max-w-[360px] auto-rows-fr gap-3">
                {screenshots.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleCardClick(idx)}
                    className={`group relative flex h-full min-h-[84px] overflow-hidden rounded-[1.45rem] border px-4 py-3 text-left transition-all duration-300 ${
                      currentIndex === idx
                        ? "border-sky-300/80 bg-[linear-gradient(135deg,rgba(239,248,255,0.95),rgba(224,242,254,0.92))] shadow-[0_20px_40px_rgba(0,131,230,0.12)] dark:border-sky-400/30 dark:bg-[linear-gradient(180deg,rgba(14,165,233,0.14),rgba(15,23,42,0.78))]"
                        : "border-white/70 bg-white/74 shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_18px_34px_rgba(15,23,42,0.1)] dark:border-white/8 dark:bg-slate-900/62"
                    }`}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${
                        currentIndex === idx ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      } transition-opacity duration-300`}
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(0,131,230,0.7), rgba(0,171,0,0.45), transparent)",
                      }}
                    />
                    <div className="relative flex w-full items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                          <Sparkles size={14} />
                          {slide.eyebrow}
                        </div>
                        <div className="mt-2 text-[0.88rem] font-extrabold leading-[1.15rem] text-slate-900 dark:text-white">
                          {slide.title}
                        </div>
                      </div>
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          currentIndex === idx
                            ? "bg-white/78 text-[#0083E6] shadow-sm dark:bg-white/10 dark:text-sky-300"
                            : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"
                        }`}
                      >
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
