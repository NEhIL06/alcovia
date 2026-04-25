import CursorParallaxGrid from "./cursor-parallax-grid";

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
    description: "Food entrepreneurs, investors, and brand builders",
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

const testimonials = [
  {
    quote:
      "After the F1 workshop, I started noticing how every brand around me is designed to make me feel something. I can't unsee it now.",
    name: "Aksh",
    age: "16",
  },
  {
    quote:
      "I used to think marketing was just ads. Alcovia showed me it's psychology, strategy, and storytelling all rolled into one. Genuinely changed how I think.",
    name: "Ansh",
    age: "15",
  },
  {
    quote:
      "The best part is you're not just sitting and listening. You're actually building things, competing, and making real decisions. Nothing like school.",
    name: "Aryaana",
    age: "14",
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          <CursorParallaxGrid opacity={0.038} depth={12} spotlight />
        </div>
        <div
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.02) 50%, transparent 100%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span
            className="lp-fade-in inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
          >
            The Proof
          </span>

          <h2 className="lp-fade-in text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight">
            Numbers don&apos;t lie.{" "}
            <span style={{ color: ACCENT }}>Neither do they.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="lp-fade-in group text-center p-3 sm:p-5 border border-[#F7F7F3]/[0.06] rounded-2xl bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#22C55E]/20"
            >
              <span
                className="block text-2xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-monument)] font-bold mb-1"
                style={{ color: ACCENT }}
              >
                {stat.number}
              </span>
              <span className="block text-xs sm:text-sm font-[family-name:var(--font-monument)] uppercase tracking-wider text-white mb-1.5">
                {stat.label}
              </span>
              <span className="block text-[10px] sm:text-xs text-white/50 font-[family-name:var(--font-satoshi)] leading-snug">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="lp-fade-in relative border border-[#F7F7F3]/[0.06] rounded-2xl p-4 sm:p-6 bg-[#F7F7F3]/[0.02]"
            >
              <span
                className="block text-3xl sm:text-5xl font-[family-name:var(--font-playfair)] leading-none mb-2"
                style={{ color: `${ACCENT}30` }}
              >
                &ldquo;
              </span>

              <p className="text-xs sm:text-base text-white/80 font-[family-name:var(--font-playfair)] italic leading-snug mb-3">
                {item.quote}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-[family-name:var(--font-monument)] font-bold text-white"
                  style={{ background: ACCENT }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <span className="block text-sm text-white/90 font-[family-name:var(--font-satoshi)] font-medium">
                    {item.name}
                  </span>
                  <span className="block text-[10px] text-white/45 font-[family-name:var(--font-satoshi)]">
                    Age {item.age} &middot; Alcovia Community
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
