"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ACCENT = "#22C55E";
const ACCENT_DIM = "rgba(34,197,94,";

const credentials = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "We teach what school misses",
    description:
      "How to spot trends, talk to users, design a product, and tell its story. Skills you use whether you become a founder, designer, or scientist.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Learn from operators, not tutors",
    description:
      "Mentors come from Flipkart, Meesho, Noise, Red Bull, and top colleges. They bring the actual playbooks they use at work.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "You do the work, not just watch",
    description:
      "Not only slides. You will build, taste and test your snack idea. You will even pitch it in teams to real investors on the same day.",
  },
];

export default function AuthoritySection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden" style={{ background: "#F9F8F5" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${ACCENT_DIM}0.04) 0%, transparent 70%)`,
        }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Alcovia
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight text-[#111827] mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Why parents trust Alcovia{" "}
            <br className="hidden sm:block" />
            <span style={{ color: ACCENT }}>with their teenager&apos;s Saturdays</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-[#6b7280] font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Alcovia is an offline community in Gurgaon where students in grades 6-12 learn by working
            on real projects with real mentors.
          </motion.p>
        </div>

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
              <div className="relative h-full border border-gray-200 rounded-2xl p-5 sm:p-6 bg-white overflow-hidden transition-all duration-500 hover:border-[#22C55E]/30 hover:shadow-[0_8px_36px_rgba(34,197,94,0.08)]">
                <div
                  className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
                  }}
                />
                <div
                  className="absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.4), transparent)`,
                  }}
                />

                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:shadow-[0_0_16px_rgba(34,197,94,0.25)]"
                  style={{
                    background: `${ACCENT_DIM}0.1)`,
                    border: `1px solid ${ACCENT_DIM}0.2)`,
                    color: ACCENT,
                  }}
                >
                  {cred.icon}
                </div>

                <h3 className="text-sm sm:text-base font-[family-name:var(--font-monument)] uppercase tracking-wider text-[#111827] mb-2 leading-snug">
                  {cred.title}
                </h3>

                <div
                  className="h-px mb-3 w-6 group-hover:w-full transition-all duration-700"
                  style={{ background: `${ACCENT_DIM}0.25)` }}
                />

                <p className="text-xs sm:text-sm text-[#6b7280] font-[family-name:var(--font-satoshi)] leading-relaxed">
                  {cred.description}
                </p>

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

        {/* Sahil Puri Founder Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 bg-white overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
              style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }}
            />
            <div className="flex items-start gap-4 sm:gap-6">
              <div
                className="flex-shrink-0 text-4xl sm:text-6xl font-[family-name:var(--font-playfair)] leading-none mt-1"
                style={{ color: `${ACCENT}35` }}
              >
                &ldquo;
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm tracking-[0.25em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-4" style={{ color: ACCENT }}>
                  A Note From Alcovia Founder
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-[family-name:var(--font-playfair)] italic text-[#374151] leading-relaxed mb-5">
                  I started Alcovia because I kept meeting teenagers who were sharp, curious, and completely
                  unchallenged. School was teaching them to memorise. Nobody was teaching them to think.
                  This workshop puts a 13-year-old in the same room as food entrepreneurs, gives them a real
                  brief, and asks them to figure it out. Some kids freeze. Most surprise themselves. Either way,
                  they leave seeing the world differently. That shift – from passive to curious – is what I&apos;ve
                  watched happen in every Alcovia room. It&apos;s worth a Saturday afternoon.
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: `${ACCENT_DIM}0.3)` }}>
                    <Image src="/images/team/sahil.png" alt="Sahil Puri" fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <span className="block text-sm font-[family-name:var(--font-satoshi)] font-semibold text-[#111827]">
                      Sahil Puri
                    </span>
                    <span className="block text-[11px] text-[#9ca3af] font-[family-name:var(--font-satoshi)]">
                      Founder, Alcovia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
