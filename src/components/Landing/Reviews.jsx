import { MessageSquareQuote } from "lucide-react";
import ReviewsSlider from "@components/Landing/ReviewSection/ReviewsSlider";
import ReviewsStats from "@components/Landing/ReviewSection/ReviewsStats";

export default function Reviews() {
  return (
    <section id="reviews" className="landing-section">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="section-badge mb-8 text-slate-700 dark:text-slate-200">
            <MessageSquareQuote size={16} className="text-[#0083E6]" />
            Opiniones reales
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl dark:text-white">
            Quien la prueba nota la diferencia
            <span className="block text-[#0083E6]">desde el primer dia.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl dark:text-slate-300">
            Miles de conductores ya usan ParKeando para ahorrar tiempo y
            aparcar con menos estres.
          </p>
        </div>

        <ReviewsSlider />
        <ReviewsStats />
      </div>
    </section>
  );
}
