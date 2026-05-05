import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";

const ACCENT = "#00E5FF";
const ACCENT_DIM = "rgba(0,229,255,";

export default function HeroSection() {
  return (
    <>
    {/* Manual preload with fetchPriority=high — Next.js Image priority prop
        does not emit fetchpriority on the SSR preload, so LCP image gets
        deprioritized. Lighthouse lcp-discovery-insight confirmed this. */}
    <link
      rel="preload"
      as="image"
      fetchPriority="high"
      imageSrcSet="/_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=640&q=75 640w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=750&q=75 750w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=828&q=75 828w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=1200&q=75 1200w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=1920&q=75 1920w"
      imageSizes="100vw"
    />
    <section
      id="cult-hero"
      className="relative overflow-hidden"
    >
      {/* Full-bleed background image — plain img with explicit fetchPriority
          because Next.js 16 Image priority prop does not emit fetchpriority
          on the rendered <img>, which Lighthouse flags as missing priority
          hint for the LCP element. URLs still go through /_next/image so
          AVIF/WebP optimization is preserved. */}
      <div className="absolute inset-0 z-0">
        <img
          src="/_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=1920&q=75"
          srcSet="/_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=640&q=75 640w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=750&q=75 750w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=828&q=75 828w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=1200&q=75 1200w, /_next/image?url=%2Fimages%2Flp%2Fcohort.jpg&w=1920&q=75 1920w"
          sizes="100vw"
          alt="Alcovia Workshop – Students learning brand building"
          fetchPriority="high"
          decoding="sync"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay – heavier at left/bottom for text, lighter at right for image peek */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.75) 45%, rgba(5,5,5,0.55) 100%)",
          }}
        />
        {/* Bottom fade for smooth section transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))",
          }}
        />
      </div>

      {/* Decorative corner brackets */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l" style={{ borderColor: `${ACCENT_DIM}0.35)` }} />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r" style={{ borderColor: `${ACCENT_DIM}0.35)` }} />
        <div className="hidden sm:block absolute bottom-8 left-8 w-12 h-12 border-b border-l" style={{ borderColor: `${ACCENT_DIM}0.35)` }} />
        <div className="hidden sm:block absolute bottom-8 right-8 w-12 h-12 border-b border-r" style={{ borderColor: `${ACCENT_DIM}0.35)` }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-28 sm:pt-44 sm:pb-32">
        <div className="max-w-xl lg:max-w-2xl text-center lg:text-left">

          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <span className="hidden lg:block h-px w-8" style={{ background: ACCENT }} />
            <span
              className="text-[11px] sm:text-xs tracking-[0.1em] sm:tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
              style={{ color: ACCENT }}
            >
              Alcovia Workshop For Teenagers
            </span>
            <span className="hidden lg:block h-px w-8" style={{ background: ACCENT }} />
          </div>

          <h1 className="font-[family-name:var(--font-milan)] leading-[0.93] tracking-tight mb-5 sm:mb-6">
            <span className="block text-[clamp(2.2rem,6vw,5.5rem)] text-white">
              The 120 year asset
            </span>
            <span
              className="block text-[clamp(1.8rem,5vw,4.5rem)]"
              style={{ color: ACCENT, textShadow: `0 0 40px ${ACCENT_DIM}0.25)` }}
            >
              The business of immortality
            </span>
          </h1>

          <p className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] text-white/70 max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
            Ageing isn&apos;t a limit—it&apos;s a market. Understand how investors value the business of immortality, and apply those insights to pitch your own longevity startup.
          </p>

          <div className="flex flex-col items-center lg:items-start gap-2.5 mb-8 sm:mb-10">
            <WorkshopCheckoutLink
              ctaSource="hero"
              className="group relative inline-flex items-center gap-3 overflow-hidden"
            >
              <span
                className="relative z-10 inline-flex items-center gap-3 text-black font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-bold transition-all duration-300 group-hover:scale-[1.04]"
                style={{
                  background: `linear-gradient(135deg, #00E5FF 0%, #00B8D4 100%)`,
                  boxShadow: `0 6px 32px ${ACCENT_DIM}0.5), 0 1px 0 rgba(255,255,255,0.18) inset`,
                }}
              >
                Decode the Future - Secure My Spot
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </WorkshopCheckoutLink>
            <p className="text-xs text-white/45 font-[family-name:var(--font-satoshi)] tracking-wide">
              ₹3,999 per seat · Inclusive of lunch and study materials
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-5">
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="text-xs sm:text-sm text-white/65 font-[family-name:var(--font-satoshi)]">May 23rd · 11 AM – 3 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-xs sm:text-sm text-white/65 font-[family-name:var(--font-satoshi)]">Horizon Center, Gurgaon</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className="text-xs sm:text-sm text-white/65 font-[family-name:var(--font-satoshi)]">Grades 6 – 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="cult-scroll-chevron w-5 h-5 text-white/40">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
    </>
  );
}
