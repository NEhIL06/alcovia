import Image from "next/image";
import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";

const ACCENT = "#22C55E";
const ACCENT_DIM = "rgba(34,197,94,";

export default function HeroSection() {
  return (
    <section
      id="cult-hero"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-14 sm:pb-16"
      style={{ background: "#F9F8F5" }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 20% 50%, ${ACCENT_DIM}0.07) 0%, transparent 65%)`,
          }}
        />
        <div className="hidden sm:block absolute top-8 left-8 w-12 h-12 border-t border-l" style={{ borderColor: `${ACCENT_DIM}0.25)` }} />
        <div className="hidden sm:block absolute top-8 right-8 w-12 h-12 border-t border-r" style={{ borderColor: `${ACCENT_DIM}0.25)` }} />
        <div className="hidden sm:block absolute bottom-8 left-8 w-12 h-12 border-b border-l" style={{ borderColor: `${ACCENT_DIM}0.25)` }} />
        <div className="hidden sm:block absolute bottom-8 right-8 w-12 h-12 border-b border-r" style={{ borderColor: `${ACCENT_DIM}0.25)` }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6">
              <span className="h-px w-8" style={{ background: ACCENT }} />
              <span
                className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
                style={{ color: ACCENT }}
              >
                Alcovia Workshop For Teenagers
              </span>
              <span className="h-px w-8" style={{ background: ACCENT }} />
            </div>

            <h1 className="font-[family-name:var(--font-milan)] leading-[0.93] tracking-tight mb-5 sm:mb-6">
              <span className="block text-[clamp(2rem,5.5vw,5rem)] text-[#111827]">
                Turn Your Snack Idea
              </span>
              <span
                className="block text-[clamp(2rem,5.5vw,5rem)]"
                style={{ color: ACCENT, textShadow: `0 0 40px ${ACCENT_DIM}0.15)` }}
              >
                Into a Real Brand
              </span>
            </h1>

            <p className="text-base sm:text-lg font-[family-name:var(--font-satoshi)] text-[#6b7280] max-w-lg mx-auto lg:mx-0 mb-7 sm:mb-9 leading-relaxed">
              Chia seeds used to be bird food. Then someone figured out how to sell them for ₹500 a pack.{" "}
              <span className="font-semibold text-[#111827]">That someone could be YOU.</span>
            </p>

            <div className="flex flex-col items-center lg:items-start gap-2.5 mb-8 sm:mb-10">
              <WorkshopCheckoutLink
                ctaSource="hero"
                className="group relative inline-flex items-center gap-3 overflow-hidden"
              >
                <span
                  className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-bold transition-all duration-300 group-hover:scale-[1.04]"
                  style={{
                    background: `linear-gradient(135deg, #22C55E 0%, #16A34A 100%)`,
                    boxShadow: `0 6px 32px ${ACCENT_DIM}0.4), 0 1px 0 rgba(255,255,255,0.18) inset`,
                  }}
                >
                  Secure My Spot
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </WorkshopCheckoutLink>
              <p className="text-xs text-[#9ca3af] font-[family-name:var(--font-satoshi)] tracking-wide">
                ₹3,999 per seat · Inclusive of lunch and study materials
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-4">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className="text-xs sm:text-sm text-[#6b7280] font-[family-name:var(--font-satoshi)]">Fri, May 2nd · 11 AM – 3 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs sm:text-sm text-[#6b7280] font-[family-name:var(--font-satoshi)]">Horizon Center, Gurgaon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span className="text-xs sm:text-sm text-[#6b7280] font-[family-name:var(--font-satoshi)]">Grades 6 – 10</span>
              </div>
              <div
                className="inline-flex items-center gap-1.5 border rounded-full px-3.5 py-1.5"
                style={{ borderColor: `${ACCENT_DIM}0.35)`, background: `${ACCENT_DIM}0.08)` }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                <span className="text-xs tracking-wider font-[family-name:var(--font-satoshi)] font-semibold" style={{ color: ACCENT }}>
                  Only 17 Spots Left
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-80 lg:w-[42%] flex-shrink-0">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/lp/cohort.jpg"
                alt="Alcovia Workshop – Students learning brand building"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 20rem, 42vw"
              />
              <div
                className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(8px)" }}
              >
                <p className="text-[11px] sm:text-xs font-[family-name:var(--font-satoshi)] text-[#4b5563] leading-snug">
                  <span className="font-semibold text-[#111827]">Whole Truth · Yoga Bar · Raw Pressery</span>
                  <br />All started as ideas in someone&apos;s notebook.
                </p>
              </div>
            </div>
            <div
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full -z-10"
              style={{ background: `${ACCENT_DIM}0.1)`, filter: "blur(40px)" }}
            />
            <div
              className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full -z-10"
              style={{ background: `${ACCENT_DIM}0.07)`, filter: "blur(30px)" }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="cult-scroll-chevron w-5 h-5 text-[#9ca3af]">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
