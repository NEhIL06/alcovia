const ACCENT = "#34D399";
const ACCENT_DIM = "rgba(52,211,153,";

const takeaways = [
  {
    title: "Attention Engineering",
    description:
      "How to construct hooks, frames, and pacing that win the scroll - the exact mechanics behind every account they already follow.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Niche & Positioning",
    description:
      "How to pick a lane specific enough to grow in and broad enough to scale. The most underrated skill in the creator economy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    title: "Monetisation Mindset",
    description:
      "How creators actually earn - brand deals, products, communities, services - and what makes a teen creator investable instead of invisible.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
];

export default function TakeawaysSection() {
  return (
    <section className="relative py-12 sm:py-20 lg:py-24" style={{ background: "#050505" }}>
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
            What they <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT_DIM}0.3)` }}>master</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {takeaways.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#34D399]/20 transition-all duration-500 overflow-hidden"
            >
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

                <div
                  className="h-px mb-3 w-8 group-hover:w-full transition-all duration-700"
                  style={{ background: `${ACCENT_DIM}0.2)` }}
                />

                <p className="text-xs sm:text-sm text-white/55 font-[family-name:var(--font-satoshi)] leading-relaxed">
                  {item.description}
                </p>

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
