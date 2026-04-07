"use client";

import { motion } from "framer-motion";
import { Instagram, Send, Heart } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Our Story", href: "/#story" },
    { name: "The Event", href: "/#event" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Memories", href: "/#memories" },
    { name: "Upload", href: "/#upload" },
  ];

  const TELEGRAM_GROUP_URL =
    process.env.NEXT_PUBLIC_TELEGRAM_GROUP_URL ??
    "https://t.me/yourweddinggroup";
  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/sharon_tilahun?igsh=c2p4bW93Znc4c2Fu",
      label: "Instagram",
    },
    {
      icon: <Send size={20} />,
      href: TELEGRAM_GROUP_URL,
      label: "Telegram",
    },
  ];

  return (
    <footer className="relative bg-sand/10 pt-20 pb-10 overflow-hidden border-t border-accent/5">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">
          {/* Brand/Signature */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="group">
              <span className="font-heading text-4xl text-sepia block mb-2 transition-colors duration-300 group-hover:text-gold">
                Elias & Saron
              </span>
            </Link>
            <p className="font-body text-xs uppercase tracking-[0.4em] text-accent/60 mb-6">
              April 25, 2026 • Addis Ababa
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/50 rounded-full text-sepia/60 hover:text-gold hover:bg-white transition-all duration-300 shadow-sm border border-accent/5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center">
            <h4 className="font-heading text-xl text-sepia mb-6 underline decoration-gold/30 underline-offset-8 decoration-2">
              Wedding Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-sepia/70 hover:text-gold transition-colors duration-300 tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Special QR Link */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="font-heading text-xl text-sepia mb-6 underline decoration-gold/30 underline-offset-8 decoration-2">
              Share the Love
            </h4>
            <p className="font-body text-sm text-sepia/70 mb-6 max-w-[250px]">
              Access our guest-exclusive group for photos and updates.
            </p>
            <Link
              href="/qr"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-off-white font-body text-xs font-semibold rounded-full transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Get QR Code
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[10px] uppercase tracking-widest text-sepia/40">
            © {currentYear} Elias & Saron Wedding • All rights reserved
          </p>
          <div className="flex items-center gap-2 text-sepia/40 text-[10px] uppercase tracking-widest">
            Made with <Heart size={10} className="text-gold fill-gold" /> for
            our families
          </div>
        </div>
      </div>
    </footer>
  );
};
