import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  MapPinned,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PImage from "@assets/p.png";
import frame from "@assets/mobile-frame.png";
import promoImage from "@assets/promo.png";
import { screenshots } from "@utils/screenshots";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

export default function Hero() {
  const HERO_DOWNLOADS_FALLBACK = "5875";
  const HERO_USERS_FALLBACK = "5875";
  const HERO_PARKINGS_FALLBACK = "8378";
  const heroContentRef = useRef(null);
  const statsRef = useRef(null);
  const pImgRef = useRef(null);
  const visualRef = useRef(null);
  const [stats, setStats] = useState({
    users: { raw: 0, formatted: "0" },
    parkings: { raw: 0, formatted: "0" },
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

  const animateNumbers = () => {
    const elements = statsRef.current?.querySelectorAll("[data-number]") ?? [];

    elements.forEach((el) => {
      const target = parseFloat(el.dataset.number);
      if (isNaN(target)) return;

      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          el.innerText =
            el.dataset.format === "rating"
              ? obj.value.toFixed(1)
              : Math.floor(obj.value);
        },
      });
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroContentRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        pImgRef.current,
        { y: -160, opacity: 0, rotate: -12 },
        {
          y: 0,
          opacity: 1,
          rotate: -8,
          duration: 1.4,
          ease: "back.out(1.6)",
        }
      );

      gsap.fromTo(
        visualRef.current,
        { x: 40, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          delay: 0.35,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        statsRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.65,
          ease: "power2.out",
        }
      );

      if (stats.users.raw > 0) animateNumbers();
    });

    return () => ctx.revert();
  }, [stats]);

  return (
    <section id="hero" className="landing-section overflow-hidden pt-16 md:pt-24">
      <div className="hero-glow left-[-5rem] top-[4.5rem] h-64 w-64 bg-sky-300/55 dark:bg-sky-500/22" />
      <div className="hero-glow bottom-10 right-[-4rem] h-60 w-60 bg-emerald-300/50 dark:bg-emerald-500/18" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div ref={heroContentRef} className="max-w-3xl">
            <div className="section-badge mb-8 text-slate-700 dark:text-slate-200">
              <CheckCircle2 size={16} className="text-[#00AB00]" />
              Aparcar deberia ser asi de simple
            </div>

            <div className="mb-7 flex items-center gap-3">
              <img
                ref={pImgRef}
                src={PImage}
                alt="P de ParKeando"
                className="h-16 w-16 -rotate-6 drop-shadow-[0_18px_36px_rgba(15,23,42,0.22)] md:h-20 md:w-20"
              />
              <span className="text-3xl font-extrabold tracking-tight text-[#00AB00] md:text-4xl">
                ParKeando
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white">
              Encuentra parking en calle
              <span className="block text-[#0083E6]">sin vueltas ni estres.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-2xl md:leading-10 dark:text-slate-300">
              La app colaborativa entre conductores que te ayuda a aparcar antes,
              perder menos tiempo y moverte por la ciudad con mucha mas calma.
            </p>

            <div className="mx-auto mt-8 w-full max-w-[420px] overflow-hidden rounded-[1.7rem] border border-white/75 bg-white/82 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl md:hidden dark:border-slate-700 dark:bg-slate-900/78">
              <img
                src={promoImage}
                alt="Promocion del sorteo"
                className="h-auto w-full rounded-[1.2rem] object-cover"
              />
            </div>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(240,248,255,0.82))] p-3 shadow-[0_22px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(15,23,42,0.7))]">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 px-2 pb-3 dark:border-slate-700/80">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                    Por que destaca
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    Lo que hace ParKeando mas util desde el primer uso
                  </p>
                </div>
                <div className="hidden rounded-full border border-sky-100 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0083E6] shadow-sm md:inline-flex dark:border-sky-400/15 dark:bg-slate-900/70 dark:text-sky-300">
                  En la calle
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="group relative overflow-hidden rounded-[1.45rem] border border-white/85 bg-white/78 p-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(0,131,230,0.12)] dark:border-slate-700 dark:bg-slate-900/55">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7dd3fc,transparent)]" />
                  <div className="absolute right-[-1rem] top-[-1rem] h-16 w-16 rounded-full bg-sky-200/60 blur-2xl dark:bg-sky-500/12" />
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="rounded-[0.95rem] border border-sky-100 bg-sky-50/90 p-2 text-[#0083E6] shadow-sm dark:border-sky-400/15 dark:bg-slate-900/70 dark:text-sky-300">
                        <Users size={16} />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
                        Colaborativa
                      </p>
                    </div>
                    <p className="mt-3 text-[15px] font-extrabold leading-6 text-slate-900 dark:text-white">
                      Tiempo real entre conductores
                    </p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-[1.45rem] border border-white/85 bg-white/78 p-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(0,131,230,0.12)] dark:border-slate-700 dark:bg-slate-900/55">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#38bdf8,transparent)]" />
                  <div className="absolute right-[-1rem] top-[-1rem] h-16 w-16 rounded-full bg-sky-200/60 blur-2xl dark:bg-sky-500/12" />
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="rounded-[0.95rem] border border-sky-100 bg-sky-50/90 p-2 text-[#0083E6] shadow-sm dark:border-sky-400/15 dark:bg-slate-900/70 dark:text-sky-300">
                        <MapPinned size={16} />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
                        Inteligente
                      </p>
                    </div>
                    <p className="mt-3 text-[15px] font-extrabold leading-6 text-slate-900 dark:text-white">
                      GPS y alertas inteligentes
                    </p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-[1.45rem] border border-white/85 bg-white/78 p-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(0,171,0,0.12)] dark:border-slate-700 dark:bg-slate-900/55">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#4ade80,transparent)]" />
                  <div className="absolute right-[-1rem] top-[-1rem] h-16 w-16 rounded-full bg-emerald-200/60 blur-2xl dark:bg-emerald-500/12" />
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="rounded-[0.95rem] border border-emerald-100 bg-emerald-50/90 p-2 text-[#00AB00] shadow-sm dark:border-emerald-400/15 dark:bg-slate-900/70 dark:text-emerald-300">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
                        Fluida
                      </p>
                    </div>
                    <p className="mt-3 text-[15px] font-extrabold leading-6 text-slate-900 dark:text-white">
                      Aparca antes y decide mejor
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-auto rounded-full bg-[linear-gradient(135deg,#0083E6,#19a1ff)] px-8 py-4 text-base font-bold text-white shadow-[0_22px_44px_rgba(0,131,230,0.3)] transition hover:-translate-y-0.5 hover:brightness-105"
                onClick={() => {
                  const el = document.getElementById("download");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <Download size={20} />
                Descargar gratis
              </Button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/78 px-8 py-4 text-base font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/78 dark:text-white"
                onClick={() => {
                  const el = document.getElementById("features");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                Ver como funciona
                <ArrowRight size={18} />
              </button>
            </div>

            <div ref={statsRef} className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,247,255,0.88))] p-5 shadow-[0_22px_48px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(0,131,230,0.12)] dark:border-slate-700 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.7))]">
                <div className="absolute right-[-1.6rem] top-[-1.6rem] h-16 w-16 rounded-full bg-sky-200/55 blur-2xl dark:bg-sky-500/12" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Usuarios activos
                    </p>
                    <div className="mt-2 text-3xl font-extrabold text-[#0083E6] md:text-4xl">
                      {HERO_USERS_FALLBACK}
                      {/* Usar de nuevo la logica dinamica con data-number={stats.users.raw} y {stats.users.raw > 0 ? 0 : stats.users.formatted} cuando queramos recuperar el dato real */}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-sky-100 bg-white/80 p-3 text-[#0083E6] shadow-sm dark:border-sky-400/15 dark:bg-slate-900/70 dark:text-sky-300">
                    <Users size={18} />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,251,246,0.9))] p-5 shadow-[0_22px_48px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(0,171,0,0.12)] dark:border-slate-700 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.7))]">
                <div className="absolute right-[-1.6rem] top-[-1.6rem] h-16 w-16 rounded-full bg-emerald-200/55 blur-2xl dark:bg-emerald-500/12" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Estacionamientos
                    </p>
                    <div className="mt-2 text-3xl font-extrabold text-[#00AB00] md:text-4xl">
                      {HERO_PARKINGS_FALLBACK}
                      {/* Usar de nuevo la logica dinamica con data-number={stats.parkings.raw} y {stats.parkings.raw > 0 ? 0 : stats.parkings.formatted} cuando queramos recuperar el dato real */}
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-emerald-100 bg-white/80 p-3 text-[#00AB00] shadow-sm dark:border-emerald-400/15 dark:bg-slate-900/70 dark:text-emerald-300">
                    <MapPinned size={18} />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,248,236,0.92))] p-5 shadow-[0_22px_48px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(245,158,11,0.14)] dark:border-slate-700 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.7))]">
                <div className="absolute right-[-1.6rem] top-[-1.6rem] h-16 w-16 rounded-full bg-amber-200/60 blur-2xl dark:bg-amber-500/12" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Calificacion
                    </p>
                    <div
                      data-number={stats.rating}
                      data-format="rating"
                      className="mt-2 flex items-center gap-2 text-3xl font-extrabold text-amber-500 md:text-4xl"
                    >
                      {Number(stats.rating).toFixed(1)}
                      <Star size={22} className="fill-current" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-white/80 p-3 text-amber-500 shadow-sm dark:border-amber-400/15 dark:bg-slate-900/70 dark:text-amber-300">
                    <Star size={18} className="fill-current" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div ref={visualRef} className="relative">
            <div className="mx-auto mb-5 hidden w-[88%] overflow-hidden rounded-[1.7rem] border border-white/75 bg-white/82 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl md:block dark:border-slate-700 dark:bg-slate-900/78">
              <img
                src={promoImage}
                alt="Promocion del sorteo"
                className="h-auto w-full rounded-[1.2rem] object-cover"
              />
            </div>
            <div className="premium-panel relative overflow-hidden p-5 md:p-7">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

              <div className="grid gap-5 md:grid-cols-[0.6fr_0.4fr]">
                <div className="">
                  <div className="absolute inset-x-10 top-10 h-44 rounded-full bg-sky-400/24 blur-3xl" />
                  <div className="relative mx-auto h-[530px] w-[255px] shrink-0">
                    <div className="relative h-full w-full">
                      <img
                        src={frame}
                        alt="Marco movil"
                        className="pointer-events-none absolute inset-0 z-30 h-full w-full object-contain"
                      />

                      <div className="absolute left-[7.2%] right-[7.2%] top-[3.1%] bottom-[2.2%] z-10 overflow-hidden rounded-[1.75rem] bg-slate-100 dark:bg-slate-900">
                        <img
                          src={screenshots[2]?.img ?? screenshots[0].img}
                          alt="Vista de la app"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-8">
                  <div
                    className="mt-2 group relative min-h-[96px] overflow-hidden rounded-[1.25rem] border border-white/10 px-3 py-2 text-white shadow-[0_20px_42px_rgba(0,131,230,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_62px_rgba(0,131,230,0.3)] md:min-h-[232px] md:rounded-[1.75rem] md:p-4 md:shadow-[0_24px_54px_rgba(0,131,230,0.24)]"
                    style={{ backgroundImage: "linear-gradient(135deg, #0b4b83 0%, #0b76cf 58%, #1599ff 100%)" }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.38),transparent)]" />
                    <div className="absolute right-[-0.75rem] top-[-0.75rem] h-12 w-12 rounded-full bg-white/15 blur-2xl md:right-[-1rem] md:top-[-1rem] md:h-20 md:w-20" />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/72">
                            Para ti
                          </p>
                          <p className="mt-1 text-[11.5px] font-extrabold leading-4 tracking-tight text-white md:mt-2 md:text-[14px] md:leading-5">
                            Encuentra parking mas rapido y con menos frustracion.
                          </p>
                          <p className="mt-1 text-[10px] leading-3.5 text-sky-100/72 md:mt-2 md:text-[11px] md:leading-4">
                            Menos vueltas y una experiencia mucho mas directa.
                          </p>
                        </div>
                        <div className="rounded-[0.9rem] bg-white/12 p-1.5 text-sky-50 backdrop-blur-md md:rounded-[1.15rem] md:p-2.5">
                          <Sparkles size={16} className="md:h-[18px] md:w-[18px]" />
                        </div>
                      </div>
                    </div>
  
                    <div
                    className="group relative min-h-[96px] overflow-hidden rounded-[1.25rem] border border-white/10 px-3 py-2 text-white shadow-[0_20px_42px_rgba(0,171,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_62px_rgba(0,171,0,0.3)] md:min-h-[232px] md:rounded-[1.75rem] md:p-4 md:shadow-[0_24px_54px_rgba(0,171,0,0.24)]"
                      style={{ backgroundImage: "linear-gradient(135deg, #0d6933 0%, #00ab00 56%, #24cf35 100%)" }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
                      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.38),transparent)]" />
                      <div className="absolute right-[-0.75rem] top-[-0.75rem] h-12 w-12 rounded-full bg-white/12 blur-2xl md:right-[-1rem] md:top-[-1rem] md:h-20 md:w-20" />
                      <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/72">
                            Comunidad
                          </p>
                          <p className="mt-1 text-[11.5px] font-extrabold leading-4 tracking-tight text-white md:mt-2 md:text-[14px] md:leading-5">
                            Otros conductores te ayudan y tu ayudas a otros.
                          </p>
                          <p className="mt-1 text-[10px] leading-3.5 text-emerald-50/78 md:mt-2 md:text-[11px] md:leading-4">
                            Informacion compartida para aparcar con mas confianza.
                          </p>
                        </div>
                        <div className="rounded-[0.9rem] bg-white/12 p-1.5 text-emerald-50 backdrop-blur-md md:rounded-[1.15rem] md:p-2.5">
                          <Users size={16} className="md:h-[18px] md:w-[18px]" />
                        </div>
                      </div>
                    </div>

                  {false && (
                    <>
                  <div
                    className="hidden group relative overflow-hidden rounded-[1.8rem] border border-white/10 p-4 text-white shadow-[0_24px_54px_rgba(0,131,230,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_62px_rgba(0,131,230,0.34)]"
                    style={{ backgroundImage: "linear-gradient(135deg, #062b53 0%, #0b76cf 58%, #1599ff 100%)" }}
                  >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
                      <div className="absolute right-[-1rem] top-[-1rem] h-20 w-20 rounded-full bg-white/15 blur-2xl" />
                      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.38),transparent)]" />
                      <div className="relative flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/72">
                            Descargas
                          </p>
                            <p className="mt-2 text-[1.85rem] font-extrabold leading-none tracking-tight">
                              {HERO_DOWNLOADS_FALLBACK}
                              {/* Usar de nuevo {stats.downloads} cuando queramos recuperar el dato dinámico */}
                            </p>
                            <p className="mt-2 text-[13px] font-semibold leading-5 text-sky-50/92">
                              personas ya usan ParKeando
                            </p>
                            <p className="mt-1 text-[11px] leading-4 text-sky-100/72">
                              Una comunidad real creciendo cada dia.
                            </p>
                          </div>
                        <div className="rounded-[1.05rem] border border-white/14 bg-white/12 p-2.5 text-sky-50 backdrop-blur-md">
                          <Download size={16} />
                        </div>
                      </div>
                    </div>

                  <div
                    className="hidden group relative overflow-hidden rounded-[1.8rem] border border-white/10 p-4 text-white shadow-[0_24px_54px_rgba(0,171,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_62px_rgba(0,171,0,0.3)]"
                    style={{ backgroundImage: "linear-gradient(135deg, #05431f 0%, #00ab00 56%, #24cf35 100%)" }}
                  >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
                      <div className="absolute right-[-1rem] top-[-1rem] h-20 w-20 rounded-full bg-white/12 blur-2xl" />
                      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.38),transparent)]" />
                      <div className="relative flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/72">
                            Sensacion
                          </p>
                            <p className="mt-2 text-[15px] font-extrabold leading-5 tracking-tight">
                              Menos caos al volante. Mas control en tu dia.
                            </p>
                            <p className="mt-2 text-[11px] leading-4 text-emerald-50/78">
                              Todo se siente mas ligero, claro y util al conducir.
                            </p>
                          </div>
                        <div className="rounded-[1.05rem] border border-white/14 bg-white/12 p-2.5 text-emerald-50 backdrop-blur-md">
                          <MapPinned size={16} />
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
