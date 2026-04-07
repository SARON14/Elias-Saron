"use client";

import { useRef, useState, useEffect } from "react";
import { SafeImage } from "@/components/safe-image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

/** Files in public/assets/images/highlights/ */
const HIGHLIGHTS_ASSETS = [
  "/assets/images/highlights/DSC00217.jpg",
  "/assets/images/highlights/DSC00237.jpg",
  "/assets/images/highlights/DSC00400.jpg",
  "/assets/images/highlights/DSC00424.jpg",
  "/assets/images/highlights/DSC00562.jpg",
  "/assets/images/highlights/DSC01036.jpg",
  "/assets/images/highlights/DSC01318.jpg",
  "/assets/images/highlights/DSC01471.jpg",
  "/assets/images/highlights/DSC01893.jpg",
  "/assets/images/highlights/DSC01980.jpg",
  "/assets/images/highlights/DSC02240.jpg",
  "/assets/images/highlights/IMG_7563.jpg",
] as const;

const filmImages = HIGHLIGHTS_ASSETS.map((src, i) => ({
  src,
  grayscale: i % 2 === 1,
  id: i + 1,
}));

export const FeaturedMoments = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="gallery" className="overflow-hidden py-20 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:mb-14"
        >
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.45em] text-accent">
            Featured Moments
          </span>
          <h2 className="font-heading text-4xl text-sepia md:text-6xl">
            Timeless{" "}
            <span className="font-serif italic text-accent">Highlights</span>
          </h2>
        </motion.div>

        <div className="mb-12 flex items-center justify-between">
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 text-accent/60 transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 text-accent/60 transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Film Strip Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-8 scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {filmImages.map((img) => (
            <FilmFrame
              key={img.id}
              image={img}
              onExpand={() => setSelectedImage(img.src)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox - Reuse existing logic */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-[70vh] md:h-[85vh] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={selectedImage}
                alt="Featured Moment Detail"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

interface FilmFrameProps {
  image: (typeof filmImages)[0];
  onExpand: () => void;
}

const FilmFrame = ({ image, onExpand }: FilmFrameProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="min-w-[280px] md:min-w-[320px] relative group cursor-pointer"
      onClick={onExpand}
    >
      {/* Film Strip Border Effect */}
      <div className="absolute inset-y-0 left-0 w-8 flex flex-col justify-around items-center py-4 bg-black/20 z-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 w-8 flex flex-col justify-around items-center py-4 bg-black/20 z-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
        ))}
      </div>

      {/* Main Image Container */}
      <div className="aspect-[3/4] overflow-hidden bg-sepia/5 relative shadow-2xl">
        <SafeImage
          src={image.src}
          alt={`Featured Moment ${image.id}`}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${image.grayscale ? "grayscale hover:grayscale-0" : ""}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Maximize Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-sepia/20">
          <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center border border-accent/40">
            <Maximize2 className="text-accent w-6 h-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
