"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);

  return (
    <section
      id="f1-hero"
      ref={containerRef}
      className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0">
        {/* Racing stripes */}
        <div className="absolute inset-0 opacity-[0.04]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full"
              style={{
                left: `${i * 5}%`,
                width: "1px",
                background:
                  "linear-gradient(180deg, transparent 0%, #EABF36 50%, transparent 100%)",
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.05, duration: 1.2, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Checkered pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-conic-gradient(#F7F7F3 0% 25%, transparent 0% 50%)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(234,191,54,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Top racing stripe accent */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EABF36] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        style={{ opacity: heroOpacity, scale: heroScale, y: textY }}
      >
        {/* Overline */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="h-px w-8 sm:w-12 bg-[#EABF36]" />
          <span className="text-[#EABF36] text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]">
            Alcovia Workshop
          </span>
          <span className="h-px w-8 sm:w-12 bg-[#EABF36]" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-[family-name:var(--font-milan)] leading-[0.9] tracking-tight mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[clamp(2.5rem,8vw,7rem)] text-[#F7F7F3]">
            The Billion-Dollar
          </span>
          <span className="block text-[clamp(2.5rem,8vw,7rem)] text-[#EABF36]">
            Playbook
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-[clamp(1rem,2.5vw,1.75rem)] font-[family-name:var(--font-monument)] uppercase tracking-[0.15em] text-[#F7F7F3]/70 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          The Business of{" "}
          <span className="text-[#EABF36]">F1</span> &{" "}
          <span className="text-[#EABF36]">IPL</span>
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-16 sm:w-24 h-px bg-[#EABF36]/40 mx-auto mb-6 sm:mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-playfair)] italic text-[#F7F7F3]/60 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          Move from the grandstand to the boardroom.
        </motion.p>

        {/* Racing number badge */}
        <motion.div
          className="mt-10 sm:mt-14 inline-flex items-center gap-2 border border-[#EABF36]/20 rounded-full px-4 py-2 sm:px-6 sm:py-2.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#EABF36] animate-pulse" />
          <span className="text-xs sm:text-sm tracking-wider text-[#F7F7F3]/50 font-[family-name:var(--font-satoshi)]">
            Limited Seats Available
          </span>
        </motion.div>
      </motion.div>

      

      {/* Corner accents */}
      <div className="hidden sm:block absolute top-8 left-8 w-12 h-12 border-t border-l border-[#EABF36]/20" />
      <div className="hidden sm:block absolute top-8 right-8 w-12 h-12 border-t border-r border-[#EABF36]/20" />
      <div className="hidden sm:block absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#EABF36]/20" />
      <div className="hidden sm:block absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#EABF36]/20" />
    </section>
  );
}
