"use client";

import { useState, useEffect } from "react";
import { SafeImage } from "@/components/safe-image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";


interface GalleryItem {
  id: number;
  src: string;
  title?: string;
  subtitle?: string;
  colSpan: string;
  rowSpan: string;
}

/** Files in public/assets/images/memories/ */
const MEMORIES_ASSETS = [
  "/assets/images/memories/DSC00221.jpg",
  "/assets/images/memories/DSC00232.jpg",
  "/assets/images/memories/DSC00241.jpg",
  "/assets/images/memories/DSC00254.jpg",
  "/assets/images/memories/DSC00283.jpg",
  "/assets/images/memories/DSC00296.jpg",
  "/assets/images/memories/DSC00302.jpg",
  "/assets/images/memories/DSC00334.jpg",
  "/assets/images/memories/DSC00418.jpg",
  "/assets/images/memories/DSC00479.jpg",
  "/assets/images/memories/DSC00916.jpg",
  "/assets/images/memories/DSC00934.jpg",
  "/assets/images/memories/DSC00982.jpg",
  "/assets/images/memories/DSC01233.jpg",
  "/assets/images/memories/DSC01264.jpg",
  "/assets/images/memories/DSC01275.jpg",
  "/assets/images/memories/DSC01323.jpg",
  "/assets/images/memories/DSC01326.jpg",
  "/assets/images/memories/DSC01449.jpg",
  "/assets/images/memories/DSC01477.jpg",
  "/assets/images/memories/DSC01496.jpg",
  "/assets/images/memories/DSC01782.jpg",
  "/assets/images/memories/DSC02031.jpg",
  "/assets/images/memories/DSC02068.jpg",
  "/assets/images/memories/DSC02280.jpg",
  "/assets/images/memories/DSC02283.jpg",
  "/assets/images/memories/DSC02288.jpg",
  "/assets/images/memories/IMG_7545.jpg",
] as const;

/** Repeating bento row spans (one per cell in each 3-column × 4-row block) */
const MEMORY_ROW_LAYOUTS = [
  "md:row-start-1 md:row-end-2",
  "md:row-start-1 md:row-end-3",
  "md:row-start-1 md:row-end-4",
  "md:row-start-2 md:row-end-5",
  "md:row-start-3 md:row-end-5",
  "md:row-start-4 md:row-end-5",
] as const;

const GALLERY_ITEMS: GalleryItem[] = MEMORIES_ASSETS.map((src, idx) => ({
  id: idx + 1,
  src,
  colSpan: "",
  rowSpan: MEMORY_ROW_LAYOUTS[idx % MEMORY_ROW_LAYOUTS.length],
}));

export const MemoryGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage]);

  return (
    <section id="memories" className="py-20 px-4 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:mb-14"
        >
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.45em] text-accent">
            Our Memories
          </span>
          <h2 className="font-heading text-4xl text-sepia md:text-6xl">
            Captured{" "}
            <span className="font-serif italic text-accent">Moments</span>
          </h2>
        </motion.div>

        {/* Scrollable Grid Container */}
        <div className="overflow-x-auto overflow-y-hidden pb-8 [scrollbar-width:thin] [scrollbar-color:rgba(161,175,152,0.2)_transparent] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-accent/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          <motion.div
            layout
            className="grid gap-4 md:gap-6"
            style={{
              gridTemplateRows: "repeat(4, 140px)",
              gridAutoFlow: "column",
              gridAutoColumns: "minmax(250px, 1fr)",
              width: GALLERY_ITEMS.length > 6 ? "max-content" : "100%",
            }}
          >
            <AnimatePresence mode="popLayout">
              {GALLERY_ITEMS.map((item, idx) => {
                // Calculate column start based on item index to avoid overlap
                // Sets of 6 items, each set takes 3 columns
                const setIndex = Math.floor(idx / 6);
                const colInSet = idx % 6 < 3 ? (idx % 3) : (idx % 3);
                const gridColStart = colInSet + 1 + setIndex * 3;

                // Extract row span from the user's hardcoded strings
                const rowStartMatch = item.rowSpan.match(/row-start-(\d+)/);
                const rowEndMatch = item.rowSpan.match(/row-end-(\d+)/);
                const rowStart = rowStartMatch ? parseInt(rowStartMatch[1]) : 1;
                const rowEnd = rowEndMatch ? parseInt(rowEndMatch[1]) : 2;

                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-sm cursor-pointer min-w-[280px] md:min-w-[320px] bg-sepia"
                    style={{
                      gridRow: `${rowStart} / ${rowEnd}`,
                      gridColumn: `${gridColStart} / ${gridColStart + 1}`,
                    }}
                    onClick={() => setSelectedImage(item.src)}
                  >
                    <SafeImage
                      src={item.src}
                      alt={item.title || "Wedding memory"}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    <div className="absolute inset-0 bg-sepia/20 opacity-100 transition-opacity duration-500 group-hover:bg-sepia/40" />
                    
                    {item.title && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-sepia/60 via-sepia/20 to-transparent">
                        <span className="mb-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white/70 font-body">
                          {item.subtitle}
                        </span>
                        <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white/95 tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                    )}

                    <div className="absolute inset-0 border border-white/5 opacity-40 group-hover:opacity-100 group-hover:border-white/20 transition-all duration-500" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Closing Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32 text-center"
        >
          <div className="flex flex-col items-center">
             <div className="h-[1px] w-12 bg-accent/30 mb-8" />
             <h4 className="font-heading text-3xl md:text-5xl text-sepia/90 brightness-110">Elias & Saron</h4>
             <p className="mt-4 font-body text-xs uppercase tracking-[0.5em] text-gold/40 italic">Since 2026</p>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute right-6 top-6 z-10 text-white/60 transition-colors hover:text-white md:right-10 md:top-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1.5} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl h-[70vh] md:h-[85vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={selectedImage}
                alt="Memory"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
