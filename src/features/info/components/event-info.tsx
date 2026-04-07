"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

export const EventInfo = () => {
  return (
    <section id="event" className="py-24 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading text-sepia mb-4">
            The Celebration
          </h2>
          <p className="text-accent/60 font-body uppercase tracking-[0.2em] text-sm">
            Join us for our special day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Date */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center text-center p-8 border border-sepia/10 rounded-sm hover:border-gold/40 transition-colors duration-500 group"
          >
            <div className="mb-6 p-4 rounded-full bg-sepia/5 group-hover:bg-gold/20 transition-colors duration-500 text-gold">
              <Calendar size={32} />
            </div>
            <h3 className="text-2xl font-heading text-sepia mb-2">When</h3>
            <p className="text-sepia/70 font-body">Saturday, April 25, 2026</p>
            <p className="text-sepia/70 font-body mt-2">
              Ceremony starts at 3:00 PM
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center text-center p-8 border border-sepia/10 rounded-sm hover:border-gold/40 transition-colors duration-500 group"
          >
            <div className="mb-6 p-4 rounded-full bg-sepia/5 group-hover:bg-gold/20 transition-colors duration-500 text-gold">
              <MapPin size={32} />
            </div>
            <h3 className="text-2xl font-heading text-sepia mb-2">Where</h3>
            <p className="text-sepia/70 font-body">Ayat Mekane Yesus Church</p>
            <p className="text-sepia/70 font-body mt-2">
              Ayat Tafo Mebrat Haile, Addis Ababa, Ethiopia
            </p>
          </motion.div>

          {/* Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center text-center p-8 border border-sepia/10 rounded-sm hover:border-gold/40 transition-colors duration-500 group"
          >
            <div className="mb-6 p-4 rounded-full bg-sepia/5 group-hover:bg-gold/20 transition-colors duration-500 text-gold">
              <Clock size={32} />
            </div>
            <h3 className="text-2xl font-heading text-sepia mb-2">Details</h3>
            <p className="text-sepia/70 font-body">Vow Exchange Ceremony</p>
            <p className="text-sepia/70 font-body mt-2">Dress code: Formal</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=Ayat+Mekane+Yesus+Church"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gold text-white font-body font-medium rounded-full hover:bg-accent transition-colors duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            GET DIRECTIONS
          </a>
        </motion.div>
      </div>
    </section>
  );
};
