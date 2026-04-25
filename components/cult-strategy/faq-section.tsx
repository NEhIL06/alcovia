"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#22C55E";

const faqs = [
  {
    question: "Who are the mentors?",
    answer:
      "Industry operators who have built food brands from scratch, raised funding, and put products on shelves. Mentor details will be announced shortly. These are not school teachers or motivational speakers. These are people who have done it.",
  },
  {
    question: "What do attendees need to bring?",
    answer:
      "Just their brains. Everything else, including materials, worksheets, and frameworks, is provided. Come ready to think, challenge, and build.",
  },
  {
    question: "Is food provided?",
    answer:
      "Yes. Lunch and all materials are fully included in the registration fee. You will not need to worry about anything outside the room.",
  },
  {
    question: "What age group is this for?",
    answer:
      "This workshop is designed for Grades 6 to 10 (ages approximately 11 to 16). The content and intensity are calibrated for curious, ambitious teenagers who want to understand how real food brands are built from scratch.",
  },
  {
    question: "Where exactly is it?",
    answer:
      "Horizon Center, Gurgaon. The venue is easily accessible and well-connected. Exact address and directions will be shared upon registration.",
  },
  {
    question: "What are the timings?",
    answer:
      "Friday, 2nd May, 11:00 AM to 3:00 PM (4 hours). Unlike a 1-hour lecture, this gives enough depth to actually research trends, interview customers, and pitch a real food brand.",
  },
  {
    question: "Why are seats limited?",
    answer:
      "Hands-on mentorship does not scale. We cap numbers to ensure every participant gets real feedback, direct mentor time, and a meaningful competitive environment. When we say limited, we mean it.",
  },
];

function FaqItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border border-[#F7F7F3]/[0.06] rounded-2xl overflow-hidden bg-[#F7F7F3]/[0.02] transition-colors duration-300 hover:border-[#22C55E]/15"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] font-medium text-white/90 leading-snug">
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: open ? `${ACCENT}40` : "rgba(247,247,243,0.1)",
            color: open ? ACCENT : "rgba(247,247,243,0.4)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div
                className="h-px mb-3"
                style={{
                  background: `linear-gradient(to right, ${ACCENT}20, transparent)`,
                }}
              />
              <p className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <CursorParallaxGrid opacity={0.038} depth={12} spotlight />
        <div style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.03) 0%, transparent 70%)",
        }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FAQ
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Everything you need{" "}
            <span style={{ color: ACCENT }}>to know</span>
          </motion.h2>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
