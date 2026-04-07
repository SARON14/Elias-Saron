"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const RSVPForm = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 2000);
  };

  return (
    <section className="py-24 bg-off-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading text-sepia mb-4">Will You Join Us?</h2>
          <p className="text-accent font-body uppercase tracking-[0.2em] text-sm">Please RSVP by April 10, 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-8 md:p-12 rounded-sm shadow-2xl border border-gold/10 relative"
        >
          {formStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-heading text-sepia mb-4">Thank You!</h3>
              <p className="text-sepia/70 font-body">We've received your RSVP. We can't wait to see you!</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-xs uppercase tracking-widest text-sepia/60 font-medium">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full bg-transparent border-b border-sepia/20 py-2 focus:border-gold outline-none transition-colors font-body text-sepia"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-xs uppercase tracking-widest text-sepia/60 font-medium">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full bg-transparent border-b border-sepia/20 py-2 focus:border-gold outline-none transition-colors font-body text-sepia"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sepia/60 font-medium">Will you be attending?</label>
                <div className="flex gap-8 mt-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="attending" value="yes" required className="hidden peer" />
                    <div className="w-5 h-5 rounded-full border border-sepia/20 peer-checked:border-gold peer-checked:bg-gold transition-all" />
                    <span className="text-sepia/80 font-body group-hover:text-sepia transition-colors">Yes, I'll be there</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="attending" value="no" className="hidden peer" />
                    <div className="w-5 h-5 rounded-full border border-sepia/20 peer-checked:border-sepia peer-checked:bg-sepia transition-all" />
                    <span className="text-sepia/80 font-body group-hover:text-sepia transition-colors">I can't make it</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest text-sepia/60 font-medium">Number of Guests</label>
                <select id="guests" className="w-full bg-transparent border-b border-sepia/20 py-2 focus:border-gold outline-none transition-colors font-body text-sepia cursor-pointer">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="note" className="block text-xs uppercase tracking-widest text-sepia/60 font-medium">Message for the couple (Optional)</label>
                <textarea
                  id="note"
                  rows={3}
                  className="w-full bg-transparent border-b border-sepia/20 py-2 focus:border-gold outline-none transition-colors font-body text-sepia resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-4 bg-sepia text-off-white font-body uppercase tracking-[0.2em] hover:bg-gold hover:text-sepia transition-all duration-500 shadow-xl disabled:opacity-50"
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Confirm RSVP'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
