"use client";

import { motion } from "framer-motion";

import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#22C55E";
const ACCENT_DIM = "rgba(34,197,94,";

export default function CtaMidSection() {
  return (
    <section className="relative py-10 sm:py-16 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <CursorParallaxGrid opacity={0.05} depth={20} spotlight />
        <div style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,197,94,0.07) 0%, transparent 65%)",
        }} className="absolute inset-0" />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="relative border rounded-3xl overflow-hidden"
          style={{
            borderColor: `${ACCENT_DIM}0.18)`,
            background: `linear-gradient(135deg, ${ACCENT_DIM}0.04) 0%, rgba(247,247,243,0.02) 50%, ${ACCENT_DIM}0.04) 100%)`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top gradient stripe */}
          <div
            className="h-[2px]"
            style={{
              background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
            }}
          />

          {/* Corner accents */}
          {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-6 h-6 ${cls}`}
              style={{ borderColor: `${ACCENT_DIM}0.2)` }}
            />
          ))}

          <div className="p-6 sm:p-10 lg:p-14">
            {/* Quote icon */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span
                className="text-5xl sm:text-7xl font-[family-name:var(--font-playfair)] leading-none"
                style={{ color: `${ACCENT_DIM}0.2)` }}
              >
                &ldquo;
              </span>
            </motion.div>

            {/* Quote text */}
            <motion.p
              className="text-[clamp(1.15rem,2.8vw,1.9rem)] font-[family-name:var(--font-playfair)] italic text-white/90 mb-1 leading-snug"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              &ldquo;Every superfood you eat today started
            </motion.p>
            <motion.p
              className="text-[clamp(1.15rem,2.8vw,1.9rem)] font-[family-name:var(--font-playfair)] italic mb-2 leading-snug"
              style={{ color: ACCENT }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              in someone&apos;s notebook.&rdquo;
            </motion.p>

            {/* Attribution divider */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-7"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="h-px w-8" style={{ background: `${ACCENT_DIM}0.3)` }} />
              <span
                className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-satoshi)]"
                style={{ color: `${ACCENT_DIM}0.55)` }}
              >
                Edible Engineering
              </span>
              <div className="h-px w-8" style={{ background: `${ACCENT_DIM}0.3)` }} />
            </motion.div>

            {/* Price + CTA */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Price with decorative lines */}
              <div className="flex items-center gap-4">
                <div
                  className="h-px w-10 sm:w-16"
                  style={{ background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.4))` }}
                />
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-3xl sm:text-4xl font-[family-name:var(--font-monument)] font-bold"
                    style={{ color: ACCENT }}
                  >
                    &#8377;3,999
                  </span>
                  <span className="text-xs sm:text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
                    per seat
                  </span>
                </div>
                <div
                  className="h-px w-10 sm:w-16"
                  style={{ background: `linear-gradient(to left, transparent, ${ACCENT_DIM}0.4))` }}
                />
              </div>

              <WorkshopCheckoutLink
                ctaSource="mid"
                className="group relative inline-flex items-center gap-3 overflow-hidden"
              >
                <span
                  className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-9 sm:px-12 py-4 sm:py-5 rounded-full font-bold transition-all duration-400 group-hover:scale-[1.04]"
                  style={{
                    background: `linear-gradient(135deg, #22C55E 0%, #16A34A 100%)`,
                    boxShadow: `0 4px 28px ${ACCENT_DIM}0.4), 0 1px 0 rgba(255,255,255,0.12) inset`,
                  }}
                >
                  Register Now
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </WorkshopCheckoutLink>

              <p className="text-[10px] sm:text-xs text-white/35 font-[family-name:var(--font-satoshi)]">
                Lunch included &middot; May 2nd, 2026 &middot; Horizon Center
              </p>
            </motion.div>
          </div>

          {/* Bottom gradient stripe */}
          <div
            className="h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.15), transparent)`,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
