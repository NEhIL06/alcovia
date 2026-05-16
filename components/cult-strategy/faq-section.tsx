"use client";

import { useState } from "react";

const ACCENT = "#34D399";

const faqs = [
  {
    question: "Who are the mentors?",
    answer:
      "Industry operators who have built biotech startups, researched cellular rejuvenation, and raised funding. Mentor details will be announced shortly. These are not school teachers or motivational speakers. These are people who have done it.",
  },
  {
    question: "What do attendees need to bring?",
    answer:
      "Just their sharpest ideas, an entrepreneurial mindset, and a laptop or notebook to build their pitch decks. We provide all the startup frameworks, materials, and guidance needed for the day.",
  },
  {
    question: "Is food provided?",
    answer:
      "Yes. Lunch and all materials are fully included in the registration fee. You will not need to worry about anything outside the room.",
  },
  {
    question: "What age group is this for?",
    answer:
      "This workshop is designed for Grades 6 to 10 (ages approximately 11 to 16). The content and intensity are calibrated for curious, ambitious teenagers who want to understand how real longevity startups are built from scratch.",
  },
  {
    question: "Where exactly is it?",
    answer:
      "Horizon Center, Gurgaon. The venue is easily accessible and well-connected. Exact address and directions will be shared upon registration.",
  },
  {
    question: "What are the timings?",
    answer:
      "May 23rd, 11:00 AM to 3:00 PM (4 hours). Unlike a 1-hour lecture, this gives enough depth to actually research breakthroughs, build financial models, and pitch a real longevity startup.",
  },
  {
    question: "Why are seats limited?",
    answer:
      "Hands-on mentorship does not scale. We cap numbers to ensure every participant gets real feedback, direct mentor time, and a meaningful competitive environment. When we say limited, we mean it.",
  },
];

function FaqItem({ faq }: { faq: { question: string; answer: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lp-fade-in border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-[#34D399]/20">
      <button
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] font-medium text-white leading-snug">
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: open ? `${ACCENT}40` : "rgba(255,255,255,0.1)",
            color: open ? ACCENT : "rgba(255,255,255,0.5)",
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

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? "400px" : "0", opacity: open ? 1 : 0 }}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div
            className="h-px mb-3"
            style={{ background: `linear-gradient(to right, ${ACCENT}20, transparent)` }}
          />
          <p className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative py-10 sm:py-16 lg:py-20 overflow-hidden" style={{ background: "#050505" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(52,211,153,0.03) 0%, transparent 70%)",
        }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          className="lp-fade-in w-full flex items-center justify-between gap-4 mb-0 group"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <div className="text-left">
            <span
              className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-2"
              style={{ color: ACCENT }}
            >
              FAQ
            </span>
            <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-[family-name:var(--font-milan)] leading-[1.15] text-white">
              Everything you need{" "}
              <span style={{ color: ACCENT, textShadow: `0 0 30px rgba(52,211,153,0.25)` }}>to know</span>
            </h2>
          </div>
          <span
            className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{
              borderColor: open ? `${ACCENT}40` : "rgba(255,255,255,0.1)",
              color: open ? ACCENT : "rgba(255,255,255,0.5)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: open ? "9999px" : "0", opacity: open ? 1 : 0 }}
        >
          <div className="pt-8 sm:pt-12 space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
