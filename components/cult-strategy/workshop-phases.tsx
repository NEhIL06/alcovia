"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const ACCENT = "#FF6B2B";

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
  },
];

export default function WorkshopPhases() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,43,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
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

        {/* Phase cards — stacked */}
        <div className="space-y-3 sm:space-y-6">
          {phases.map((item, i) => (
            <motion.div
              key={item.number}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative border border-[#F7F7F3]/[0.06] rounded-2xl overflow-hidden bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#FF6B2B]/20 hover:bg-[#F7F7F3]/[0.04]">
                {/* Top accent line */}
                <div
                  className="h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${ACCENT}40, transparent)`,
                  }}
                />

                <div className="p-4 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-12">
                  {/* Left: number + stat */}
                  <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6 lg:w-36">
                    <span className="text-[#FF6B2B]/25 text-4xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-monument)] font-bold leading-none group-hover:text-[#FF6B2B]/35 transition-colors duration-500">
                      {item.number}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-xl sm:text-2xl font-[family-name:var(--font-monument)] font-bold"
                        style={{ color: ACCENT }}
                      >
                        {item.stat}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/45 font-[family-name:var(--font-satoshi)] leading-tight max-w-[90px]">
                        {item.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="flex-1">
                    <div className="mb-1">
                      <span
                        className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)]"
                        style={{ color: `${ACCENT}99` }}
                      >
                        {item.phase} · {item.subtitle}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-[family-name:var(--font-milan)] text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-snug max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
