"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#FF6B2B";
const ACCENT_DIM = "rgba(255,107,43,";

const phases = [
  {
    number: "01",
    phase: "Phase 1",
    title: "The Deconstruction",
    subtitle: "Pull back the curtain",
    description:
      "We expose the hidden machinery behind the world's most obsessive brands. Neuromarketing, scarcity engineering, anchoring, social proof, and the tribal psychology that makes people queue overnight for a sneaker. You'll never look at a logo the same way again.",
    stat: "3+",
    statLabel: "psychological triggers decoded",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    phase: "Phase 2",
    title: "The Lab",
    subtitle: "Stop watching. Start building.",
    description:
      "Teens aren't just listening — they're building. Working in teams, you'll design your own Cult Brand from scratch using the real-world triggers you just learned. Scarcity drops, community architecture, identity alignment, influencer hooks — all of it goes into your brand strategy.",
    stat: "100%",
    statLabel: "hands-on, team-based learning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    number: "03",
    phase: "Phase 3",
    title: "The Pitch",
    subtitle: "Prove it to the room",
    description:
      "The stakes are real. Each team presents their hype-driven brand strategy to a panel of industry mentors. They'll push back, drill down, and challenge your thinking — the same way real investors and CMOs would. Walk out with feedback from people who actually build brands for a living.",
    stat: "₹3,999",
    statLabel: "per seat · lunch included",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

export default function WorkshopPhases() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <CursorParallaxGrid opacity={0.04} depth={16} spotlight />
        <div style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,43,0.04) 0%, transparent 70%)",
        }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Workshop
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What happens{" "}
            <span style={{ color: ACCENT }}>inside</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Three phases. One day. A complete transformation in how you see
            brands — and how you build them.
          </motion.p>
        </div>

        {/* Phase cards — stacked with timeline connector */}
        <div className="relative">
          {/* Vertical timeline line — desktop only */}
          <div
            className="hidden lg:block absolute left-[2.25rem] top-10 bottom-10 w-px"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${ACCENT_DIM}0.2) 15%, ${ACCENT_DIM}0.2) 85%, transparent 100%)`,
            }}
          />

          <div className="space-y-4 sm:space-y-6">
            {phases.map((item, i) => (
              <motion.div
                key={item.number}
                className="group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex gap-4 lg:gap-6 items-start">
                  {/* Timeline node — desktop */}
                  <div className="hidden lg:flex flex-col items-center flex-shrink-0 pt-6">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 group-hover:shadow-[0_0_16px_rgba(255,107,43,0.4)] z-10"
                      style={{
                        borderColor: `${ACCENT_DIM}0.35)`,
                        background: `${ACCENT_DIM}0.08)`,
                        color: ACCENT,
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="relative flex-1 border border-[#F7F7F3]/[0.06] rounded-2xl overflow-hidden bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#FF6B2B]/20 hover:bg-[#F7F7F3]/[0.04] hover:shadow-[0_8px_40px_rgba(255,107,43,0.08)]">
                    {/* Left accent bar */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                      style={{
                        background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
                      }}
                    />

                    {/* Top accent line */}
                    <div
                      className="h-px"
                      style={{
                        background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.3), transparent)`,
                      }}
                    />

                    <div className="p-4 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12">
                      {/* Left: phase badge + stat */}
                      <div className="flex-shrink-0 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-5">
                        {/* Phase badge */}
                        <div
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 border"
                          style={{
                            borderColor: `${ACCENT_DIM}0.25)`,
                            background: `${ACCENT_DIM}0.06)`,
                          }}
                        >
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
                            style={{ color: ACCENT }}
                          >
                            {item.phase}
                          </span>
                        </div>

                        {/* Stat */}
                        <div className="flex flex-col gap-0.5 lg:pl-1">
                          <span
                            className="text-xl sm:text-2xl font-[family-name:var(--font-monument)] font-bold leading-none"
                            style={{ color: ACCENT }}
                          >
                            {item.stat}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-white/40 font-[family-name:var(--font-satoshi)] leading-tight max-w-[90px]">
                            {item.statLabel}
                          </span>
                        </div>
                      </div>

                      {/* Divider — vertical on desktop */}
                      <div
                        className="hidden lg:block w-px self-stretch"
                        style={{
                          background: `linear-gradient(to bottom, transparent, ${ACCENT_DIM}0.15), transparent)`,
                        }}
                      />

                      {/* Right: content */}
                      <div className="flex-1">
                        {/* Decorative number */}
                        <div className="flex items-baseline gap-3 mb-1.5">
                          <span
                            className="font-[family-name:var(--font-monument)] font-bold leading-none transition-colors duration-500 group-hover:opacity-50"
                            style={{
                              fontSize: "clamp(2.5rem,5vw,4rem)",
                              color: `${ACCENT_DIM}0.12)`,
                            }}
                          >
                            {item.number}
                          </span>
                          <span
                            className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)]"
                            style={{ color: `${ACCENT_DIM}0.7)` }}
                          >
                            {item.subtitle}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-[family-name:var(--font-milan)] text-white mb-3 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/55 font-[family-name:var(--font-satoshi)] leading-snug max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
