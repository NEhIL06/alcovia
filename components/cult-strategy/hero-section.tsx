"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ACCENT = "#FF6B2B";
const ACCENT_DIM = "rgba(255,107,43,";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={containerRef}
      id="cult-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── LAYERED BACKGROUNDS ── */}
      <div className="absolute inset-0 z-0">
        {/* Strong center glow */}
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${ACCENT_DIM}0.18) 0%, transparent 65%)` }}
        />
        {/* Inner ring glow */}
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 45% 35% at 50% 38%, ${ACCENT_DIM}0.09) 0%, transparent 55%)` }}
        />
        {/* Bottom warmth */}
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 40% at 50% 90%, rgba(255,60,0,0.07) 0%, transparent 60%)` }}
        />

        {/* Vertical scan-line grid */}
        <div className="absolute inset-0 opacity-[0.04]">
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.div key={i} className="absolute h-full"
              style={{
                left: `${i * 4.76}%`, width: "1px",
                background: `linear-gradient(180deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.025, duration: 1.1, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Top accent stripe */}
        <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent 0%, ${ACCENT} 40%, ${ACCENT} 60%, transparent 100%)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ── GIANT DECORATIVE BG TEXT ── */}
      <motion.div
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: bgTextY }}
      >
        <div className="flex flex-col items-center leading-[0.82] text-center">
          <span className="font-[family-name:var(--font-milan)] font-black uppercase tracking-tighter"
            style={{
              fontSize: "clamp(4rem, 18vw, 22vw)",
              WebkitTextStroke: "1px rgba(255,107,43,0.15)",
              WebkitTextFillColor: "rgba(255,107,43,0.04)",
              color: "transparent",
            }}
          >
            CULT
          </span>
          <span className="font-[family-name:var(--font-milan)] font-black uppercase tracking-tighter"
            style={{
              fontSize: "clamp(4rem, 18vw, 22vw)",
              WebkitTextStroke: "1px rgba(255,107,43,0.12)",
              WebkitTextFillColor: "rgba(255,107,43,0.03)",
              color: "transparent",
            }}
          >
            STRATEGY
          </span>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ opacity: heroOpacity, scale: heroScale, y: textY }}
      >
        {/* Overline pill */}
        <motion.div className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2.5 border rounded-full px-5 py-2"
            style={{ borderColor: `${ACCENT_DIM}0.3)`, background: `${ACCENT_DIM}0.07)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
              style={{ color: ACCENT }}>
              Alcovia Workshop · April 2026
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1 className="font-[family-name:var(--font-milan)] leading-[0.88] tracking-tight mb-4"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[clamp(2.8rem,9vw,8rem)] text-white"
            style={{ textShadow: "0 2px 60px rgba(255,255,255,0.12)" }}>
            The Cult
          </span>
          <span className="relative inline-block text-[clamp(2.8rem,9vw,8rem)]"
            style={{ color: ACCENT, textShadow: `0 0 80px ${ACCENT_DIM}0.55), 0 0 30px ${ACCENT_DIM}0.3)` }}>
            Strategy
            {/* Animated underline glow */}
            <motion.span
              className="absolute left-0 bottom-0 h-[3px] rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }}
              initial={{ width: "0%", opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="text-[clamp(0.75rem,1.6vw,1.1rem)] font-[family-name:var(--font-monument)] uppercase tracking-[0.2em] text-white/50 mb-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          How Brands{" "}
          <span className="text-white/85">Manufacture Hype</span>
        </motion.p>

        {/* Hook line — single, punchy */}
        <motion.p
          className="text-base sm:text-lg md:text-[1.25rem] font-[family-name:var(--font-playfair)] italic text-white/65 max-w-md mx-auto mb-9"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
        >
          Stop getting played by the hype.
        </motion.p>

        {/* CTA + price */}
        <motion.div className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
        >
          <a
            href="#"
            className="group relative inline-flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                (window as any).gtag?.("event", "initiate_checkout", { item_name: "cult_strategy_workshop" });
                (window as any).fbq?.("track", "InitiateCheckout", { content_name: "Cult Strategy Workshop", currency: "INR" });
              }
            }}
          >
            <span
              className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-[1.1rem] rounded-full font-bold transition-all duration-300 group-hover:scale-[1.05]"
              style={{
                background: `linear-gradient(135deg, #FF7A3D 0%, #FF4500 100%)`,
                boxShadow: `0 6px 40px ${ACCENT_DIM}0.55), 0 1px 0 rgba(255,255,255,0.18) inset`,
              }}
            >
              Secure My Spot
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <p className="text-xs text-white/35 font-[family-name:var(--font-satoshi)] tracking-wide">
            ₹3,999 per seat · Lunch included
          </p>
        </motion.div>

        {/* Detail pills */}
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {[
            { icon: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>, label: "April 11th, 2026" },
            { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>, label: "One Horizon Center" },
            { icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>, label: "Grades 6–10" },
          ].map((item, i) => (
            <div key={i} className="inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5"
              style={{ borderColor: "rgba(247,247,243,0.12)", background: "rgba(247,247,243,0.04)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5">
                {item.icon}
              </svg>
              <span className="text-[11px] sm:text-xs text-white/60 font-[family-name:var(--font-satoshi)] whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}

          {/* Limited seats pulsing pill */}
          <div className="inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5"
            style={{ borderColor: `${ACCENT_DIM}0.35)`, background: `${ACCENT_DIM}0.08)` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span className="text-[11px] sm:text-xs font-[family-name:var(--font-satoshi)] font-semibold"
              style={{ color: ACCENT }}>
              Limited Spots
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        <motion.div className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-[1px] h-8" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT_DIM}0.4))` }} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
            className="w-4 h-4 text-white/20">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      {["top-8 left-8 border-t border-l", "top-8 right-8 border-t border-r", "bottom-8 left-8 border-b border-l", "bottom-8 right-8 border-b border-r"].map((cls, i) => (
        <div key={i} className={`hidden sm:block absolute w-10 h-10 ${cls}`}
          style={{ borderColor: `${ACCENT_DIM}0.22)` }} />
      ))}
    </section>
  );
}
