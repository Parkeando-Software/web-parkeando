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
      className={`
        fixed bottom-6 right-6 p-3 rounded-full 
        bg-green-600 text-white hover:bg-green-700 
        dark:bg-gray-700 dark:hover:bg-gray-600 
        shadow-lg z-40 transition-all duration-500 ease-in-out transform
        ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
      aria-label="Volver arriba"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp size={24} />
    </button>
  );
}
