import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#22C55E";

export default function SpeakerSection() {
  return (
    <section className="relative py-6 sm:py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          <CursorParallaxGrid opacity={0.038} depth={12} spotlight />
        </div>
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.03) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lp-fade-in text-center mb-6 sm:mb-10">
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
            The Challenge
          </span>
        </div>

        <div className="lp-fade-in flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16">
          <div className="relative flex-shrink-0">
            <div className="relative w-48 h-60 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              <div
                className="absolute inset-0 border rounded-2xl"
                style={{ borderColor: `rgba(34,197,94,0.15)` }}
              />

              <div className="absolute inset-3 rounded-xl overflow-hidden bg-[#0d1a0f] flex flex-col items-center justify-center px-5 py-6 text-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-10 h-10 sm:w-14 sm:h-14 opacity-60">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <p className="text-sm sm:text-lg font-[family-name:var(--font-playfair)] italic text-white/70 leading-snug">
                  &ldquo;Every superfood you eat today started in someone&apos;s notebook.&rdquo;
                </p>
                <div className="w-8 h-px" style={{ background: `rgba(34,197,94,0.3)` }} />
                <p className="text-xs sm:text-sm font-[family-name:var(--font-playfair)] italic text-white/50 leading-snug">
                  &ldquo;School teaches photosynthesis, not how to build a food company.&rdquo;
                </p>
              </div>

              <div
                className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 rounded-tl-md"
                style={{ borderColor: `rgba(34,197,94,0.4)` }}
              />
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 rounded-tr-md"
                style={{ borderColor: `rgba(34,197,94,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 rounded-bl-md"
                style={{ borderColor: `rgba(34,197,94,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 rounded-br-md"
                style={{ borderColor: `rgba(34,197,94,0.4)` }}
              />
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0b0d0c] border border-[#22C55E]/30 rounded-full px-4 py-1.5 flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: ACCENT }}
              />
              <span
                className="text-[10px] sm:text-xs font-[family-name:var(--font-satoshi)] font-medium tracking-wider uppercase whitespace-nowrap"
                style={{ color: ACCENT }}
              >
                One Day · Complete Loop
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <div className="space-y-3 sm:space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-white mb-3">
                  The Whole Loop
                </h3>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start mb-2">
                  <span
                    className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] font-medium"
                    style={{ color: ACCENT }}
                  >
                    Trend to Pitch in One Day
                  </span>
                </div>
                <p className="text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
                  Research, interview, build, and pitch a real superfood brand
                </p>
              </div>

              <div
                className="w-12 h-px mx-auto lg:mx-0"
                style={{ background: `rgba(34,197,94,0.3)` }}
              />

              <div className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-snug max-w-lg mx-auto lg:mx-0 space-y-2 text-left">
                <p>
                  This isn&apos;t a lecture. This is a{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    hands-on sprint where you spot a real food trend, interview actual customers, and pitch your brand like you&apos;re raising money.
                  </span>
                </p>
                <p className="hidden sm:block text-white/40">
                  Your teen will learn the exact process real food entrepreneurs
                  use to take an idea from a notebook to a funded product,
                  all in a single high-intensity session.
                </p>
              </div>

              <div className="hidden sm:flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4">
                {[
                  "Trend Spotting",
                  "Customer Research",
                  "Brand Building",
                  "Investor Pitching",
                  "Food Science",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-[#F7F7F3]/10 rounded-full px-3 py-1.5 text-white/40 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
