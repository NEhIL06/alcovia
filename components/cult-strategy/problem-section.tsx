"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ACCENT = "#FF6B2B";

const problems = [
  {
    number: "01",
    question: "Why did you buy those sneakers?",
    insight:
      "Was it your choice — or was it a strategy? Every colourway, drop date, and influencer post was designed to hack your brain. Nike doesn't sell shoes. It sells identity, status, and the fear of missing out.",
    stat: "73%",
    statLabel: "of Gen Z purchases are driven by social status signals",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    question: "Why does 'Limited Edition' make you move faster?",
    insight:
      "Scarcity isn't an accident — it's engineered. Supreme drops 100 hoodies, not 10,000, because the queue IS the marketing. The brain treats scarcity as danger. Fear of loss always beats desire for gain.",
    stat: "60%",
    statLabel: "higher conversion rate when scarcity language is used",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    number: "03",
    question: "Why do fans defend brands like they're defending family?",
    insight:
      "Apple, Nike, and Zara aren't selling products. They're selling belonging to a tribe. When someone insults the brand, your brain processes it as a personal attack — because it merged brand identity with self-identity.",
    stat: "95%",
    statLabel: "of cult brand decisions happen below conscious awareness",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
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
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(255,107,43,0.02) 50%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Problem
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            You&apos;re not choosing.
            <br />
            <span style={{ color: ACCENT }}>You&apos;re being played.</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base lg:text-lg text-white/70 font-[family-name:var(--font-satoshi)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Billion-dollar brands spend millions studying what makes you buy,
            share, and obsess. Every drop date, every collab, every influencer
            tag — it&apos;s all a playbook. Here&apos;s what they don&apos;t
            want you to know.
          </motion.p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.number}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-4 sm:p-8 bg-[#F7F7F3]/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#FF6B2B]/20 hover:bg-[#F7F7F3]/[0.04]">
                {/* Top accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#FF6B2B]/40 transition-all duration-500" />

                {/* Number */}
                <span className="block text-[#FF6B2B]/20 text-4xl sm:text-6xl font-[family-name:var(--font-monument)] font-bold leading-none mb-2 group-hover:text-[#FF6B2B]/30 transition-colors duration-500">
                  {problem.number}
                </span>

                {/* Icon */}
                <div className="text-[#FF6B2B]/60 mb-2 group-hover:text-[#FF6B2B] transition-colors duration-500">
                  {problem.icon}
                </div>

                {/* Question */}
                <h3 className="text-base sm:text-lg font-[family-name:var(--font-playfair)] italic text-white mb-2 leading-snug">
                  &ldquo;{problem.question}&rdquo;
                </h3>

                {/* Insight */}
                <p className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)] leading-snug mb-3">
                  {problem.insight}
                </p>

                {/* Stat badge */}
                <div className="flex items-baseline gap-2 mt-auto">
                  <span
                    className="text-2xl sm:text-3xl font-[family-name:var(--font-monument)] font-bold"
                    style={{ color: ACCENT }}
                  >
                    {problem.stat}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/50 font-[family-name:var(--font-satoshi)] leading-tight">
                    {problem.statLabel}
                  </span>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF6B2B] to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
