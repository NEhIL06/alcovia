"use client";

import { useState } from "react";
import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";
import BackToTopButton from "@/components/cult-strategy/back-to-top-button";

const ACCENT = "#34D399";
const ACCENT_DEEP = "#047857";
const ACCENT_DIM = "rgba(52,211,153,";

const eventDetails = [
  {
    icon: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    label: "May 23rd",
  },
  {
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    label: "11:00 AM to 3:00 PM",
  },
  {
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
    label: "Horizon Center, Gurgaon",
  },
  {
    icon: <><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" /></>,
    label: "Lunch & Materials Included",
  },
];


const WORKSHOP_URL = "https://alcovia.life/workshop";
const WA_TEXT = encodeURIComponent(
  "Join the Alcovia AI Workshop for Teenagers! May 23rd in Gurgaon. Go from idea to working game, app, or website in one afternoon. " + WORKSHOP_URL
);
const X_TEXT = encodeURIComponent(
  "Check out Alcovia's AI Workshop for Teenagers! Build a real game, app, or website in one afternoon using AI. May 23rd, Gurgaon."
);

export default function ClosingCtaSection() {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(WORKSHOP_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      id="cult-cta"
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 80%, ${ACCENT_DIM}0.06) 0%, transparent 70%)`,
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }} />

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-[family-name:var(--font-milan)] font-black uppercase tracking-tighter whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 22vw, 28vw)",
            WebkitTextStroke: `1px ${ACCENT_DIM}0.05)`,
            WebkitTextFillColor: "transparent",
            color: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          SECURE
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="lp-fade-in text-[clamp(1.75rem,5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-tight text-white mb-3 sm:mb-4">
          Ready to build your{" "}
          <br />
          <span style={{ color: ACCENT, textShadow: `0 0 40px ${ACCENT_DIM}0.3)` }}>future?</span>
        </h2>

        <p className="lp-fade-in text-sm sm:text-base lg:text-lg text-white/60 font-[family-name:var(--font-satoshi)] max-w-xl mx-auto mb-6 sm:mb-10">
          Seats are strictly capped to keep this hands-on and high-touch. Once every laptop is claimed, registration permanently closes.
        </p>

        <div className="lp-fade-in flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {eventDetails.map((detail, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3.5 py-1.5"
              style={{
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                {detail.icon}
              </svg>
              <span className="text-[11px] sm:text-xs text-white/60 font-[family-name:var(--font-satoshi)] whitespace-nowrap">
                {detail.label}
              </span>
            </div>
          ))}
        </div>

        <div className="lp-fade-in flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to right, transparent, ${ACCENT_DIM}0.4))` }} />
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-[family-name:var(--font-monument)] font-bold" style={{ color: ACCENT }}>
                &#8377;3,999
              </span>
              <span className="text-sm text-white/50 font-[family-name:var(--font-satoshi)]">per seat</span>
            </div>
            <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to left, transparent, ${ACCENT_DIM}0.4))` }} />
          </div>

          <p className="text-xs text-white/50 font-[family-name:var(--font-satoshi)]">Inclusive of lunch and materials</p>

          <WorkshopCheckoutLink
            ctaSource="closing"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
          >
            <span
              className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-bold transition-all duration-300 group-hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, #065f46 100%)`,
                boxShadow: `0 6px 32px ${ACCENT_DIM}0.35), 0 1px 0 rgba(255,255,255,0.15) inset`,
              }}
            >
              Secure My Spot
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </WorkshopCheckoutLink>

          <p className="text-xs text-white/50 font-[family-name:var(--font-satoshi)] tracking-wide">
            Secure payment &middot; Instant confirmation
          </p>
        </div>

        <div className="lp-fade-in flex items-center gap-4 mt-10 sm:mt-16 mb-8 sm:mb-10">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${ACCENT_DIM}0.35)` }} />
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div className="lp-fade-in space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="mailto:info@alcovia.life"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-[#34D399] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              info@alcovia.life
            </a>
            <a
              href="tel:8085901818"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-[#34D399] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              8085901818
            </a>
            <WorkshopCheckoutLink
              ctaSource="callback"
              className="flex items-center gap-2 text-sm font-semibold transition-colors font-[family-name:var(--font-satoshi)] border rounded-full px-5 py-2"
              style={{ color: ACCENT, borderColor: `${ACCENT_DIM}0.35)`, background: `${ACCENT_DIM}0.06)` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Request A Call Back
            </WorkshopCheckoutLink>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] sm:text-xs text-white/50 font-[family-name:var(--font-satoshi)] tracking-wider uppercase mr-2">Share</span>
            <a href={`https://wa.me/?text=${WA_TEXT}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#34D399] hover:border-[#34D399]/20 hover:bg-[#34D399]/[0.05] transition-all duration-300" aria-label="Share on WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${X_TEXT}&url=${encodeURIComponent(WORKSHOP_URL)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#34D399] hover:border-[#34D399]/20 hover:bg-[#34D399]/[0.05] transition-all duration-300" aria-label="Share on X">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <button
              onClick={copyLink}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#34D399] hover:border-[#34D399]/20 hover:bg-[#34D399]/[0.05] transition-all duration-300"
              aria-label="Copy workshop link for Instagram"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#34D399]">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              )}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>

          <BackToTopButton />
        </div>
      </div>

    </section>
  );
}
