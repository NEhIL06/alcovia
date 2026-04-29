"use client";

import { useState } from "react";
import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";
import BackToTopButton from "@/components/cult-strategy/back-to-top-button";

const ACCENT = "#22C55E";
const ACCENT_DIM = "rgba(34,197,94,";

const eventDetails = [
  {
    icon: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    label: "Friday, May 2nd",
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

interface CallbackForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_CALLBACK: CallbackForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
};

function CallbackModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<CallbackForm>(EMPTY_CALLBACK);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof CallbackForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.email.trim() || !form.phone.replace(/\D/g, "").length) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await fetch("/api/workshop-checkout-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "contact_callback",
          parent_name: `${form.first_name.trim()} ${form.last_name.trim()}`.trim(),
          parent_phone: form.phone.replace(/\D/g, "").slice(0, 10),
        }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9ca3af] outline-none transition-colors focus:border-[#22C55E]/60 focus:bg-white";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white shadow-2xl"
        style={{ boxShadow: `0 30px 80px -20px ${ACCENT_DIM}0.2), 0 0 0 1px rgba(0,0,0,0.04) inset` }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[#6b7280] hover:bg-gray-200 hover:text-[#111827] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center px-7 py-12 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
              style={{ background: `${ACCENT_DIM}0.12)` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2.5} className="w-7 h-7">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-milan)] text-xl text-[#111827] mb-2">
              We&apos;ll call you back!
            </h3>
            <p className="text-sm text-[#6b7280] font-[family-name:var(--font-satoshi)]">
              Thanks {form.first_name}. We&apos;ll reach out within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col px-5 pt-6 pb-5 sm:px-7 sm:pt-7 sm:pb-6">
            <div className="mb-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="h-px w-6" style={{ background: ACCENT }} />
                <span className="text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold" style={{ color: ACCENT }}>
                  Request A Call Back
                </span>
                <span className="h-px w-6" style={{ background: ACCENT }} />
              </div>
              <h2 className="font-[family-name:var(--font-milan)] text-xl sm:text-2xl text-[#111827] leading-tight">
                Have questions?
              </h2>
              <p className="mt-1.5 text-xs text-[#9ca3af] font-[family-name:var(--font-satoshi)]">
                Leave your details and we&apos;ll call you back within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-[#6b7280] mb-1">
                    First Name <span style={{ color: ACCENT }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => update("first_name", e.target.value)}
                    placeholder="First name"
                    className={inputClass}
                    disabled={submitting}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#6b7280] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => update("last_name", e.target.value)}
                    placeholder="Last name"
                    className={inputClass}
                    disabled={submitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#6b7280] mb-1">
                  Email <span style={{ color: ACCENT }}>*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#6b7280] mb-1">
                  Phone <span style={{ color: ACCENT }}>*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2.5 text-sm text-[#6b7280]">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit number"
                    className={`flex-1 ${inputClass}`}
                    disabled={submitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#6b7280] mb-1">
                  Message (optional)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Any questions for us?"
                  rows={2}
                  className={`${inputClass} resize-none`}
                  disabled={submitting}
                />
              </div>
            </div>

            {error && (
              <p className="mt-3 text-xs text-red-500 text-center" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              style={{
                background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                boxShadow: `0 4px 24px ${ACCENT_DIM}0.3)`,
                fontFamily: "var(--font-monument)",
              }}
            >
              {submitting ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 animate-spin">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
              ) : "Request a call back"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ClosingCtaSection() {
  const [showCallback, setShowCallback] = useState(false);

  return (
    <section
      id="cult-cta"
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
      style={{ background: "#F9F8F5" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 80%, ${ACCENT_DIM}0.06) 0%, transparent 70%)`,
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(to right, transparent, #e5e7eb, transparent)" }} />

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
        <div className="lp-fade-in flex justify-center mb-6 sm:mb-8">
          <div
            className="inline-flex items-center gap-2.5 border rounded-full px-4 py-1.5"
            style={{
              borderColor: `${ACCENT_DIM}0.3)`,
              background: `${ACCENT_DIM}0.07)`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
              style={{ color: ACCENT }}
            >
              17 Spots Remaining
            </span>
          </div>
        </div>

        <h2 className="lp-fade-in text-[clamp(1.75rem,5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-tight text-[#111827] mb-3 sm:mb-4">
          Ready to build your{" "}
          <br />
          <span style={{ color: ACCENT }}>snack brand?</span>
        </h2>

        <p className="lp-fade-in text-sm sm:text-base lg:text-lg text-[#6b7280] font-[family-name:var(--font-satoshi)] max-w-xl mx-auto mb-6 sm:mb-10">
          17 spots. One Saturday. The skills, mentors, and experience that school doesn&apos;t offer – and most adults wish they&apos;d had earlier. Don&apos;t think about it too long.
        </p>

        <div className="lp-fade-in flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {eventDetails.map((detail, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5"
              style={{
                borderColor: "#e5e7eb",
                background: "white",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                {detail.icon}
              </svg>
              <span className="text-[11px] sm:text-xs text-[#6b7280] font-[family-name:var(--font-satoshi)] whitespace-nowrap">
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
              <span className="text-sm text-[#9ca3af] font-[family-name:var(--font-satoshi)]">per seat</span>
            </div>
            <div className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(to left, transparent, ${ACCENT_DIM}0.4))` }} />
          </div>

          <p className="text-xs text-[#9ca3af] font-[family-name:var(--font-satoshi)]">Inclusive of lunch and materials</p>

          <WorkshopCheckoutLink
            ctaSource="closing"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
          >
            <span
              className="relative z-10 inline-flex items-center gap-3 text-white font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-bold transition-all duration-300 group-hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, #22C55E 0%, #16A34A 100%)`,
                boxShadow: `0 6px 32px ${ACCENT_DIM}0.4), 0 1px 0 rgba(255,255,255,0.15) inset`,
              }}
            >
              Secure My Spot
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </WorkshopCheckoutLink>

          <p className="text-xs text-[#9ca3af] font-[family-name:var(--font-satoshi)] tracking-wide">
            Secure payment &middot; Instant confirmation
          </p>
        </div>

        <div className="lp-fade-in flex items-center gap-4 mt-10 sm:mt-16 mb-8 sm:mb-10">
          <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${ACCENT_DIM}0.35)` }} />
          <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
        </div>

        <div className="lp-fade-in space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="mailto:info@alcovia.life"
              className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-[#22C55E] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              info@alcovia.life
            </a>
            <a
              href="tel:8085901818"
              className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-[#22C55E] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              8085901818
            </a>
            <button
              onClick={() => setShowCallback(true)}
              className="flex items-center gap-2 text-sm font-semibold transition-colors font-[family-name:var(--font-satoshi)] border rounded-full px-5 py-2"
              style={{ color: ACCENT, borderColor: `${ACCENT_DIM}0.35)`, background: `${ACCENT_DIM}0.06)` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Request A Call Back
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] sm:text-xs text-[#9ca3af] font-[family-name:var(--font-satoshi)] tracking-wider uppercase mr-2">Share</span>
            <a href="https://wa.me/?text=Check%20out%20Edible%20Engineering%20Workshop%20by%20Alcovia%20-%20Architecting%20the%20Next%20Superfood!" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#9ca3af] hover:text-[#22C55E] hover:border-[#22C55E]/30 hover:bg-[#22C55E]/[0.05] transition-all duration-300" aria-label="Share on WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a href="https://twitter.com/intent/tweet?text=Check%20out%20Edible%20Engineering%20Workshop%20by%20Alcovia%20-%20Architecting%20the%20Next%20Superfood!" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#9ca3af] hover:text-[#22C55E] hover:border-[#22C55E]/30 hover:bg-[#22C55E]/[0.05] transition-all duration-300" aria-label="Share on X">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/alcovia.life/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#9ca3af] hover:text-[#22C55E] hover:border-[#22C55E]/30 hover:bg-[#22C55E]/[0.05] transition-all duration-300" aria-label="Follow on Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>

          <BackToTopButton />
        </div>
      </div>

      {showCallback && <CallbackModal onClose={() => setShowCallback(false)} />}
    </section>
  );
}
