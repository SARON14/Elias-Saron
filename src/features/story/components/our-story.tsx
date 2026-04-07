"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/safe-image";

/** Files in public/assets/images/our-story/ */
const OUR_STORY_IMAGES = {
  firstMeeting: "/assets/images/our-story/photo_2026-04-03_10-41-37.jpg",
  forever: "/assets/images/memories/DSC00296.jpg",
} as const;

const stories = [
  {
    date: "March 6 2025",
    title: "The First Meeting",
    description: "In the heart of Addis Ababa, where coffee and conversation spark a lifelong journey, our first meeting took place within the quiet grace of a church where faith, chance, and destiny gently intertwined.",
    image: OUR_STORY_IMAGES.firstMeeting,
  },
  {
    date: "April 25, 2026",
    title: "Our Forever Begins",
    description: "We can't wait to celebrate our union with all of you.",
    image: OUR_STORY_IMAGES.forever,
  },
];

export const OurStory = () => {
  return (
    <section id="story" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-heading text-sepia mb-4">Our Story</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-accent/40" />
            <span className="text-accent font-body uppercase tracking-[0.2em] text-sm font-bold">Journey Together</span>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/20 hidden md:block" />

          {stories.map((story, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center mb-24 last:mb-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Image column */}
              <div className="w-full md:w-1/2 px-8 mb-8 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl"
                >
                  <SafeImage
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-accent/10" />
                </motion.div>
              </div>

              {/* Text Column */}
              <div className="w-full md:w-1/2 px-8 flex flex-col justify-center text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`${index % 2 === 1 ? 'md:pr-12' : 'md:pl-12'}`}
                >
                  <span className="text-accent font-serif italic text-xl mb-2 block">{story.date}</span>
                  <h3 className="text-3xl font-heading text-sepia mb-4">{story.title}</h3>
                  <p className="text-sepia/70 font-body leading-relaxed max-w-md mx-auto md:mx-0">
                    {story.description}
                  </p>
                </motion.div>
              </div>

              {/* Connector Dot */}
              <div className="absolute left-1/2 -ml-2 w-4 h-4 rounded-full bg-off-white border-2 border-accent hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
