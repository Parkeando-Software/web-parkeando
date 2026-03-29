import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import ReviewCard from "@components/Landing/ReviewSection/ReviewCard";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

export default function ReviewsSlider() {
  const cardRefs = useRef([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(apiRoutes.landingReviews());
        setReviews(response.data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (cardRefs.current.length) {
      const heights = cardRefs.current.map((card) => card?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    }
  }, [reviews]);

  if (reviews.length === 0) return null;

  return (
    <Swiper
      modules={[A11y, Autoplay]}
      loop={reviews.length > 1}
      freeMode
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={6000}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
      }}
      allowTouchMove
      className="mb-12"
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index} className="h-full flex">
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex h-full flex-col px-2 py-8"
            ref={(el) => (cardRefs.current[index] = el)}
            style={maxHeight > 0 ? { height: maxHeight } : undefined}
          >
            <ReviewCard review={review} />
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
