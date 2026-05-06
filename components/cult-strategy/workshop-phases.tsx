"use client";

import { useRef, useState, type MouseEvent } from "react";
import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";

const ACCENT = "#34D399";
const ACCENT_DEEP = "#047857";
const ACCENT_DIM = "rgba(52,211,153,";

const pillars = [
  {
    number: "01",
    phase: "The Blueprint",
    title: "Decode the Science",
    subtitle: "From lab to commercial reality",
    description:
      "We decode the actual science driving today's market. Learn how cellular rejuvenation and gene therapies are making the leap from the lab to commercial reality.",
    stat: "3+",
    statLabel: "rejuvenation tech decoded",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    phase: "The Build",
    title: "Conceptualize the Startup",
    subtitle: "Form an executive team",
    description:
      "Teens form an executive team to conceptualize their own longevity startup. They define their breakthrough, identify their target market, and build a profitable, scalable business model.",
    stat: "1",
    statLabel: "longevity startup built",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    number: "03",
    phase: "The Pitch",
    title: "Face the Investors",
    subtitle: "Secure simulated seed funding",
    description:
      "Competing head-to-head, they pitch their longevity startup, highlight their core product offerings to convince people to buy in, and negotiate to secure simulated seed funding.",
    stat: "Live",
    statLabel: "pitch to real VCs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];


const testimonials = [
  {
    quote: "Showed me that longevity is not just biology, it's the biggest business opportunity of our generation.",
    name: "Ansh",
    age: "15",
    photo: "/images/lp/environment.jpg",
  },
  {
    quote: "You actually build and defend financial projections. Nothing like school.",
    name: "Aryaana",
    age: "14",
    photo: "/images/lp/ideas-to-execution.jpg",
  },
  {
    quote: "After the workshop, I started looking at health and ageing as engineering problems. I can't unsee it now.",
    name: "Aksh",
    age: "16",
    photo: "/images/workshop/w5.jpeg",
  },
];

function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  function onMouseDown(e: MouseEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;
    setDragging(true);
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  }

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!dragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current);
  }

  function stopDrag() { setDragging(false); }

  return (
    <div
      ref={scrollRef}
      className="mt-10 sm:mt-14 flex gap-4 overflow-x-auto px-4 sm:px-8 pb-2 select-none"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" as never, cursor: dragging ? "grabbing" : "grab" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {testimonials.map((item, i) => (
        <div
          key={i}
          className="w-[260px] sm:w-[300px] flex-shrink-0 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md overflow-hidden p-5"
        >
          <span
            className="block text-3xl font-[family-name:var(--font-playfair)] leading-none mb-2"
            style={{ color: `${ACCENT}50` }}
          >
            &ldquo;
          </span>
          <p className="text-xs sm:text-sm text-white/70 font-[family-name:var(--font-playfair)] italic leading-snug mb-4">
            {item.quote}
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
            <div>
              <span className="block text-sm text-white font-[family-name:var(--font-satoshi)] font-semibold">
                {item.name}
              </span>
              <span className="block text-[10px] text-white/40 font-[family-name:var(--font-satoshi)]">
                Age {item.age} &middot; Alcovia Community
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkshopPhases() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden" style={{ background: "#050505" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${ACCENT_DIM}0.05) 0%, transparent 70%)`,
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-14">
          <span
            className="lp-fade-in inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4 font-semibold"
            style={{ color: ACCENT }}
          >
            The Journey
          </span>

          <h2 className="lp-fade-in text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight text-white mb-3">
            What happens{" "}
            <span style={{ color: ACCENT }}>in the workshop?</span>
          </h2>

          <p className="lp-fade-in text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto">
            Three phases. One day. The complete journey from decoding biological breakthroughs to pitching a high-stakes longevity startup.
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden lg:block absolute left-[2.25rem] top-10 bottom-10 w-px"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${ACCENT_DIM}0.2) 15%, ${ACCENT_DIM}0.2) 85%, transparent 100%)`,
            }}
          />

          <div className="space-y-3 sm:space-y-6">
            {pillars.map((item) => (
              <div key={item.number} className="lp-fade-in group">
                <div className="flex gap-4 lg:gap-6 items-start">
                  <div className="hidden lg:flex flex-col items-center flex-shrink-0 pt-6">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 group-hover:shadow-[0_0_16px_rgba(52,211,153,0.35)] z-10"
                      style={{
                        borderColor: `${ACCENT_DIM}0.35)`,
                        background: `${ACCENT_DIM}0.08)`,
                        color: ACCENT,
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <div className="relative flex-1 border border-white/5 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-[#34D399]/20 hover:shadow-[0_8px_40px_rgba(52,211,153,0.08)]">
                    <div
                      className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                      style={{ background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)` }}
                    />
                    <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.2), transparent)` }} />

                    <div className="p-3 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-12">
                      {/* Top row: phase badge left, stat right */}
                      <div className="flex-shrink-0 lg:flex-col flex flex-row items-center justify-between lg:justify-start lg:items-start gap-4 lg:gap-5 w-full lg:w-auto">
                        <div
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 border"
                          style={{ borderColor: `${ACCENT_DIM}0.25)`, background: `${ACCENT_DIM}0.06)` }}
                        >
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
                            style={{ color: ACCENT }}
                          >
                            {item.phase}
                          </span>
                        </div>

                      </div>

                      <div
                        className="hidden lg:block w-px self-stretch"
                        style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT_DIM}0.15), transparent)` }}
                      />

                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-1.5">
                          <span
                            className="font-[family-name:var(--font-monument)] font-bold leading-none transition-colors duration-500 group-hover:opacity-40"
                            style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: `${ACCENT_DIM}0.12)` }}
                          >
                            {item.number}
                          </span>
                          <span
                            className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)]"
                            style={{ color: `${ACCENT_DIM}0.7)` }}
                          >
                            {item.subtitle}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-[family-name:var(--font-milan)] text-white mb-3 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-snug max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Testimonials infinite auto-scroll carousel – full bleed */}
      <TestimonialsCarousel />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mid CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <WorkshopCheckoutLink
            ctaSource="mid"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
          >
            <span
              className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-bold transition-all duration-300 group-hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, #065f46 100%)`,
                boxShadow: `0 6px 32px ${ACCENT_DIM}0.35), 0 1px 0 rgba(255,255,255,0.15) inset`,
              }}
            >
              Secure My Spot
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </WorkshopCheckoutLink>
          <p className="mt-3 text-xs text-[#9ca3af] font-[family-name:var(--font-satoshi)]">
            ₹3,999 per seat · Inclusive of lunch and materials
          </p>
        </div>
      </div>
    </section>
  );
}
