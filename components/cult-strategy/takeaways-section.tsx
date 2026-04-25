"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#22C55E";
const ACCENT_DIM = "rgba(34,197,94,";

const takeaways = [
  {
    number: "01",
    title: "Trend Analysis Frameworks",
    subtitle: "Read the market before it moves",
    description:
      "Learn how to identify emerging food trends using real consumer data and market signals. Understand why certain ingredients go from obscure to mainstream and how the best food entrepreneurs spot opportunities months before the competition.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
        <path d="M12 6v.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Customer Interview Playbook",
    subtitle: "Build what people actually want",
    description:
      "Discover structured techniques for interviewing real customers and extracting honest feedback. Learn why the best products are built from conversations, not assumptions, and how to validate a food concept before spending a single rupee on production.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Investor-Ready Pitching",
    subtitle: "From concept to funded brand",
    description:
      "Move beyond theory into execution. Learn the exact sequence for pitching a food brand: market sizing, pricing strategy, packaging, distribution, and storytelling with data. Leave with a real framework you can use to pitch any product idea.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export default function TakeawaysSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <CursorParallaxGrid opacity={0.038} depth={14} spotlight />
        <div style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.025) 50%, transparent 100%)`,
        }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What You&apos;ll Master
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The Superfood Playbook,{" "}
            <span style={{ color: ACCENT }}>decoded</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base lg:text-lg text-white/60 font-[family-name:var(--font-satoshi)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Not theory. Not slides. Real frameworks used by food entrepreneurs
            who turned simple ingredients into brands worth crores.
          </motion.p>
        </div>

        {/* Takeaway cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
          {takeaways.map((item, i) => (
            <motion.div
              key={item.number}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-5 sm:p-8 overflow-hidden transition-all duration-500 hover:border-[#22C55E]/20 hover:shadow-[0_8px_40px_rgba(34,197,94,0.1)]"
                style={{
                  background: "rgba(247,247,243,0.02)",
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
                  }}
                />

                {/* Top accent — always slightly visible */}
                <div
                  className="absolute top-0 left-6 right-6 h-px transition-opacity duration-500 group-hover:opacity-100 opacity-30"
                  style={{
                    background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.5), transparent)`,
                  }}
                />

                {/* Decorative large number */}
                <span
                  className="absolute top-4 right-4 font-[family-name:var(--font-monument)] font-bold leading-none select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    fontSize: "clamp(3.5rem, 6vw, 5rem)",
                    color: `${ACCENT_DIM}0.08)`,
                  }}
                >
                  {item.number}
                </span>

                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:shadow-[0_0_16px_rgba(34,197,94,0.3)]"
                  style={{
                    background: `${ACCENT_DIM}0.1)`,
                    border: `1px solid ${ACCENT_DIM}0.2)`,
                    color: ACCENT,
                  }}
                >
                  {item.icon}
                </div>

                {/* Subtitle */}
                <span
                  className="block text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)] mb-2"
                  style={{ color: `${ACCENT_DIM}0.65)` }}
                >
                  {item.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-[family-name:var(--font-milan)] text-white mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Separator */}
                <div
                  className="h-px mb-3 w-8 group-hover:w-full transition-all duration-700"
                  style={{ background: `${ACCENT_DIM}0.2)` }}
                />

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/55 font-[family-name:var(--font-satoshi)] leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700"
                  style={{
                    background: `linear-gradient(to right, ${ACCENT}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
