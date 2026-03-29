import React, { useState, useEffect } from "react";

import frame from "@assets/mobile-frame.png";
import { screenshots } from "@utils/screenshots";

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider automático: cambia de imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <section
      id="screenshots"
      className="py-20 bg-linear-to-tr 
        from-blue-100 to-white 
        dark:from-slate-900 dark:to-slate-800 overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-600 dark:text-slate-300">
          Capturas de la App
        </h3>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12">
          Explora las pantallas principales de la aplicación.
        </p>

        <div className="relative flex items-center justify-center">
          <div className="relative w-[300px] h-[600px] rounded-[3rem] shadow-2xl overflow-hidden">
            <img
              src={frame}
              alt="frame"
              className="absolute w-full h-full object-contain z-10 pointer-events-none"
            />

            <div
              className="absolute w-[90%] h-[96%] top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 overflow-hidden z-0 rounded-4xl"
            >
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {screenshots.map((slide) => (
                  <div key={slide.id} className="w-full h-full shrink-0">
                    <img
                      src={slide.img}
                      alt={slide.id}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${
                  currentIndex === idx
                    ? "bg-blue-600 w-6"
                    : "bg-slate-300 dark:bg-slate-600"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
