"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 }}
      className="fixed bottom-8 right-8 z-50 group"
    >
      <div className="flex items-center gap-3 bg-cream/80 backdrop-blur-md px-4 py-2 rounded-full border border-accent/20 shadow-lg group-hover:border-accent/40 transition-all duration-300">
        <span className="text-xs font-body tracking-wider text-sepia/60 uppercase group-hover:text-sepia transition-colors">
          Our Song
        </span>
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-cream hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>
      
      {/* Hidden Audio Element - Using a placeholder royalty free audio for now */}
      <audio 
        ref={audioRef} 
        loop
        src="/assets/mp3/koka%20-%20elelta%202026-04-06%2015_16.m4a" 
      />

      {isPlaying && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [8, 16, 8],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-1 bg-accent rounded-full"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
