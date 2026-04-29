const ACCENT = "#22C55E";

const stats = [
  {
    number: "3%",
    label: "Selection Rate",
    description: "Only the most driven students make the cut",
  },
  {
    number: "15+",
    label: "Industry Mentors",
    description: "Food founders, investors, and brand builders across our programs",
  },
  {
    number: "4hrs",
    label: "Immersive Workshop",
    description: "Hands-on product building, not boring lectures",
  },
  {
    number: "₹500Cr+",
    label: "Superfood Market",
    description: "The booming market we teach you to enter.",
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden" style={{ background: "#F9F8F5" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.03) 50%, transparent 100%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span
            className="lp-fade-in inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold mb-4"
            style={{ color: ACCENT }}
          >
            The Proof
          </span>
          <h2 className="lp-fade-in text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight text-[#111827]">
            Numbers don&apos;t lie.{" "}
            <span style={{ color: ACCENT }}>Neither do they.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="lp-fade-in group text-center p-3 sm:p-5 border border-gray-200 rounded-2xl bg-white transition-all duration-500 hover:border-[#22C55E]/30 hover:shadow-[0_4px_20px_rgba(34,197,94,0.07)]"
            >
              <span
                className="block text-2xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-monument)] font-bold mb-1"
                style={{ color: ACCENT }}
              >
                {stat.number}
              </span>
              <span className="block text-xs sm:text-sm font-[family-name:var(--font-monument)] uppercase tracking-wider text-[#111827] mb-1.5">
                {stat.label}
              </span>
              <span className="block text-[10px] sm:text-xs text-[#9ca3af] font-[family-name:var(--font-satoshi)] leading-snug">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
