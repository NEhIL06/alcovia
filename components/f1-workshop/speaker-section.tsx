"use client";

import { motion } from "framer-motion";

export default function SpeakerSection() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(234,191,54,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#EABF36] text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]">
            Meet Your Speaker
          </span>
        </motion.div>

        {/* Speaker card */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-10 sm:gap-14 lg:gap-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image placeholder */}
          <div className="relative flex-shrink-0">
            {/* Frame */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              {/* Outer border */}
              <div className="absolute inset-0 border border-[#EABF36]/15 rounded-2xl" />

              {/* Inner placeholder */}
              <div className="absolute inset-3 rounded-xl bg-[#F7F7F3]/[0.03] border border-[#F7F7F3]/[0.06] flex flex-col items-center justify-center gap-4 overflow-hidden">
                {/* Placeholder icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  className="w-16 h-16 sm:w-20 sm:h-20 text-[#F7F7F3]/10"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-xs text-[#F7F7F3]/20 font-[family-name:var(--font-satoshi)] tracking-wider uppercase">
                  Speaker Photo
                </span>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-[#EABF36]/40 rounded-tl-md" />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-[#EABF36]/40 rounded-tr-md" />
              <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-[#EABF36]/40 rounded-bl-md" />
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-[#EABF36]/40 rounded-br-md" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#08261e] border border-[#EABF36]/30 rounded-full px-4 py-1.5 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#EABF36]" />
              <span className="text-[10px] sm:text-xs text-[#EABF36] font-[family-name:var(--font-satoshi)] font-medium tracking-wider uppercase whitespace-nowrap">
                RedBull Racing
              </span>
            </motion.div>
          </div>

          {/* Speaker info */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Name placeholder */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-[#F7F7F3] mb-2">
                  {/* Replace with speaker name */}
                  Speaker Name
                </h3>
                <p className="text-sm sm:text-base text-[#EABF36]/80 font-[family-name:var(--font-satoshi)]">
                  {/* Replace with speaker title */}
                  Title / Designation
                </p>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-[#EABF36]/30 mx-auto lg:mx-0" />

              {/* Bio placeholder */}
              <p className="text-sm sm:text-base text-[#F7F7F3]/50 font-[family-name:var(--font-satoshi)] leading-relaxed max-w-lg mx-auto lg:mx-0">
                {/* Replace with speaker bio */}
                Speaker bio goes here. A brief paragraph about the speaker&apos;s background,
                experience, and what makes them uniquely qualified to lead this workshop
                on the business of F1 and IPL.
              </p>

              {/* Credential tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                {["RedBull", "Motorsport", "Business Strategy"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-[#F7F7F3]/10 rounded-full px-3 py-1.5 text-[#F7F7F3]/40 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
