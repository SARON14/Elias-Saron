"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING_COUNTDOWN_AT } from "@/lib/site-dates";

export type WeddingClock = {
  mounted: boolean;
  married: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const MS_DAY = 1000 * 60 * 60 * 24;
const MS_HOUR = 1000 * 60 * 60;
const MS_MIN = 1000 * 60;

export function useWeddingClock(): WeddingClock {
  const targetMs = useMemo(() => WEDDING_COUNTDOWN_AT.getTime(), []);

  const [clock, setClock] = useState<WeddingClock>({
    mounted: false,
    married: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const married = now >= targetMs;
      const delta = married ? now - targetMs : targetMs - now;

      setClock({
        mounted: true,
        married,
        days: Math.floor(delta / MS_DAY),
        hours: Math.floor((delta % MS_DAY) / MS_HOUR),
        minutes: Math.floor((delta % MS_HOUR) / MS_MIN),
        seconds: Math.floor((delta % MS_MIN) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return clock;
}

const TimeUnit = ({
  label,
  value,
  index,
  compactNumber,
}: {
  label: string;
  value: number;
  index: number;
  compactNumber?: boolean;
}) => {
  const display =
    compactNumber || value > 99 ? String(value) : String(value).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 + index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-b from-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div
          className={`min-w-16 md:min-w-24 px-1 md:px-2 w-16 h-22 md:w-24 md:h-32 bg-off-white/60 backdrop-blur-xl border border-accent/20 rounded-2xl flex items-center justify-center mb-3 shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(161,175,152,0.1)] group-hover:border-accent/40 group-hover:-translate-y-1 overflow-hidden relative ${compactNumber ? "md:min-w-[5.5rem]" : ""}`}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 20, opacity: 0, rotateX: 45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -20, opacity: 0, rotateX: -45 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`font-heading text-sepia font-light tracking-tighter ${compactNumber ? "text-xl md:text-3xl" : "text-3xl md:text-5xl"}`}
            >
              {display}
            </motion.span>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-accent/10 pointer-events-none" />
          <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-gold/40" />
        </div>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-accent font-bold opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        {label}
      </span>
    </motion.div>
  );
};

export function Countdown({ clock }: { clock: WeddingClock }) {
  if (!clock.mounted) return null;

  const items = [
    { label: "Days", value: clock.days, compact: clock.days > 99 },
    { label: "Hours", value: clock.hours },
    { label: "Mins", value: clock.minutes },
    { label: "Secs", value: clock.seconds },
  ];

  return (
    <div className="mt-8 md:mt-14">
      {clock.married && (
        <p className="text-center font-heading text-2xl md:text-3xl text-sepia mb-2">
          We&apos;re <span className="text-gold italic">married</span>
        </p>
      )}
      <p className="text-center font-body text-xs uppercase tracking-[0.35em] text-accent/70 mb-6">
        {clock.married ? "Together since our day" : "Until the big day"}
      </p>
      <div className="flex justify-center gap-3 md:gap-8 flex-wrap">
        {items.map((item, index) => (
          <TimeUnit
            key={item.label}
            label={item.label}
            value={item.value}
            index={index}
            compactNumber={item.compact}
          />
        ))}
      </div>
    </div>
  );
}
