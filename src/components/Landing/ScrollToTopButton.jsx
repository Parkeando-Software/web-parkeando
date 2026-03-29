import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({
  disabled = false,
  threshold = 100,
}) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPastThreshold = window.scrollY > threshold;
      setHasScrolled((prev) =>
        prev !== isPastThreshold ? isPastThreshold : prev
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const isVisible = hasScrolled && !disabled;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 rounded-full bg-[linear-gradient(135deg,#0083E6,#00AB00)] p-3 text-white shadow-[0_18px_40px_rgba(0,131,230,0.25)] transition-all duration-500 ease-in-out ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
      aria-label="Volver arriba"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp size={24} />
    </button>
  );
}
