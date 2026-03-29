import ReviewsSlider from "@components/Landing/ReviewSection/ReviewsSlider";
import ReviewsStats from "@components/Landing/ReviewSection/ReviewsStats";

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="
        relative
        py-20 px-4 
        bg-linear-to-tr 
        from-blue-100 to-white 
        dark:from-slate-900 dark:to-slate-800
      "
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título */}
        <div className="text-center mb-16 mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-600 dark:text-slate-300 mb-6">
            Lo que dicen nuestros usuarios
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Miles de usuarios satisfechos ya confían en ParKeando
          </p>
        </div>

        {/* Carrusel */}
        <ReviewsSlider />

        {/* Estadísticas */}
        <ReviewsStats />
      </div>
    </section>
  );
}
