"use client";

import { motion } from "framer-motion";
import { Countdown, useWeddingClock } from "./countdown";

export const CountdownSection = () => {
  const clock = useWeddingClock();

  return (
    <section className="py-20 bg-off-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
            {clock.mounted && clock.married
              ? "Forever begins"
              : "The Final Countdown"}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-sepia mb-4">
            {clock.mounted && clock.married ? (
              <>
                Thank you for celebrating{" "}
                <span className="text-gold italic font-serif">with us</span>
              </>
            ) : (
              <>
                Can&apos;t Wait to{" "}
                <span className="text-gold italic font-serif">Celebrate</span>{" "}
                with You
              </>
            )}
          </h2>
          <p className="text-sepia/60 font-body text-sm uppercase tracking-widest">
            Gathering in Addis Ababa • April 25, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Countdown clock={clock} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-accent/40 font-body text-xs uppercase tracking-[0.6em] italic"
        >
          {clock.mounted && clock.married
            ? "Every moment since we became one"
            : "Until we become one"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <p className="font-body text-lg text-sepia/80 italic leading-relaxed">
            "ቸር ነውና፥ ምሕረቱ ለዘላለም ነውና፡ እግዚአብሔርን አመስግኑ፤"
          </p>
          <p className="font-body text-md text-sepia/60 mt-2">
            Psalms 107:1 - "Give thanks to the Lord, for he is good; his love
            endures forever."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
