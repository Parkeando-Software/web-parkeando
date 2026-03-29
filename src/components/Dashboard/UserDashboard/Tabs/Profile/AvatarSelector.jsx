import React, { useRef, useState, useEffect } from "react";
import Avatar, { TOTAL_AVATARS } from "./Avatar";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function AvatarSelector({
  selectedAvatar,
  onAvatarChange,
  reputation = 0,
}) {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Generar array de avatares disponibles dinámicamente
  const avatars = Array.from({ length: TOTAL_AVATARS }, (_, i) => i);

  // Calcular el progreso del scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Calcular progreso inicial
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Selecciona tu avatar
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {TOTAL_AVATARS} disponibles
        </span>
      </div>

      {/* Slider Container */}
      <div className="relative group">
        {/* Botón Izquierdo */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 
          bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg 
            border border-slate-200 dark:border-slate-700 opacity-0 
            group-hover:opacity-100 transition-opacity duration-200 
          hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <ChevronLeft
            size={20}
            className="text-slate-700 dark:text-slate-300"
          />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {avatars.map((avatarNum) => {
            const requiredLevel = Math.floor(avatarNum / 10);
            const isLocked = Math.floor(reputation) < requiredLevel;

            return (
              <button
                key={avatarNum}
                type="button"
                onClick={() => !isLocked && onAvatarChange(avatarNum)}
                disabled={isLocked}
                className={`
                  relative shrink-0 p-3 rounded-xl border-2 transition-all duration-200 group/avatar
                  ${
                    isLocked
                      ? "opacity-50 grayscale cursor-not-allowed border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                      : "hover:scale-110 hover:shadow-lg"
                  }
                  ${
                    selectedAvatar === avatarNum && !isLocked
                      ? "border-[#0083E6] bg-blue-50 dark:bg-blue-900/20 shadow-md scale-105"
                      : !isLocked &&
                        "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }
                `}
              >
                <Avatar avatar={avatarNum} size="md" />

                {selectedAvatar === avatarNum && !isLocked && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#0083E6] rounded-full flex items-center justify-center shadow-md">
                    <Check size={14} className="text-white" />
                  </div>
                )}

                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
                    <div className="relative z-10 px-1 py-0.5 bg-slate-900/90 text-white text-[10px] font-medium rounded text-center leading-tight opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                      Disponible en nivel {requiredLevel}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Botón Derecho */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 
          bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg 
            border border-slate-200 dark:border-slate-700 opacity-0 
            group-hover:opacity-100 transition-opacity duration-200 
          hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <ChevronRight
            size={20}
            className="text-slate-700 dark:text-slate-300"
          />
        </button>
      </div>

      {/* Barra de progreso del scroll */}
      <div className="flex justify-center">
        <div className="h-1 w-32 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0083E6] rounded-full transition-all duration-300"
            style={{ width: `${Math.max(20, scrollProgress)}%` }}
          ></div>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
        Desliza para ver más avatares
      </p>

      {/* CSS para ocultar scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
