"use client";

import { motion } from "framer-motion";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#FF6B2B";
const ACCENT_DIM = "rgba(255,107,43,";

const credentials = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "We Teach What Schools Won't",
    description:
      "Brand psychology, 'The Drop,' community engineering, and strategic hype-building sit at the intersection of psychology, business, and culture. Subjects the formal education system ignores entirely — because they work too well.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Industry Operators, Not Theorists",
    description:
      "Siddhant Narayan isn't a professor — he's the Country Head of Marketing at Nike. He builds the campaigns you obsess over, runs the drops you queue for, and architects the communities you belong to. This is the real playbook.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "High Stakes, Not Passive",
    description:
      "You won't sit and watch slides. You'll decode real Nike campaigns, build your own cult brand from scratch, and pitch it for feedback. The same way real investors and CMOs challenge thinking at the highest level.",
  },
];

const logos = [
  "Nike",
  "Supreme",
  "Jordan",
  "Red Bull",
  "Apple",
  "Rolex",
];

export default function AuthoritySection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <CursorParallaxGrid opacity={0.038} depth={13} spotlight />
        <div style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,43,0.03) 0%, transparent 70%)",
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
            Why Alcovia
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            From buying the hype{" "}
            <br className="hidden sm:block" />
            <span style={{ color: ACCENT }}>to building it</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Alcovia moves teenagers from being consumers of the world&apos;s biggest
            brands to strategists who understand how they are built. This is a deep
            dive into the psychology of &ldquo;The Drop,&rdquo; community building,
            and brand status.
          </motion.p>
        </div>

        {/* Credential cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mb-10 sm:mb-14">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-5 sm:p-6 bg-[#F7F7F3]/[0.02] overflow-hidden transition-all duration-500 hover:border-[#FF6B2B]/20 hover:bg-[#F7F7F3]/[0.04] hover:shadow-[0_8px_36px_rgba(255,107,43,0.08)]">
                {/* Left accent bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.4), transparent)`,
                  }}
                />

                {/* Icon circle */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:shadow-[0_0_16px_rgba(255,107,43,0.3)]"
                  style={{
                    background: `${ACCENT_DIM}0.1)`,
                    border: `1px solid ${ACCENT_DIM}0.2)`,
                    color: ACCENT,
                  }}
                >
                  {cred.icon}
                </div>

                <h3 className="text-sm sm:text-base font-[family-name:var(--font-monument)] uppercase tracking-wider text-white mb-2 leading-snug">
                  {cred.title}
                </h3>

                {/* Separator */}
                <div
                  className="h-px mb-3 w-6 group-hover:w-full transition-all duration-700"
                  style={{ background: `${ACCENT_DIM}0.2)` }}
                />

                <p className="text-xs sm:text-sm text-white/55 font-[family-name:var(--font-satoshi)] leading-relaxed">
                  {cred.description}
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

        {/* Logo strip */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Divider with label */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(247,247,243,0.06))" }}
            />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-[family-name:var(--font-satoshi)] whitespace-nowrap px-2">
              The brands we decode
            </p>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left, transparent, rgba(247,247,243,0.06))" }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-[10px] sm:text-xs border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-white/35 font-[family-name:var(--font-satoshi)] tracking-[0.12em] uppercase transition-all duration-300 hover:border-[#FF6B2B]/25 hover:text-white/60 hover:bg-[#FF6B2B]/[0.04]"
                style={{ borderColor: "rgba(247,247,243,0.07)" }}
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
