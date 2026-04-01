"use client";

import { motion } from "framer-motion";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#FF6B2B";
const ACCENT_DIM = "rgba(255,107,43,";

const eventDetails = [
  {
    icon: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    label: "April 11th, 2026",
  },
  {
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    label: "11:00 AM to 4:00 PM",
  },
  {
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
    label: "One Horizon Center",
  },
  {
    icon: <><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" /></>,
    label: "Lunch Included",
  },
];

export default function ClosingCtaSection() {
  return (
    <section
      id="cult-cta"
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <CursorParallaxGrid opacity={0.045} depth={18} spotlight />
        <div style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(255,107,43,0.07) 0%, transparent 70%)",
        }} className="absolute inset-0" />
      </div>
      {/* Top divider gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(247,247,243,0.06), transparent)",
        }}
      />

      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-[family-name:var(--font-milan)] font-black uppercase tracking-tighter whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 22vw, 28vw)",
            WebkitTextStroke: `1px ${ACCENT_DIM}0.04)`,
            WebkitTextFillColor: "transparent",
            color: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          SECURE
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Overline pill */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2.5 border rounded-full px-4 py-1.5"
            style={{
              borderColor: `${ACCENT_DIM}0.25)`,
              background: `${ACCENT_DIM}0.06)`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: ACCENT }}
            />
            <span
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
              style={{ color: ACCENT }}
            >
              Limited Spots Remaining
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-[clamp(1.75rem,5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-tight mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          Ready to learn{" "}
          <br />
          <span style={{ color: ACCENT }}>the playbook?</span>
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base lg:text-lg text-white/55 font-[family-name:var(--font-satoshi)] max-w-xl mx-auto mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Spots are strictly limited to ensure high-stakes mentorship. One day.
          The brand-building knowledge that changes how you see everything.
        </motion.p>

        {/* Event details pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {eventDetails.map((detail, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5"
              style={{
                borderColor: "rgba(247,247,243,0.08)",
                background: "rgba(247,247,243,0.02)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.5}
                className="w-3.5 h-3.5 flex-shrink-0"
              >
                {detail.icon}
              </svg>
              <span className="text-[11px] sm:text-xs text-white/65 font-[family-name:var(--font-satoshi)] whitespace-nowrap">
                {detail.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Price + CTA */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Price */}
          <div className="flex items-center gap-4">
            <div
              className="h-px w-10 sm:w-16"
              style={{
                background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.4))`,
              }}
            />
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-4xl sm:text-5xl font-[family-name:var(--font-monument)] font-bold"
                style={{ color: ACCENT }}
              >
                &#8377;3,999
              </span>
              <span className="text-sm text-white/45 font-[family-name:var(--font-satoshi)]">
                per seat
              </span>
            </div>
            <div
              className="h-px w-10 sm:w-16"
              style={{
                background: `linear-gradient(to left, transparent, ${ACCENT_DIM}0.4))`,
              }}
            />
          </div>

          {/* CTA */}
          <a
            href="#"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                (window as any).gtag?.("event", "initiate_checkout", {
                  payment_method: "razorpay",
                  item_name: "cult_strategy_workshop",
                });
                (window as any).fbq?.("track", "InitiateCheckout", {
                  content_name: "Cult Strategy Workshop",
                  currency: "INR",
                });
              }
            }}
          >
            <span
              className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-bold transition-all duration-400 group-hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, #FF6B2B 0%, #FF4500 100%)`,
                boxShadow: `0 4px 32px ${ACCENT_DIM}0.45), 0 1px 0 rgba(255,255,255,0.15) inset`,
              }}
            >
              Secure My Spot
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <p className="text-xs text-white/30 font-[family-name:var(--font-satoshi)] tracking-wide">
            Secure payment &middot; Instant confirmation
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 mt-10 sm:mt-16 mb-8 sm:mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex-1 h-px" style={{ background: "rgba(247,247,243,0.06)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${ACCENT_DIM}0.3)` }} />
          <div className="flex-1 h-px" style={{ background: "rgba(247,247,243,0.06)" }} />
        </motion.div>

        {/* Contact + Social */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="mailto:info@alcovia.life"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-[#FF6B2B] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              info@alcovia.life
            </a>
            <a
              href="tel:8085901818"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-[#FF6B2B] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              8085901818
            </a>
          </div>

          {/* Share links */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] sm:text-xs text-white/25 font-[family-name:var(--font-satoshi)] tracking-wider uppercase mr-2">
              Share
            </span>
            {/* WhatsApp */}
            <a
              href="https://wa.me/?text=Check%20out%20The%20Cult%20Strategy%20Workshop%20by%20Alcovia%20-%20How%20Brands%20Manufacture%20Hype!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/[0.08] flex items-center justify-center text-[#F7F7F3]/25 hover:text-[#FF6B2B] hover:border-[#FF6B2B]/30 hover:bg-[#FF6B2B]/[0.05] transition-all duration-300"
              aria-label="Share on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20The%20Cult%20Strategy%20Workshop%20by%20Alcovia%20-%20How%20Brands%20Manufacture%20Hype!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/[0.08] flex items-center justify-center text-[#F7F7F3]/25 hover:text-[#FF6B2B] hover:border-[#FF6B2B]/30 hover:bg-[#FF6B2B]/[0.05] transition-all duration-300"
              aria-label="Share on X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url="
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/[0.08] flex items-center justify-center text-[#F7F7F3]/25 hover:text-[#FF6B2B] hover:border-[#FF6B2B]/30 hover:bg-[#FF6B2B]/[0.05] transition-all duration-300"
              aria-label="Share on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/alcovia.life/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/[0.08] flex items-center justify-center text-[#F7F7F3]/25 hover:text-[#FF6B2B] hover:border-[#FF6B2B]/30 hover:bg-[#FF6B2B]/[0.05] transition-all duration-300"
              aria-label="Follow on Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-xs text-white/25 hover:text-[#FF6B2B]/60 transition-colors font-[family-name:var(--font-satoshi)] tracking-wider uppercase mt-2 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3">
              <path d="M12 5v14M5 12l7-7 7 7" />
            </svg>
            Back to top
          </button>
        </motion.div>
      </div>
    </section>
  );
}
