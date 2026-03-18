"use client";

import { motion } from "framer-motion";

const ACCENT = "#C77DFF";

export default function SpeakerSection() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(199,125,255,0.03) 0%, transparent 70%)",
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
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
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
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              {/* Outer border */}
              <div
                className="absolute inset-0 border rounded-2xl"
                style={{ borderColor: `rgba(199,125,255,0.15)` }}
              />

              {/* Inner placeholder */}
              <div className="absolute inset-3 rounded-xl bg-[#F7F7F3]/[0.03] border border-[#F7F7F3]/[0.06] flex flex-col items-center justify-center gap-4 overflow-hidden">
                {/* Brain icon placeholder */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={0.8}
                  className="w-20 h-20 opacity-20"
                >
                  <path d="M9.5 2a3.5 3.5 0 00-3.29 2.3A3.5 3.5 0 004 7.5a3.5 3.5 0 00.68 2.07A3.5 3.5 0 003 13a3.5 3.5 0 002.22 3.26A3.5 3.5 0 005 17.5a3.5 3.5 0 003.5 3.5c.87 0 1.67-.32 2.28-.85A3.48 3.48 0 0012 21" />
                  <path d="M14.5 2a3.5 3.5 0 013.29 2.3A3.5 3.5 0 0120 7.5a3.5 3.5 0 01-.68 2.07A3.5 3.5 0 0121 13a3.5 3.5 0 01-2.22 3.26A3.5 3.5 0 0119 17.5a3.5 3.5 0 01-3.5 3.5c-.87 0-1.67-.32-2.28-.85A3.48 3.48 0 0112 21" />
                  <path d="M12 2v19" />
                </svg>
                <span className="text-xs text-white/30 font-[family-name:var(--font-satoshi)] tracking-[0.2em] uppercase">
                  Revealing Soon
                </span>
              </div>

              {/* Corner accents */}
              <div
                className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 rounded-tl-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 rounded-tr-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 rounded-bl-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 rounded-br-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#08261e] border border-[#C77DFF]/30 rounded-full px-4 py-1.5 flex items-center gap-2"
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
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Speaker Header */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-white mb-2">
                  Speaker Reveal
                </h3>
                <p
                  className="text-sm sm:text-base font-[family-name:var(--font-satoshi)]"
                  style={{ color: `rgba(199,125,255,0.8)` }}
                >
                  Coming Soon
                </p>
              </div>

              {/* Divider */}
              <div
                className="w-12 h-px mx-auto lg:mx-0"
                style={{ background: `rgba(199,125,255,0.3)` }}
              />

              {/* Teaser content */}
              <div className="text-sm sm:text-base text-white/80 font-[family-name:var(--font-satoshi)] leading-relaxed max-w-lg mx-auto lg:mx-0 space-y-4 text-left">
                <p>
                  We&apos;re bringing in someone who has been at the forefront of
                  how brands engineer consumer behaviour. Someone who
                  understands the invisible science behind every purchase you
                  make.
                </p>
                <p className="text-white/60">
                  Our speakers don&apos;t teach from textbooks. They come from
                  the war rooms of the brands you interact with every day.
                  Previous workshops have featured leaders from{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    Red Bull
                  </span>
                  ,{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    Disney+ Hotstar
                  </span>
                  , and{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    Star TV
                  </span>
                  .
                </p>
              </div>

              {/* Teaser tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-8">
                {[
                  "Neuromarketing",
                  "Brand Strategy",
                  "Consumer Psychology",
                  "Industry Leader",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-[#F7F7F3]/10 rounded-full px-3 py-1.5 text-white/50 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
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
