"use client";

import { useState } from "react";

const ACCENT = "#34D399";

const faqs = [
  {
    question: "Who is this workshop for?",
    answer:
      "This workshop is designed for Grades 6 to 10 (ages approximately 11–16). It's built for teens who are already scrolling - curious about why some content works and others doesn't, or who want to build a real presence online. No prior experience with content creation is needed.",
  },
  {
    question: "What does my teen actually leave with?",
    answer:
      "Every participant leaves with three concrete deliverables: a chosen niche they can own, a content pillar map (the backbone of their content strategy), and three fully scripted reel concepts ready to film. Not theory - actual infrastructure to start publishing the same week.",
  },
  {
    question: "Do they need any followers or equipment beforehand?",
    answer:
      "No. Zero followers required. The workshop is about understanding the system - hooks, niches, rhythm, monetisation - which works whether you have 0 or 10,000 followers. All they need is a phone and a willingness to think.",
  },
  {
    question: "Who are the mentors?",
    answer:
      "Active creators and operators who built their audiences from zero, run monetised channels today, and know exactly what's working in 2026. Not teachers. Not marketers. People who do this for a living and are in the room to work with your teen directly.",
  },
  {
    question: "What's included in ₹3,999?",
    answer:
      "The full 4-hour hands-on workshop, direct mentorship from active creators, all materials and frameworks, lunch, and your teen's three scripted reel concepts to walk out with. Everything is included - there's nothing to bring except themselves.",
  },
  {
    question: "How many seats are available?",
    answer:
      "Seats are strictly capped to keep this a real working session, not a lecture hall. We limit numbers to ensure every teen gets direct mentor time, meaningful feedback, and an environment where they can actually think and create. When it's full, registration permanently closes.",
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
            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight text-white">
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
