const ACCENT = "#34D399";
const ACCENT_DIM = "rgba(52,211,153,";

export default function HookSection() {
  return (
    <section className="relative py-8 sm:py-16 overflow-hidden" style={{ background: "#050505" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${ACCENT_DIM}0.04) 50%, transparent 100%)`,
          }}
          className="absolute inset-0"
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)` }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-[0.95] tracking-tight text-white mb-6">
          Coding used to take years.{" "}
          <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT_DIM}0.3)` }}>That barrier is gone.</span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl font-[family-name:var(--font-satoshi)] text-white/60 leading-relaxed max-w-3xl mx-auto">
          Every app on your phone, every game you play, every site you scroll on — are built by people who learned to give a machine clear instructions. That moat just disappeared. AI now writes the code. The new edge isn&apos;t typing syntax, it&apos;s knowing what to build, how to break it down, and how to talk to AI like an architect.{" "}
          <span className="text-white font-semibold">
            The teens who learn this now don&apos;t grow up to use software. They grow up to ship it.
          </span>
        </p>
      </div>
    </section>
  );
}
