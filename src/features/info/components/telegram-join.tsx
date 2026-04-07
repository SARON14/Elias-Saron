"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { useState } from "react";

const TELEGRAM_GROUP_URL =
  process.env.NEXT_PUBLIC_TELEGRAM_GROUP_URL ?? "https://t.me/yourweddinggroup";
const WEDDING_ALBUM_URL =
  process.env.NEXT_PUBLIC_WEDDING_ALBUM_URL ?? TELEGRAM_GROUP_URL;
const WEDDING_ALBUM_QR_IMAGE = "/assets/images/shared_album/wedding_photos_qr.png";

export const TelegramJoin = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testMessage, setTestMessage] = useState<string | null>(null);

  const handleTelegramTest = async () => {
    setIsTesting(true);
    setTestMessage(null);

    try {
      const response = await fetch("/api/telegram/test", { method: "GET" });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        sendTest?: { ok?: boolean; description?: string } | null;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Telegram test failed.");
      }

      if (data.sendTest && !data.sendTest.ok) {
        setTestMessage(
          `Bot is valid, but send failed: ${data.sendTest.description || "Unknown error."}`,
        );
        return;
      }

      setTestMessage(
        "Telegram test passed. Bot and chat configuration are working.",
      );
    } catch (error) {
      setTestMessage(
        error instanceof Error ? error.message : "Telegram test failed.",
      );
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 overflow-hidden rounded-3xl border border-accent/10 bg-sand/10 p-8 shadow-xl shadow-black/5 backdrop-blur-sm md:flex-row md:p-14">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

          <div className="z-10 flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.5em] text-accent md:text-sm">
                Stay Connected
              </span>
              <h2 className="mb-6 font-heading text-4xl leading-tight text-sepia md:text-5xl">
                See Our{" "}
                <span className="font-serif italic text-accent">Wedding Album</span>
              </h2>
              <p className="mb-8 font-body text-lg leading-relaxed text-sepia/70">
                Scan the QR code to view our wedding photos, relive the moments,
                and enjoy the memories with us.
              </p>

              {/* <a
                href={WEDDING_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-medium text-off-white shadow-md transition-all  active:scale-95 group"
              >
                <Send
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
                Open Wedding Album
              </a> */}

              {/* {process.env.NODE_ENV !== "production" && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleTelegramTest}
                    disabled={isTesting}
                    className="rounded-full border border-accent/40 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isTesting ? "Testing..." : "Test Telegram"}
                  </button>
                  {testMessage && (
                    <p className="mt-3 text-sm text-sepia/80">{testMessage}</p>
                  )}
                </div>
              )} */}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-10 flex w-full flex-col items-center gap-4 md:w-auto"
          >
            <div className="group relative rounded-3xl border border-accent/10 bg-accent/10 p-6 shadow-xl shadow-black/5 backdrop-blur-sm">
              <a
                href={WEDDING_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl bg-off-white/50 ring-1 ring-inset ring-accent/10"
              >
                <SafeImage
                  src={WEDDING_ALBUM_QR_IMAGE}
                  alt="Wedding photo album QR code"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    Scan to View Album
                  </p>
                </div>
              </a>
              <div className="absolute -right-3 -top-3 h-12 w-12 animate-pulse rounded-full bg-accent/20 blur-xl" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Scan for Wedding Photos
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
