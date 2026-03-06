"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Venture Finance",
    description: "Managing a multi-million dollar franchise P&L.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6 sm:w-8 sm:h-8"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "B2B Sales",
    description:
      "Pitching and closing high-ticket corporate sponsorships.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6 sm:w-8 sm:h-8"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Resource Optimization",
    description:
      "Aligning human capital (players) with brand deliverables.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6 sm:w-8 sm:h-8"
      >
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Executive Composure",
    description:
      "Navigating live, high-pressure auction dynamics.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6 sm:w-8 sm:h-8"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export default function WorkshopCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(234,191,54,0.02) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <motion.span
            className="inline-block text-[#EABF36] text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What You&apos;ll Master
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Take control of a massive
            <br />
            <span className="text-[#EABF36]">sports franchise</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base lg:text-lg text-[#F7F7F3]/60 font-[family-name:var(--font-satoshi)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            In this immersive, high-stakes workshop, teenagers will learn the
            absolute fundamentals of how billion-dollar sports businesses work
            &mdash; from{" "}
            <span className="text-[#EABF36] font-medium">
              someone in RedBull itself!
            </span>
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-6 sm:p-8 bg-[#F7F7F3]/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#EABF36]/20 hover:bg-[#F7F7F3]/[0.04]">
                {/* Carbon fiber texture hint */}
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 2px,
                      #F7F7F3 2px,
                      #F7F7F3 4px
                    )`,
                  }}
                />

                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#EABF36]/0 to-transparent group-hover:via-[#EABF36]/40 transition-all duration-500" />

                {/* Number */}
                <span className="block text-[#EABF36]/20 text-5xl sm:text-6xl font-[family-name:var(--font-monument)] font-bold leading-none mb-4 sm:mb-6 group-hover:text-[#EABF36]/30 transition-colors duration-500">
                  {pillar.number}
                </span>

                {/* Icon */}
                <div className="text-[#EABF36]/60 mb-3 sm:mb-4 group-hover:text-[#EABF36] transition-colors duration-500">
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-[family-name:var(--font-monument)] uppercase tracking-wider text-[#F7F7F3] mb-2 sm:mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#F7F7F3]/50 font-[family-name:var(--font-satoshi)] leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bottom racing stripe */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#EABF36] to-[#EABF36]/0 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
