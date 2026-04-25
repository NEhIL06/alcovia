import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#22C55E";
const ACCENT_DIM = "rgba(34,197,94,";

const pillars = [
  {
    number: "01",
    phase: "Pillar 1",
    title: "Trend Spotting",
    subtitle: "Identifying what the market wants next",
    description:
      "Before any superfood hits shelves, someone spotted the trend first. Learn how to read consumer data, decode health and wellness movements, and identify the next ingredient the market will pay a premium for. This is research, not guesswork.",
    stat: "3+",
    statLabel: "food trends decoded live",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    phase: "Pillar 2",
    title: "Customer Discovery",
    subtitle: "Interviewing real people",
    description:
      "Building a food brand is not about recipes. It is about asking a hundred customers what they actually want before you make anything. Learn structured interviewing, how to extract honest feedback, and how to build a product people will actually buy.",
    stat: "100%",
    statLabel: "real customer interviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    number: "03",
    phase: "Pillar 3",
    title: "The Investor Pitch",
    subtitle: "Pitch like you are raising money",
    description:
      "Teens will work in teams to build a complete superfood brand strategy and pitch it for funding. Market sizing, pricing, packaging, distribution, all of it goes into your pitch deck. Present to mentors who will challenge your thinking like real investors.",
    stat: "₹3,999",
    statLabel: "per seat · lunch included",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

export default function WorkshopPhases() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          <CursorParallaxGrid opacity={0.04} depth={16} spotlight />
        </div>
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-14">
          <span
            className="lp-fade-in inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
          >
            The 3 Pillars
          </span>

          <h2 className="lp-fade-in text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3">
            What happens{" "}
            <span style={{ color: ACCENT }}>inside</span>
          </h2>

          <p className="lp-fade-in text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto">
            Three pillars. One day. The complete journey from spotting
            a food trend to pitching it for real money.
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
                      className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 group-hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] z-10"
                      style={{
                        borderColor: `${ACCENT_DIM}0.35)`,
                        background: `${ACCENT_DIM}0.08)`,
                        color: ACCENT,
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <div className="relative flex-1 border border-[#F7F7F3]/[0.06] rounded-2xl overflow-hidden bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#22C55E]/20 hover:bg-[#F7F7F3]/[0.04] hover:shadow-[0_8px_40px_rgba(34,197,94,0.08)]">
                    <div
                      className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                      style={{
                        background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
                      }}
                    />

                    <div
                      className="h-px"
                      style={{
                        background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.3), transparent)`,
                      }}
                    />

                    <div className="p-3 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-12">
                      <div className="flex-shrink-0 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-5">
                        <div
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 border"
                          style={{
                            borderColor: `${ACCENT_DIM}0.25)`,
                            background: `${ACCENT_DIM}0.06)`,
                          }}
                        >
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
                            style={{ color: ACCENT }}
                          >
                            {item.phase}
                          </span>
                        </div>

                        <div className="flex flex-col gap-0.5 lg:pl-1">
                          <span
                            className="text-xl sm:text-2xl font-[family-name:var(--font-monument)] font-bold leading-none"
                            style={{ color: ACCENT }}
                          >
                            {item.stat}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-white/40 font-[family-name:var(--font-satoshi)] leading-tight max-w-[90px]">
                            {item.statLabel}
                          </span>
                        </div>
                      </div>

                      <div
                        className="hidden lg:block w-px self-stretch"
                        style={{
                          background: `linear-gradient(to bottom, transparent, ${ACCENT_DIM}0.15), transparent)`,
                        }}
                      />

                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-1.5">
                          <span
                            className="font-[family-name:var(--font-monument)] font-bold leading-none transition-colors duration-500 group-hover:opacity-50"
                            style={{
                              fontSize: "clamp(2.5rem,5vw,4rem)",
                              color: `${ACCENT_DIM}0.12)`,
                            }}
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
                        <p className="text-sm sm:text-base text-white/55 font-[family-name:var(--font-satoshi)] leading-snug max-w-2xl">
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
    </section>
  );
}
