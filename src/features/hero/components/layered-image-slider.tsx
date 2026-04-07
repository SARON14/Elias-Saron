"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useTransform, useSpring } from "framer-motion";
import { SafeImage } from "@/components/safe-image";

/** Files in public/assets/images/hero/ */
const HERO_ASSETS = [
  "/assets/images/hero/DSC01782.jpg",
  "/assets/images/hero/DSC00296.jpg",
  "/assets/images/hero/DSC01323.jpg",
  "/assets/images/hero/DSC00237.jpg",
  "/assets/images/hero/DSC00479.jpg",
  "/assets/images/hero/DSC00283.jpg",
] as const;

const IMAGE_SETS = [
  [
    { src: HERO_ASSETS[0], size: "w-[40%] h-[60%]", top: "10%", left: "5%", delay: 0, rotate: -2 },
    { src: HERO_ASSETS[1], size: "w-[30%] h-[40%]", top: "50%", left: "55%", delay: 0.5, rotate: 3 },
    { src: HERO_ASSETS[2], size: "w-[25%] h-[35%]", top: "5%", left: "65%", delay: 1, rotate: -1 },
  ],
  [
    { src: HERO_ASSETS[3], size: "w-[35%] h-[55%]", top: "15%", left: "55%", delay: 0, rotate: 1 },
    { src: HERO_ASSETS[4], size: "w-[30%] h-[45%]", top: "45%", left: "10%", delay: 0.5, rotate: -3 },
    { src: HERO_ASSETS[5], size: "w-[20%] h-[30%]", top: "5%", left: "20%", delay: 1, rotate: 2 },
  ],
  [
    { src: HERO_ASSETS[2], size: "w-[45%] h-[65%]", top: "10%", left: "25%", delay: 0, rotate: 0 },
    { src: HERO_ASSETS[4], size: "w-[25%] h-[40%]", top: "40%", left: "70%", delay: 0.5, rotate: 4 },
    { src: HERO_ASSETS[1], size: "w-[20%] h-[30%]", top: "60%", left: "5%", delay: 1, rotate: -4 },
  ],
];

export const LayeredImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse movement for parallax
  const springConfig = { stiffness: 50, damping: 20 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGE_SETS.length);
    }, 5000); // Change image set every 5 seconds

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalize to -0.5 to 0.5
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-cream">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {IMAGE_SETS[currentIndex].map((img, idx) => (
            <LayeredImage
              key={`${currentIndex}-${idx}`}
              image={img}
              mouseX={mouseX}
              mouseY={mouseY}
              floatIndex={idx}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Soft gradient overlay for text readability - lightened */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream/60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-cream/5 z-0 pointer-events-none" />
    </div>
  );
};

interface LayeredImageProps {
  image: typeof IMAGE_SETS[0][0];
  mouseX: any;
  mouseY: any;
  floatIndex: number;
}

/** Deterministic per-layer duration (never use Math.random() here — SSR/hydration must match). */
const FLOAT_DURATION = [4.2, 5.1, 5.8] as const;

const LayeredImage = ({ image, mouseX, mouseY, floatIndex }: LayeredImageProps) => {
  // Parallax calculations
  const x = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, rotate: image.rotate }}
      animate={{ 
        scale: 1, 
        opacity: 0.9, // Higher opacity for more visibility
        y: [0, -15, 0], // Floating motion
          transition: {
            opacity: { duration: 1, delay: image.delay * 0.5 },
            scale: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            y: {
              duration: FLOAT_DURATION[floatIndex % FLOAT_DURATION.length],
              repeat: Infinity,
              ease: "easeInOut",
            },
          }
      }}
      style={{
        position: "absolute",
        top: image.top,
        left: image.left,
        width: image.size.split(" ")[0].replace("w-[", "").replace("]", ""),
        height: image.size.split(" ")[1].replace("h-[", "").replace("]", ""),
        x,
        y,
      }}
      className={`relative rounded-2xl overflow-hidden shadow-2xl border border-cream/50 ${image.size}`}
    >
      <SafeImage
        src={image.src}
        alt="Wedding Moment"
        fill
        className="object-cover"
        sizes="(max-width: 768) 100vw, 50vw"
        priority
      />
    </motion.div>
  );
};
