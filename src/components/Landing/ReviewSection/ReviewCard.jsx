import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewCard({ review }) {
  const initial = review.author_name?.charAt(0)?.toUpperCase() ?? "?";

  const formattedDate = new Date(review.review_date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <Card className="review-card h-80 flex flex-col my-10 mx-2">
      <CardContent className="p-6 h-full flex flex-col justify-between mx-8">

        {/* Estrellas reales */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.4,
                rotate: 15,
                filter: "drop-shadow(0px 0px 6px rgba(255, 215, 0, 0.8))",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block"
            >
              <Star
                className={
                  i < review.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }
                size={20}
              />
            </motion.div>
          ))}
        </div>

        {/* Comentario */}
        <p className="text-slate-800 dark:text-slate-200 mb-6 leading-relaxed line-clamp-4">
          "{review.comment}"
        </p>

        {/* Usuario */}
        <div className="flex items-center mt-auto">
          <div
            className={`w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4`}
          >
            {initial}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-200">
              {review.author_name}
            </p>
            <p className="text-sm text-slate-500">
              {formattedDate}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
