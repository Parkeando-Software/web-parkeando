import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewCard({ review }) {
  const initial = review.author_name?.charAt(0)?.toUpperCase() ?? "?";

  const formattedDate = new Date(review.review_date).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="premium-panel h-full border-0">
      <CardContent className="flex h-full flex-col justify-between p-8">
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.22,
                rotate: 10,
                filter: "drop-shadow(0px 0px 6px rgba(255, 215, 0, 0.8))",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block"
            >
              <Star
                className={
                  i < review.rating
                    ? "fill-current text-yellow-400"
                    : "text-gray-300"
                }
                size={20}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-lg leading-8 text-slate-800 dark:text-slate-200">
          "{review.comment}"
        </p>

        <div className="mt-8 flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0083E6] text-base font-semibold text-white">
            {initial}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-200">
              {review.author_name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
