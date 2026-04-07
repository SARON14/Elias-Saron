"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { LayeredImageSlider } from "./layered-image-slider";
import { MusicPlayer } from "./music-player";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-off-white"
    >
      {/* Dynamic Layered Background */}
      <LayeredImageSlider />

      {/* Content Overlay */}
      <motion.div
        style={{ opacity: opacityTransform, y: yTranslate }}
        className="absolute left-1/2 top-[60%] z-10 flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4 text-center md:top-[62%]"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <Heart
            className="mb-5 h-4 w-4 text-rose-400/90 md:mb-6 md:h-5 md:w-5"
            strokeWidth={1.35}
            aria-hidden
          />

          <h1 className="mb-8 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-1 font-heading font-normal tracking-tight text-[#252830] md:mb-9 md:gap-x-2.5">
            <span className="text-[2.1rem] leading-none sm:text-4xl md:text-5xl lg:text-6xl">
              Elias
            </span>
            <span className="mx-0.5 translate-y-[0.02em] font-heading text-[2.35rem] font-light italic leading-none sm:text-[2.85rem] md:text-[3.75rem] lg:text-[4.25rem]">
              &
            </span>
            <span className="text-[2.1rem] leading-none sm:text-4xl md:text-5xl lg:text-6xl">
              Saron
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2.5 inline-flex items-center justify-center gap-4 rounded-full border border-white/70 bg-white/55 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md md:gap-8 md:px-10 md:py-4"
          >
            <span className="font-heading text-sm font-light italic text-[#252830]/55 md:text-base">
              April
            </span>
            <div className="flex min-w-[2.65rem] flex-col items-center md:min-w-[3.25rem]">
              <span className="font-heading text-[2.35rem] font-semibold leading-[0.85] text-[#252830] md:text-5xl lg:text-6xl">
                25
              </span>
              <span className="mt-0.5 font-heading text-[6px] font-normal uppercase tracking-[0.22em] text-[#252830]/45 md:text-[8px]">
                Sat
              </span>
            </div>
            <span className="font-heading text-sm font-light italic text-[#252830]/55 md:text-base">
              2026
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mb-6 font-heading text-sm font-light text-[#252830]/75 md:text-base"
          >
            3:00 PM
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mb-2.5 font-body text-[9px] font-medium uppercase tracking-[0.34em] text-[#252830]/80 md:text-[11px] md:tracking-[0.4em]"
          >
            We are getting married
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="font-heading text-xs font-light italic text-[#252830]/60 md:text-sm"
          >
            Addis Ababa, Ethiopia
          </motion.p>
        </motion.div>
      </motion.div>

      <MusicPlayer />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center md:bottom-5"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-7 w-[1.5px] rounded-full bg-gradient-to-b from-gold/60 to-transparent md:h-9"
        />
      </motion.div>
    </section>
  );
};
