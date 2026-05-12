import Link from "next/link";

const ACCENT = "#EABF36";
const ACCENT_DIM = "rgba(234,191,54,";

const GOLD_TEXT_STYLE = {
  backgroundImage: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
  color: "transparent" as const,
};

export default function AuthoritySection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden" style={{ background: "#0B1629" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${ACCENT_DIM}0.04) 0%, transparent 70%)`,
        }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span
            className="lp-fade-in inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-4"
            style={GOLD_TEXT_STYLE}
          >
            The Mentors
          </span>

          <h2 className="lp-fade-in text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight text-white mb-3">
            Not a lecture.{" "}
            <span style={GOLD_TEXT_STYLE}>A working session.</span>
          </h2>

          <p className="lp-fade-in text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto">
            Alcovia is an offline community in Gurgaon where students in Grades 6–10 learn by working on real projects with real mentors.
          </p>
        </div>

        <div className="lp-fade-in relative border border-white/10 rounded-2xl p-6 sm:p-10 bg-white/5 backdrop-blur-md overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }}
          />
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className="flex-shrink-0 text-4xl sm:text-6xl font-[family-name:var(--font-playfair)] leading-none mt-1"
              style={{ color: `${ACCENT}65` }}
            >
              &ldquo;
            </div>
            <div className="flex-1">
              <p className="text-base sm:text-lg lg:text-xl font-[family-name:var(--font-satoshi)] text-white/80 leading-relaxed">
                Teens get hands-on guidance directly from active creators and operators - people who built audiences from zero, run monetised channels today, and know exactly what&apos;s working in 2026. This isn&apos;t a marketing lecture. It&apos;s a working session with the people doing it for a living.
              </p>
            </div>
          </div>
        </div>

        <div className="lp-fade-in flex justify-center mt-10 sm:mt-14">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border font-[family-name:var(--font-satoshi)] text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_24px_rgba(234,191,54,0.2)]"
            style={{
              borderColor: `${ACCENT_DIM}0.3)`,
              color: ACCENT,
              background: `${ACCENT_DIM}0.06)`,
            }}
          >
            Know more about Alcovia
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
