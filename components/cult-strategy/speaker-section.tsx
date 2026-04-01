"use client";

import { motion } from "framer-motion";

const ACCENT = "#FF6B2B";

export default function SpeakerSection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,43,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
            Meet Your Speaker
          </span>
        </motion.div>

        {/* Speaker card */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image placeholder */}
          <div className="relative flex-shrink-0">
            <div className="relative w-48 h-60 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              {/* Outer border */}
              <div
                className="absolute inset-0 border rounded-2xl"
                style={{ borderColor: `rgba(255,107,43,0.15)` }}
              />

              {/* Placeholder silhouette */}
              <div className="absolute inset-3 rounded-xl overflow-hidden bg-[#F7F7F3]/[0.03] flex flex-col items-center justify-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  style={{ color: `rgba(255,107,43,0.2)` }}
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span
                  className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)] text-center px-4"
                  style={{ color: `rgba(255,107,43,0.35)` }}
                >
                  Speaker Reveal Soon
                </span>
              </div>

              {/* Corner accents */}
              <div
                className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 rounded-tl-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 rounded-tr-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 rounded-bl-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 rounded-br-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0b0d0c] border border-[#FF6B2B]/30 rounded-full px-4 py-1.5 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: ACCENT }}
              />
              <span
                className="text-[10px] sm:text-xs font-[family-name:var(--font-satoshi)] font-medium tracking-wider uppercase whitespace-nowrap"
                style={{ color: ACCENT }}
              >
                Industry Expert
              </span>
            </motion.div>
          </div>

          {/* Speaker info */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              className="space-y-3 sm:space-y-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Speaker Header */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-white mb-2">
                  Speaker Coming Soon
                </h3>
                <p
                  className="text-base sm:text-lg font-[family-name:var(--font-satoshi)] font-medium mb-1"
                  style={{ color: ACCENT }}
                >
                  High-Profile Industry Mentor
                </p>
                <p className="text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
                  Details to be announced closer to the event
                </p>
              </div>

              {/* Divider */}
              <div
                className="w-12 h-px mx-auto lg:mx-0"
                style={{ background: `rgba(255,107,43,0.3)` }}
              />

              {/* Bio placeholder */}
              <div className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-snug max-w-lg mx-auto lg:mx-0 space-y-2 text-left">
                <p>
                  We&apos;re bringing in a{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    world-class brand strategist
                  </span>{" "}
                  with a proven track record of building cult-status brands from the ground up.
                </p>
                <p className="text-white/40">
                  This isn&apos;t a school teacher. This is someone who has been in the rooms
                  where these strategies are built — and they&apos;re bringing the playbook to you.
                </p>
              </div>

              {/* Placeholder tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4">
                {[
                  "Brand Strategy",
                  "Marketing",
                  "Consumer Psychology",
                  "Industry Operator",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-[#F7F7F3]/10 rounded-full px-3 py-1.5 text-white/40 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
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
