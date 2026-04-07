"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";

const photos = [
  { src: "/assets/images/gallery-grid/gallery-1.jpg", alt: "Engagement 1", span: "md:col-span-2 md:row-span-2" },
  { src: "/assets/images/gallery-grid/gallery-2.jpg", alt: "Engagement 2", span: "md:col-span-1 md:row-span-1" },
  { src: "/assets/images/gallery-grid/gallery-3.jpg", alt: "Elias", span: "md:col-span-1 md:row-span-1" },
  { src: "/assets/images/gallery-grid/gallery-4.jpg", alt: "Saron", span: "md:col-span-1 md:row-span-2" },
  { src: "/assets/images/gallery-grid/gallery-5.jpg", alt: "The Wedding", span: "md:col-span-1 md:row-span-1" },
];

export const GalleryGrid = () => {
  return (
    <section className="py-24 bg-off-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading text-sepia mb-4">Gallery</h2>
          <p className="text-accent font-body uppercase tracking-[0.2em] text-sm">Moments captured in time</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-sm shadow-lg group ${photo.span}`}
            >
              <SafeImage
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-sepia/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="px-4 py-2 border border-off-white/40 text-off-white font-body text-xs uppercase tracking-widest backdrop-blur-sm">
                  View Photo
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
