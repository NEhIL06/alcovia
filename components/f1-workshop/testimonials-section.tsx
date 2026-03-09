"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aanya Maniar",
    quote:
      "I walked in not knowing what consulting even was. Walking out, I had a clear picture of what consultants actually do — and more importantly, whether it's something I'd genuinely want. The ex-MD from Accenture broke it down in a way no textbook ever could.",
    workshop: "Strategy of Success",
  },
  {
    name: "Aryaana Jindal",
    quote:
      "Strategy of Success made me rethink my career assumptions completely. The way our speaker explained the consulting lifestyle, the problem-solving frameworks, and the client dynamic gave me real clarity on whether this path actually aligns with who I am.",
    workshop: "Strategy of Success",
  },
  {
    name: "Aksh Arora",
    quote:
      "I came in curious but skeptical. The session gave me an insider's view of what it actually takes to thrive in consulting — not the polished version, the honest one. That honesty is what made it so valuable.",
    workshop: "Strategy of Success",
  },
  {
    name: "Ansh",
    quote:
      "Having someone who was actually an MD at Accenture tell you what consulting is like from the inside — that's something you just can't get from Google. I left knowing exactly where I stand on this career path.",
    workshop: "Strategy of Success",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(234,191,54,0.02) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            className="inline-block text-[#EABF36] text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            From Past Alcovia Workshops
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What students say
            <br />
            <span className="text-[#EABF36]">about our workshops</span>
          </motion.h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-full border border-[#F7F7F3]/[0.07] rounded-2xl p-6 bg-[#F7F7F3]/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#EABF36]/20 hover:bg-[#F7F7F3]/[0.04] flex flex-col">
                {/* Top accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#EABF36]/0 to-transparent group-hover:via-[#EABF36]/30 transition-all duration-500" />

                {/* Quote mark */}
                <span className="text-[#EABF36]/25 text-4xl font-[family-name:var(--font-playfair)] leading-none mb-3 block group-hover:text-[#EABF36]/40 transition-colors duration-500">
                  &ldquo;
                </span>

                {/* Quote */}
                <p className="text-sm text-[#F7F7F3]/60 font-[family-name:var(--font-satoshi)] leading-relaxed flex-1">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="mt-5 pt-4 border-t border-[#F7F7F3]/[0.06]">
                  <p className="text-sm font-[family-name:var(--font-monument)] uppercase tracking-wider text-[#F7F7F3]">
                    {t.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#EABF36]/60 font-[family-name:var(--font-satoshi)] tracking-wider uppercase mt-0.5">
                    {t.workshop}
                  </p>
                </div>

                {/* Bottom racing stripe */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#EABF36] to-[#EABF36]/0 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workshop label */}
        <motion.p
          className="text-center text-xs text-[#F7F7F3]/25 font-[family-name:var(--font-satoshi)] tracking-wider uppercase mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Strategy of Success — Consulting workshop led by Nikunj Dang, Ex-MD of Accenture, CEO & Founder of Yognum
        </motion.p>
      </div>
    </section>
  );
}
