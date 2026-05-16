import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";

const ACCENT = "#34D399";
const ACCENT_DEEP = "#047857";
const ACCENT_DIM = "rgba(52,211,153,";

const pillars = [
  {
    number: "01",
    phase: "The Prompt",
    title: "Learn to Talk to AI",
    subtitle: "Precision over vagueness",
    description:
      "Teens learn how to actually talk to AI - by being specific, giving examples, and setting context. They'll see firsthand why vague prompts produce vague output, and how the right prompt unlocks production-grade code in seconds.",
    stat: "3+",
    statLabel: "prompts, precision, output",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    phase: "The Approach",
    title: "Break the Idea Down",
    subtitle: "Founder mindset",
    description:
      "Teens learn the founder mindset of breaking a big idea into smaller pieces, then into buildable chunks. This is the difference between a teen who wants to build a 'cool app' vs the one who actually builds it.",
    stat: "1",
    statLabel: "idea broken into reality",
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
    phase: "The Build",
    title: "Launch Something Real",
    subtitle: "Game, website, or app",
    description:
      "Every teen leaves with something real, working, and theirs. They pick their build path: a game with their own characters and mechanics, a website about something they care about, or a real-world app that fixes a problem in their life.",
    stat: "Live",
    statLabel: "shipped in one afternoon",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];


const testimonials = [
  {
    quote: "I never knew an IPL owner thinks more like a banker than a cricket fan. The boardroom session completely changed how I watch the game.",
    name: "Ansh",
    age: "15",
    photo: "/images/lp/environment.jpg",
  },
  {
    quote: "We actually built an F1 team budget and had to defend every number. Nothing in school has ever felt that real.",
    name: "Aryaana",
    age: "14",
    photo: "/images/lp/ideas-to-execution.jpg",
  },
  {
    quote: "I came in thinking aviation meant flying. Left knowing about slot trading, terminal ops, cargo revenue. There are so many ways to run an airport.",
    name: "Aksh",
    age: "16",
    photo: "/images/workshop/w5.jpeg",
  },
];

function TestimonialsCarousel() {
  return (
    <div className="mt-10 sm:mt-14 overflow-hidden">
      <div className="flex gap-4 marquee-track" style={{ width: "max-content" }}>
        {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, i) => (
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

          <h2 className="lp-fade-in text-[clamp(2rem,5vw,3.75rem)] font-[family-name:var(--font-milan)] leading-[1.15] text-white mb-3">
            What happens{" "}
            <span style={{ color: ACCENT }}>in the workshop?</span>
          </h2>

          <p className="lp-fade-in text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto">
            Three phases. From learning to prompt AI precisely, to breaking down a real idea, to shipping something that works.
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
