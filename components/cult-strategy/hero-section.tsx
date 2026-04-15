import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";

const ACCENT = "#FF6B2B";
const ACCENT_DIM = "rgba(255,107,43,";

export default function HeroSection() {
  return (
    <section
      id="cult-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${ACCENT_DIM}0.1) 0%, transparent 70%)`,
          }}
        />

        <div className="hidden md:block absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-full"
              style={{
                left: `${i * 6.25}%`,
                width: "1px",
                background: `linear-gradient(180deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        <div
          className="cult-scale-x absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent 0%, ${ACCENT} 40%, ${ACCENT} 60%, transparent 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          className="cult-fade flex items-center justify-center gap-3 mb-6 sm:mb-8"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
            Alcovia Workshop
          </span>
          <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
        </div>

        <h1
          className="font-[family-name:var(--font-milan)] leading-[0.9] tracking-tight mb-4 sm:mb-6"
        >
          <span
            className="block text-[clamp(2.5rem,8vw,7rem)] text-white"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
          >
            The Cult
          </span>
          <span
            className="block text-[clamp(2.5rem,8vw,7rem)]"
            style={{
              color: ACCENT,
              textShadow: `0 0 60px ${ACCENT_DIM}0.4), 0 0 20px ${ACCENT_DIM}0.2)`,
            }}
          >
            Strategy
          </span>
        </h1>

        <p
          className="cult-fade text-[clamp(0.85rem,2vw,1.4rem)] font-[family-name:var(--font-monument)] uppercase tracking-[0.15em] text-white/80 mb-6 sm:mb-8"
          style={{ animationDelay: "0.7s" }}
        >
          Manufacturing Status &amp;{" "}
          <span style={{ color: ACCENT }}>Hype</span>
        </p>

        <div
          className="cult-fade w-16 sm:w-24 h-px mx-auto mb-6 sm:mb-8"
          style={{ background: `${ACCENT_DIM}0.4)`, animationDelay: "0.9s" }}
        />

        <p
          className="cult-fade text-base sm:text-lg md:text-xl font-[family-name:var(--font-playfair)] italic text-white/70 max-w-xl mx-auto mb-2"
          style={{ animationDelay: "1.1s" }}
        >
          Learn how Nike manufactures hype and global communities with Marketing Head Siddhant Narayan
        </p>
        <p
          className="cult-fade text-xs sm:text-sm text-white/50 font-[family-name:var(--font-satoshi)] max-w-md mx-auto"
          style={{ animationDelay: "1.2s" }}
        >
          Country Head of Marketing, Nike
        </p>

        <div
          className="cult-fade mt-10 sm:mt-12 flex flex-col items-center gap-3"
          style={{ animationDelay: "1.4s" }}
        >
          <WorkshopCheckoutLink
            ctaSource="hero"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
          >
            <span
              className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-bold transition-all duration-300 group-hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, #FF7A3D 0%, #FF4500 100%)`,
                boxShadow: `0 4px 32px ${ACCENT_DIM}0.45), 0 1px 0 rgba(255,255,255,0.15) inset`,
              }}
            >
              Secure My Spot
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </WorkshopCheckoutLink>

          <p className="text-xs text-white/35 font-[family-name:var(--font-satoshi)] tracking-wide">
            ₹3,999 per seat · Inclusive of lunch and materials
          </p>
        </div>

        <div
          className="cult-fade mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
          style={{ animationDelay: "1.6s" }}
        >
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-4 h-4">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)]">
              Sat, April 18th · 11 AM – 4 PM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-4 h-4">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)]">
              One Horizon Centre, Gurgaon
            </span>
          </div>

          <div
            className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5"
            style={{ borderColor: `${ACCENT_DIM}0.25)` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: ACCENT }}
            />
            <span
              className="text-xs sm:text-sm tracking-wider font-[family-name:var(--font-satoshi)]"
              style={{ color: ACCENT }}
            >
              Limited Spots
            </span>
          </div>
        </div>
      </div>

      <div
        className="cult-fade absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10"
        style={{ animationDelay: "2s" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="cult-scroll-chevron w-5 h-5 text-white/20"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className="hidden sm:block absolute top-8 left-8 w-12 h-12 border-t border-l" style={{ borderColor: `${ACCENT_DIM}0.22)` }} />
      <div className="hidden sm:block absolute top-8 right-8 w-12 h-12 border-t border-r" style={{ borderColor: `${ACCENT_DIM}0.22)` }} />
      <div className="hidden sm:block absolute bottom-8 left-8 w-12 h-12 border-b border-l" style={{ borderColor: `${ACCENT_DIM}0.22)` }} />
      <div className="hidden sm:block absolute bottom-8 right-8 w-12 h-12 border-b border-r" style={{ borderColor: `${ACCENT_DIM}0.22)` }} />
    </section>
  );
}
