"use client";

import { motion } from "framer-motion";
import { QrCode, ArrowLeft, Send, Sparkles, Download } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/safe-image";

const TELEGRAM_GROUP_URL =
  process.env.NEXT_PUBLIC_TELEGRAM_GROUP_URL ?? "https://t.me/yourweddinggroup";
const TELEGRAM_QR_IMAGE = process.env.NEXT_PUBLIC_TELEGRAM_QR_IMAGE ?? "";

export default function QRPage() {
  return (
    <main className="min-h-screen bg-off-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />

      {/* Background patterns */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--sepia) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container max-w-2xl mx-auto relative z-10">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sepia/60 hover:text-accent font-body text-xs font-semibold uppercase tracking-widest transition-colors duration-300 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>
        </motion.div>

        {/* Card Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative bg-white rounded-[40px] shadow-2xl shadow-black/5 border border-accent/10 overflow-hidden flex flex-col items-center p-8 md:p-16 text-center"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-accent to-gold opacity-80" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.3em]">
              <Sparkles size={12} />
              Guest Access
            </span>
          </motion.div>

          <h1 className="font-heading text-4xl md:text-5xl text-sepia mb-4">
            Elias & Saron
          </h1>
          <p className="font-body text-sm text-sepia/50 uppercase tracking-[0.4em] mb-12 border-b border-accent/10 pb-4">
            Wedding Group • 20.06.26
          </p>

          {/* QR Code Container */}
          <div className="relative group mb-12">
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold/20 via-accent/20 to-gold/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative p-8 bg-white rounded-[32px] border border-accent/10 shadow-lg ring-1 ring-black/5 transform transition-transform duration-500 hover:scale-[1.02]">
              <div className="bg-sand/10 p-4 rounded-2xl">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-white">
                  {TELEGRAM_QR_IMAGE ? (
                    <SafeImage
                      src={TELEGRAM_QR_IMAGE}
                      alt="Telegram group QR code"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  ) : (
                    <QrCode
                      size={200}
                      className="text-sepia/80"
                      strokeWidth={1}
                    />
                  )}
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 h-12 w-12 bg-accent rounded-2xl flex items-center justify-center text-off-white shadow-xl shadow-accent/20">
                <Send size={24} />
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-sm">
            <h3 className="font-heading text-2xl text-sepia">
              Scan to Join Our{" "}
              <span className="font-serif italic text-accent">Telegram</span>
            </h3>
            <p className="font-body text-sepia/70 text-base leading-relaxed">
              Stay updated with real-time news, share your photos with us, and
              connect with other beloved guests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href={TELEGRAM_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-off-white font-body font-medium rounded-full  transition-all duration-300 shadow-lg shadow-accent/10 transform active:scale-95 flex-1"
              >
                Join Group Now
              </a>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-sepia border border-accent/20 font-body font-medium rounded-full hover:bg-sand/30 transition-all duration-300 shadow-md transform active:scale-95"
              >
                <Download size={18} />
                Print Card
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-sepia/30">
            Addis Ababa, Ethiopia • April 2026
          </p>
        </motion.div>
      </div>
    </main>
  );
}
