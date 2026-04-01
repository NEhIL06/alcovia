"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#FF6B2B";
const ACCENT_DIM = "rgba(255,107,43,";

const problems = [
  {
    number: "01",
    question: "Why did you buy those sneakers?",
    insight: "Was it your choice — or was it a strategy? Every colourway, drop date, and influencer post was designed to hack your brain. Nike doesn't sell shoes. It sells identity, status, and the fear of missing out.",
    stat: "73%",
    statLabel: "of Gen Z purchases are driven by social status signals",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    question: "Why does 'Limited Edition' make you move faster?",
    insight: "Scarcity isn't an accident — it's engineered. Supreme drops 100 hoodies, not 10,000, because the queue IS the marketing. The brain treats scarcity as danger. Fear of loss always beats desire for gain.",
    stat: "60%",
    statLabel: "higher conversion when scarcity language is used",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    number: "03",
    question: "Why do fans defend brands like family?",
    insight: "Apple, Nike, and Zara aren't selling products. They're selling belonging to a tribe. When someone insults the brand, your brain processes it as a personal attack — because it merged brand identity with self-identity.",
    stat: "95%",
    statLabel: "of cult brand decisions happen below conscious awareness",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <CursorParallaxGrid opacity={0.04} depth={14} spotlight />
        <div style={{ background: `linear-gradient(180deg, transparent 0%, ${ACCENT_DIM}0.04) 40%, transparent 100%)` }} className="absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.15), transparent)` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.span
            className="inline-block text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-5"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            The Problem
          </motion.span>

          <motion.h2
            className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-[0.95] tracking-tight mb-5"
            initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            You&apos;re not choosing.
            <br />
            <span style={{ color: ACCENT, textShadow: `0 0 40px ${ACCENT_DIM}0.3)` }}>
              You&apos;re being played.
            </span>
          </motion.h2>

          {/* Statement quote */}
          <motion.p
            className="text-base sm:text-lg font-[family-name:var(--font-playfair)] italic text-white/55 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}
          >
            &ldquo;Billion-dollar brands spend millions studying what makes you buy,
            share, and obsess. Every drop date, every collab, every influencer
            tag — it&apos;s all a playbook.&rdquo;
          </motion.p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.number}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  border: "1px solid rgba(247,247,243,0.07)",
                  background: "linear-gradient(135deg, rgba(247,247,243,0.04) 0%, rgba(247,247,243,0.01) 100%)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
                }}
              >
                {/* Left accent bar */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-500"
                  style={{ background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`, opacity: 0.25 }}
                />
                <div className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                  style={{ background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`, opacity: 0.9 }}
                />

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `0 8px 40px ${ACCENT_DIM}0.15), inset 0 1px 0 ${ACCENT_DIM}0.1)` }}
                />

                <div className="p-6 sm:p-8">
                  {/* Top row: number + icon circle */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-[4.5rem] sm:text-[6rem] font-[family-name:var(--font-monument)] font-black leading-none tracking-tighter transition-colors duration-500"
                      style={{ color: `${ACCENT_DIM}0.12)`, lineHeight: "0.85" }}
                    >
                      {problem.number}
                    </span>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{ background: `${ACCENT_DIM}0.1)`, border: `1px solid ${ACCENT_DIM}0.2)`, color: `${ACCENT_DIM}0.7)` }}
                    >
                      <div className="group-hover:text-[#FF6B2B] transition-colors duration-300">
                        {problem.icon}
                      </div>
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-base sm:text-lg font-[family-name:var(--font-playfair)] italic text-white/90 mb-3 leading-snug">
                    &ldquo;{problem.question}&rdquo;
                  </h3>

                  {/* Insight */}
                  <p className="text-xs sm:text-sm text-white/55 font-[family-name:var(--font-satoshi)] leading-relaxed mb-5">
                    {problem.insight}
                  </p>

                  {/* Stat — bottom */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <span className="text-2xl sm:text-3xl font-[family-name:var(--font-monument)] font-bold leading-none transition-all duration-300"
                      style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT_DIM}0.3)` }}>
                      {problem.stat}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/45 font-[family-name:var(--font-satoshi)] leading-snug">
                      {problem.statLabel}
                    </span>
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
