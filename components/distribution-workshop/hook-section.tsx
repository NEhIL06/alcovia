const ACCENT_DIM = "rgba(234,191,54,";

const GOLD_TEXT_STYLE = {
  backgroundImage: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
  color: "transparent" as const,
};

export default function HookSection() {
  return (
    <section className="relative py-8 sm:py-16 overflow-hidden" style={{ background: "#0B1629" }}>
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
          You scrolled past 47 reels today.{" "}
          <span style={GOLD_TEXT_STYLE}>You&apos;ll remember two.</span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl font-[family-name:var(--font-satoshi)] text-white/60 leading-relaxed max-w-3xl mx-auto mb-6">
          That&apos;s the whole game - and the teens who understand the mechanics behind it are building audiences, brand deals, and businesses while their classmates are still arguing about screen time. The gap between &ldquo;consumer&rdquo; and &ldquo;creator&rdquo; just disappeared. School isn&apos;t teaching this. The algorithm doesn&apos;t care.
        </p>

        <div className="max-w-3xl mx-auto border border-white/8 rounded-2xl p-6 sm:p-8 bg-white/5 backdrop-blur-sm">
          <p className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] text-white/60 leading-relaxed mb-4">
            Every reel that stopped your thumb today was engineered. Every account you follow built a system of hooks, rhythm, niches, monetisation - designed to win the scroll. Most teens grow up consuming this system. A small few learn to operate it.
          </p>
          <p className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] text-white/60 leading-relaxed mb-4">
            Those few are the ones getting paid before they finish school. The skill isn&apos;t &ldquo;going viral&rdquo; - it&apos;s understanding the playbook.
          </p>
          <p className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] leading-relaxed font-semibold" style={GOLD_TEXT_STYLE}>
            The teens who learn it now don&apos;t grow up to use the feed. They grow up to own it.
          </p>
        </div>
      </div>
    </section>
  );
}
