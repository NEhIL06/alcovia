"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#00E5FF";
const ACCENT_DIM = "rgba(0,229,255,";

const takeaways = [
  {
    title: "Biotech Fundamentals",
    description: "How to separate media hype from real, investable clinical science. They leave knowing which breakthroughs are lab experiments and which are commercial opportunities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Market Economics",
    description: "How to analyze emerging bio-markets and understand the financial architecture behind extending human life — from R&D costs to investor return models.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "The Art of the Pitch",
    description: "Mastering the high-stakes presentation frameworks real founders use to persuade investors and close deals — delivered under live VC pressure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "A Longevity Startup",
    description: "They leave with an actual company: a defined breakthrough, a scalable business model, financial projections, and a pitch deck built and defended on the day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function TakeawaysSection() {
  return (
    <section className="relative py-12 sm:py-20 lg:py-24" style={{ background: "#050505" }}>
      {/* Background styling for dark theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <span 
            className="lp-fade-in inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-3 font-semibold"
            style={{ color: ACCENT }}
          >
            The Outcome
          </span>
          <h2 className="lp-fade-in text-[clamp(1.75rem,4vw,3.5rem)] font-[family-name:var(--font-milan)] leading-tight text-white">
            What they <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT_DIM}0.3)` }}>leave with</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {takeaways.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#00E5FF]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Hover gradient background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, transparent, ${ACCENT})` }}
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    background: `${ACCENT_DIM}0.1)`, 
                    border: `1px solid ${ACCENT_DIM}0.2)`,
                    color: ACCENT
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-[family-name:var(--font-milan)] text-white mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Separator */}
                <div
                  className="h-px mb-3 w-8 group-hover:w-full transition-all duration-700"
                  style={{ background: `${ACCENT_DIM}0.2)` }}
                />

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/55 font-[family-name:var(--font-satoshi)] leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700"
                  style={{
                    background: `linear-gradient(to right, ${ACCENT}, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
