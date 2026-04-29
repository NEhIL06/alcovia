const ACCENT = "#22C55E";
const ACCENT_DIM = "rgba(34,197,94,";

export default function HookSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: "#F9F8F5" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${ACCENT_DIM}0.04) 50%, transparent 100%)`,
          }}
          className="absolute inset-0"
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.2), transparent)` }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-block text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-5"
          style={{ color: ACCENT }}
        >
          Behind Every Superfood
        </span>

        <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-[0.95] tracking-tight text-[#111827] mb-6">
          Every snack on a shelf started as{" "}
          <span style={{ color: ACCENT }}>an idea in a notebook</span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl font-[family-name:var(--font-satoshi)] text-[#6b7280] leading-relaxed max-w-3xl mx-auto">
          Whole Truth. Yoga Bar. Raw Pressery. Each one started as someone&apos;s idea in a notebook. They didn&apos;t invent anything new. They just understood what people wanted, talked to the right customers, and told a story that stuck.{" "}
          <span className="text-[#111827] font-semibold">
            That&apos;s the real skill behind every health food brand you see on shelves today
          </span>{" "}
          – and it&apos;s a skill you master in 1 day.
        </p>
      </div>
    </section>
  );
}
