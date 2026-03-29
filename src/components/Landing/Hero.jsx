  import React, { useEffect, useRef, useState } from "react";
  import { gsap } from "gsap";
  import { Download, CheckCircle } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import PImage from "@assets/p.png";
  import api from "@config/api";
  import apiRoutes from "@config/apiRoutes";

  export default function Hero() {
    const heroContentRef = useRef(null);
    const statsRef = useRef(null);
    const pImgRef = useRef(null);
    const [stats, setStats] = useState({
      users: { raw: 0, formatted: "0" },
      parkings: { raw: 0, formatted: "0" },
      rating: 5.0,
      downloads: "0",
    });

    useEffect(() => {
      // Fetch stats from API
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

/*     useEffect(() => {
      // 🔥 STATS MANUALES
      setStats({
        users: { raw: 288000, formatted: "288k+" },
        parkings: { raw: 500000, formatted: "500k+" },
        rating: 5.0,
        downloads: "10k+",
      });
    }, []); */

    const animateNumbers = () => {
      const elements = statsRef.current.querySelectorAll("[data-number]");

      elements.forEach((el) => {
        const target = parseFloat(el.dataset.number);
        if (isNaN(target)) return; // Skip non-numeric values like '1k+'

        const obj = { value: 0 };

        gsap.to(obj, {
          value: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            if (el.dataset.format === "rating") {
              el.innerText = obj.value.toFixed(1);
            } else {
              el.innerText = Math.floor(obj.value);
            }
/*            if (el.dataset.format === "rating") {
              el.innerText = obj.value.toFixed(1);
            } else {
              el.innerText = Math.floor(obj.value).toLocaleString("es-ES");
            } */
          },
        });
      });
    };

    useEffect(() => {
      const ctx = gsap.context(() => {
        /* Timeline animación del contenido */
        gsap.fromTo(
          heroContentRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.6,
            stagger: 0.15,
            delay: 0.2,
            ease: "power3.out",
          }
        );

        /* Timeline animación de la P */
        const tlP = gsap.timeline();

        tlP.fromTo(
          pImgRef.current,
          { y: "-200vh", opacity: 0, scale: 1 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            ease: "bounce.out",
          }
        );

        // Rebote controlado y estable
        tlP.to(pImgRef.current, {
          scaleX: 1.2,
          scaleY: 0.5,
          duration: 0.18,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
        });

        // Asegurar el estado final correcto SIEMPRE
        tlP.set(pImgRef.current, { scaleX: 1, scaleY: 1 });

        /* Timeline animación de estadísticas */
        gsap.fromTo(
          statsRef.current.children,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 1.2,
            ease: "back.out(1.7)",
          }
        );

        /* Animación de números */
        if (stats.users.raw > 0) animateNumbers();
      });

      // Limpieza (evita errores si React remonta el componente)
      return () => ctx.revert();
    }, [stats]);

    return (
      <section
        id="hero"
        className="pt-32 pb-20 px-6 relative overflow-hidden
          bg-linear-to-tr 
          from-blue-100 to-white 
          dark:from-slate-900 dark:to-slate-800"
      >
        <div className="container mx-auto max-w-7xl relative z-10">
          <div ref={heroContentRef} className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-8 dark:bg-green-900 dark:text-green-200">
              <CheckCircle size={16} className="mr-2" />
              Cada vez más usuarios confían en nosotros
            </div>

            {/* Title row */}
            <div className="flex justify-center items-baseline gap-0 mb-2">
              <img
                ref={pImgRef}
                src={PImage}
                alt="P"
                className="inline-block align-baseline -mr-4 w-20 md:w-28 lg:w-32 h-auto"
                style={{ filter: `drop-shadow(-5px -5px 10px rgba(0,0,0,0.5))` }}
              />
              <span
                className="font-black align-baseline text-5xl md:text-7xl lg:text-8xl text-[#00AB00]"
                style={{ textShadow: "-1px -1px 5px rgba(0,0,0,0.5)" }}
              >
                arKeando
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-600 dark:text-slate-300 mt-8 mb-8 leading-tight">
              Encuentra tu{" "}
              <span className="text-[#0083E6] dark:text-blue-500 relative">
                estacionamiento
              </span>{" "}
              en la calle, rápidamente.
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              La aplicación colaborativa entre conductores, para encontrar
              estacionamiento en la calle de cualquier ciudad.
              <br className="hidden md:block" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Sin vueltas, sin estrés, sin complicaciones.
              </span>
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="border-2 border-[#0083E6] bg-[#0083E6] hover:border-blue-900 hover:bg-[#0160a8] text-white text-xl px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer dark:bg-slate-700 dark:border-slate-500 dark:text-slate-100 dark:hover:bg-slate-600"
                onClick={() => {
                  const el = document.getElementById("download");
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <Download className="group-hover:animate-bounce" size={24} />
                Descargar Gratis
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-slate-800 dark:text-slate-200"
            >
              <div className="text-center">
                <div
                  data-number={stats.users.raw}
                  className="stat text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                >
                  {stats.users.raw > 0 ? 0 : stats.users.formatted}
                </div>
                <div className="text-slate-660 dark:text-slate-300 font-medium">
                  Usuarios Activos
                </div>
              </div>

              <div className="text-center">
                <div
                  data-number={stats.parkings.raw}
                  className="stat text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
                >
                  {stats.parkings.raw > 0 ? 0 : stats.parkings.formatted}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">
                  Estacionamientos
                </div>
              </div>

              <div className="text-center">
                <div
                  data-number={stats.rating}
                  data-format="rating"
                  className="stat text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
                >
                  {Number(stats.rating).toFixed(1)}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">
                  Calificación
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
