import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#34D399";
const ACCENT_DIM = "rgba(52,211,153,";

const CARDS = [
  {
    number: "01",
    title: "Who controls the science?",
    description: "Ultra-wealthy investors and advanced labs are engineering ways to pause human aging. Learn to separate media hype from the clinical science actually extending human lifespan.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "How do you price time?",
    description: "How do you price a technology that gives someone 20 extra years of life? Uncover the financial architecture and market dynamics behind the longevity bio-economy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Staking your claim",
    description: "Don't just be a passive observer. Discover how founders are turning breakthrough therapies into investable startups, and learn how to secure funding for the industry of tomorrow.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          <CursorParallaxGrid opacity={0.04} depth={14} spotlight />
        </div>
        <div style={{ background: `linear-gradient(180deg, transparent 0%, ${ACCENT_DIM}0.04) 40%, transparent 100%)` }} className="absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.15), transparent)` }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <span
            className="lp-fade-in inline-block text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-5"
            style={{ color: ACCENT }}
          >
            The Hook
          </span>

          <h2 className="lp-fade-in text-[clamp(1.75rem,4.5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-[0.95] tracking-tight mb-6 text-white">
            Defying death is
            <br />
            <span style={{ color: ACCENT, textShadow: `0 0 40px ${ACCENT_DIM}0.3)` }}>
               the new gold rush.
            </span>
          </h2>

          <p className="lp-fade-in text-base sm:text-lg lg:text-xl font-[family-name:var(--font-satoshi)] text-white/60 leading-relaxed max-w-2xl mx-auto">
            What was once pure science fiction is rapidly becoming the most lucrative bio-economy in the world. But who controls this technology? How do you price it? And how do you stake your claim in the industry of tomorrow?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CARDS.map((item) => (
            <div key={item.number} className="lp-fade-in group relative">
              <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  border: "1px solid rgba(247,247,243,0.07)",
                  background: "linear-gradient(135deg, rgba(247,247,243,0.04) 0%, rgba(247,247,243,0.01) 100%)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
                }}
              >
                <div className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-500"
                  style={{ background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`, opacity: 0.25 }}
                />
                <div className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-center"
                  style={{ background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`, opacity: 0.9 }}
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `0 8px 40px ${ACCENT_DIM}0.15), inset 0 1px 0 ${ACCENT_DIM}0.1)` }}
                />

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-[4.5rem] sm:text-[6rem] font-[family-name:var(--font-monument)] font-black leading-none tracking-tighter transition-colors duration-500"
                      style={{ color: `${ACCENT_DIM}0.12)`, lineHeight: "0.85" }}
                    >
                      {item.number}
                    </span>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{ background: `${ACCENT_DIM}0.1)`, border: `1px solid ${ACCENT_DIM}0.2)`, color: `${ACCENT_DIM}0.7)` }}
                    >
                      <div className="group-hover:text-[#34D399] transition-colors duration-300">
                        {item.icon}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-[family-name:var(--font-milan)] text-white mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/55 font-[family-name:var(--font-satoshi)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
