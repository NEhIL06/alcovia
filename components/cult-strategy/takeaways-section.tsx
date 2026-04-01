"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ACCENT = "#FF6B2B";

const takeaways = [
  {
    number: "01",
    title: "Psychology of Scarcity",
    subtitle: "Why 'Limited Edition' works every time",
    description:
      "Understand the neurological mechanism that makes scarcity irresistible. Learn how brands like Supreme, Jordan, and Rolex engineer desire by restricting supply — and how you can apply the same principle to any product or idea.",
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
        <path d="M12 6v.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Community Architecture",
    subtitle: "How to turn followers into a cult following",
    description:
      "Discover how the world's most powerful brands build belonging — not just customers. From Apple's 'Think Different' to Nike's 'Just Do It', learn how to design tribal identity that makes people proudly wear your logo, defend your brand, and recruit for you.",
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
  {
    number: "03",
    title: "Strategic Execution",
    subtitle: "From a cool idea to a high-demand product",
    description:
      "Move beyond ideation into action. Learn the exact sequence — positioning, launch strategy, pricing psychology, and social proof stacking — that transforms a concept into something people actually queue for. Leave with a real framework you can apply immediately.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
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
            What You&apos;ll Master
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Skills that actually{" "}
            <span style={{ color: ACCENT }}>move the needle</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base lg:text-lg text-white/70 font-[family-name:var(--font-satoshi)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Not theory. Not slides. Real frameworks from the brands that dominate
            culture — handed to you in one day.
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
              <div className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-4 sm:p-8 bg-[#F7F7F3]/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#FF6B2B]/20 hover:bg-[#F7F7F3]/[0.04]">
                {/* Top accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#FF6B2B]/40 transition-all duration-500" />

                {/* Number */}
                <span className="block text-[#FF6B2B]/20 text-4xl sm:text-6xl font-[family-name:var(--font-monument)] font-bold leading-none mb-2 group-hover:text-[#FF6B2B]/30 transition-colors duration-500">
                  {item.number}
                </span>

                {/* Icon */}
                <div className="text-[#FF6B2B]/60 mb-3 group-hover:text-[#FF6B2B] transition-colors duration-500">
                  {item.icon}
                </div>

                {/* Subtitle */}
                <span
                  className="block text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)] mb-2"
                  style={{ color: `rgba(255,107,43,0.6)` }}
                >
                  {item.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-[family-name:var(--font-milan)] text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)] leading-snug">
                  {item.description}
                </p>

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
