"use client";

import { motion } from "framer-motion";

const gains = [
  {
    label: "Franchise Mindset",
    detail: "Think like a sports CEO — manage P&L, allocate budgets, and make high-stakes decisions under pressure.",
  },
  {
    label: "Sponsorship Playbook",
    detail: "Build and pitch real corporate sponsorship decks. Land deals the way billion-dollar teams do.",
  },
  {
    label: "Live Auction Experience",
    detail: "Bid, negotiate, and close in a live simulated auction — pressure, strategy, composure.",
  },
  {
    label: "Industry Insider Access",
    detail: "Direct insight from someone inside RedBull. The kind of perspective that doesn't come from textbooks.",
  },
];

export default function GainsSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(234,191,54,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            className="inline-block text-[#EABF36] text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What You Take Away
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Leave with more than
            <br />
            <span className="text-[#EABF36]">just knowledge</span>
          </motion.h2>
        </div>

        {/* Gains list */}
        <div className="space-y-3 sm:space-y-4">
          {gains.map((gain, i) => (
            <motion.div
              key={gain.label}
              className="group flex items-start gap-4 sm:gap-6 border border-[#F7F7F3]/[0.06] rounded-2xl p-5 sm:p-6 bg-[#F7F7F3]/[0.02] hover:border-[#EABF36]/20 hover:bg-[#F7F7F3]/[0.04] transition-all duration-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number */}
              <span className="text-[#EABF36]/20 text-2xl sm:text-3xl font-[family-name:var(--font-monument)] font-bold leading-none mt-0.5 group-hover:text-[#EABF36]/40 transition-colors duration-500 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-[family-name:var(--font-monument)] uppercase tracking-wider text-[#F7F7F3] mb-1.5">
                  {gain.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F7F3]/50 font-[family-name:var(--font-satoshi)] leading-relaxed">
                  {gain.detail}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="text-[#EABF36]/0 group-hover:text-[#EABF36]/60 transition-colors duration-500 mt-1 shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
