"use client";

import { motion } from "framer-motion";

const details = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "Time",
    value: "11:00 AM — 4:00 PM",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M3 7h18M3 12h18M3 17h18" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
        <circle cx="7" cy="12" r="1" fill="currentColor" />
        <circle cx="7" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    label: "Format",
    value: "Immersive Workshop",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label: "For",
    value: "Teenagers & Young Minds",
  },
];

export default function EventDetailsSection() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(234,191,54,0.015) 30%, rgba(234,191,54,0.015) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#EABF36] text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]">
            Event Details
          </span>
        </motion.div>

        {/* Pit-pass card */}
        <motion.div
          className="relative mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative border border-[#EABF36]/15 rounded-3xl overflow-hidden bg-gradient-to-b from-[#F7F7F3]/[0.03] to-transparent">
            {/* Top stripe */}
            <div className="h-1 bg-gradient-to-r from-[#EABF36]/0 via-[#EABF36] to-[#EABF36]/0" />

            <div className="p-6 sm:p-10 lg:p-12">
              {/* Card header */}
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div>
                  <h3 className="text-lg sm:text-xl font-[family-name:var(--font-monument)] uppercase tracking-wider text-[#F7F7F3]">
                    Pit Pass
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F7F3]/40 font-[family-name:var(--font-satoshi)] mt-1">
                    Your entry to the boardroom
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[#EABF36] text-2xl sm:text-3xl font-[family-name:var(--font-monument)] font-bold">
                    VIP
                  </span>
                </div>
              </div>

              {/* Dashed divider */}
              <div className="border-t border-dashed border-[#F7F7F3]/10 mb-8 sm:mb-10" />

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
                {details.map((detail, i) => (
                  <motion.div
                    key={detail.label}
                    className="flex flex-col items-center text-center sm:items-start sm:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div className="text-[#EABF36]/60 mb-2">{detail.icon}</div>
                    <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#F7F7F3]/30 font-[family-name:var(--font-satoshi)] mb-1">
                      {detail.label}
                    </span>
                    <span className="text-sm sm:text-base text-[#F7F7F3] font-[family-name:var(--font-satoshi)] font-medium">
                      {detail.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Dashed divider */}
              <div className="border-t border-dashed border-[#F7F7F3]/10 mb-8 sm:mb-10" />

              {/* Lunch badge + Contact */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Lunch badge */}
                <motion.div
                  className="inline-flex items-center gap-3 bg-[#EABF36]/10 border border-[#EABF36]/20 rounded-full px-5 py-2.5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#EABF36" strokeWidth={1.5} className="w-4 h-4">
                    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                  </svg>
                  <span className="text-xs sm:text-sm text-[#EABF36] font-[family-name:var(--font-satoshi)] font-medium tracking-wide">
                    Lunch Included
                  </span>
                </motion.div>

                {/* Contact info */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <a
                    href="mailto:info@alcovia.life"
                    className="flex items-center gap-2 text-xs sm:text-sm text-[#F7F7F3]/50 hover:text-[#EABF36] transition-colors font-[family-name:var(--font-satoshi)]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    info@alcovia.life
                  </a>
                  <a
                    href="tel:8085901818"
                    className="flex items-center gap-2 text-xs sm:text-sm text-[#F7F7F3]/50 hover:text-[#EABF36] transition-colors font-[family-name:var(--font-satoshi)]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    8085901818
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Bottom stripe */}
            <div className="h-px bg-gradient-to-r from-[#EABF36]/0 via-[#EABF36]/20 to-[#EABF36]/0" />
          </div>

          {/* Corner notches (pit-pass style) */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#EABF36]/30 rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#EABF36]/30 rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#EABF36]/30 rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#EABF36]/30 rounded-br-lg" />
        </motion.div>
      </div>
    </section>
  );
}
