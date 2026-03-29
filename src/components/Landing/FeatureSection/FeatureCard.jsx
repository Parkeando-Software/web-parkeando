import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StepIllustration from "@components/Landing/FeatureSection/StepIllustration";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.12 },
  }),
};

export default function FeatureCard({
  step,
  title,
  description,
  illustration,
  showBases,
  index,
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="flex h-full"
    >
      <Card className="group relative flex h-full min-h-[315px] flex-1 overflow-hidden rounded-[2rem] border border-white/55 bg-[linear-gradient(180deg,#7fd3ff_0%,#59c2f6_100%)] shadow-[0_28px_60px_rgba(0,131,230,0.16)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_32%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.16),transparent_28%)]" />
        <div className="absolute inset-x-3 top-3 h-[calc(100%-1.5rem)] rounded-[1.55rem] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.08))]" />

        <CardContent className="relative flex h-full flex-col p-5">
          <div className="flex items-start gap-2 text-[#154173]">
            <span className="text-[3rem] font-black leading-none tracking-[-0.06em]">
              {step}.
            </span>
            <h3 className="pt-2 text-[1.85rem] font-extrabold leading-[0.95] tracking-tight">
              {title}
            </h3>
          </div>

          <div className="mt-2 flex flex-1 items-center justify-center px-1">
            <StepIllustration type={illustration} />
          </div>

          <p className="mt-2 text-[14px] leading-6 text-[#10395f]">
            {description}
          </p>

          {showBases && (
            <div className="mt-4">
              <Link
                to="/bases"
                className="inline-flex items-center rounded-full border border-white/60 bg-white/78 px-4 py-2 text-sm font-semibold text-[#0083E6] shadow-sm transition hover:bg-white"
                aria-label="Ver bases del sorteo"
              >
                Ver bases del sorteo
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
