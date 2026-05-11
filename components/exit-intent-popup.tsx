"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { X, Loader2, CheckCircle } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"

const WEBHOOK_URL = "https://n8n.alcovia.life/webhook/lead-form"
const SESSION_KEY = "alcovia_exit_popup_shown"
const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : undefined
}

function getTrafficSource(): string {
  if (typeof document === "undefined") return "unknown"
  const ref = document.referrer
  if (!ref) return "direct"
  try {
    const hostname = new URL(ref).hostname.replace("www.", "").replace("l.", "").replace("lm.", "")
    const sources: Record<string, string> = {
      "instagram.com": "instagram", "facebook.com": "facebook", "fb.com": "facebook",
      "google.com": "google", "google.co.in": "google", "whatsapp.com": "whatsapp",
    }
    return sources[hostname] || hostname
  } catch {
    return ref
  }
}

export default function ExitIntentPopup() {
  const pathname = usePathname()
  const { isOpen: regModalOpen } = useRegistrationModal()
  const [visible, setVisible] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const readyRef = useRef(false)
  const shownRef = useRef(false)

  const skipPages = pathname === "/brochure" || pathname.startsWith("/workshop") || pathname.startsWith("/neuromarketing-workshop")

  const showPopup = useCallback(() => {
    if (shownRef.current || skipPages || regModalOpen) return
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return
    shownRef.current = true
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(SESSION_KEY, "1")
    setVisible(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimateIn(true)))
  }, [skipPages, regModalOpen])

  useEffect(() => {
    if (skipPages) return

    const armTimer = setTimeout(() => { readyRef.current = true }, 5000)

    const handleMouseLeave = (e: MouseEvent) => {
      if (!readyRef.current) return
      if (e.clientY <= 0) showPopup()
    }

    let inactivityTimer: ReturnType<typeof setTimeout>
    const resetInactivity = () => {
      clearTimeout(inactivityTimer)
      if (readyRef.current) {
        inactivityTimer = setTimeout(showPopup, 45000)
      }
    }

    document.addEventListener("mouseout", handleMouseLeave)
    document.addEventListener("touchstart", resetInactivity, { passive: true })
    document.addEventListener("scroll", resetInactivity, { passive: true })
    resetInactivity()

    return () => {
      clearTimeout(armTimer)
      clearTimeout(inactivityTimer)
      document.removeEventListener("mouseout", handleMouseLeave)
      document.removeEventListener("touchstart", resetInactivity)
      document.removeEventListener("scroll", resetInactivity)
    }
  }, [showPopup, skipPages])

  const close = () => {
    setAnimateIn(false)
    setTimeout(() => setVisible(false), 250)
  }

  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, "")
    if (digits.startsWith("91") && digits.length > 10) return `+${digits}`
    return `+91${digits}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError("Please enter your name."); return }
    const phoneDigits = phone.replace(/\D/g, "")
    if (phoneDigits.length < 10) { setError("Please enter a valid 10-digit number."); return }

    setSubmitting(true)
    setError("")

    const searchParams = new URLSearchParams(window.location.search)
    const payload = {
      parent_name: name.trim(),
      student_name: name.trim(),
      phone: formatPhone(phone),
      school: "",
      grade: "",
      person_type: "",
      city: "",
      email: email.trim() || undefined,
      whatsapp_optin: true,
      ad_id: searchParams.get("ad_id") || undefined,
      traffic_source: getTrafficSource(),
      referrer_raw: document.referrer || "direct",
      landing_page: window.location.pathname,
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
      form_open_source: "exit_intent_brochure",
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)

      if (typeof window !== "undefined") {
        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
        if (typeof gtag === "function") {
          gtag("event", "generate_lead", {
            cta_text: "Download Brochure",
            cta_source: "exit_intent_brochure",
            page_path: window.location.pathname,
          })
        }
      }

      const eventId = crypto.randomUUID()
      if (typeof (window as any).fbq === "function") {
        ;(window as any).fbq("track", "Lead", {
          content_name: "Brochure Download",
          content_category: "exit_intent_brochure",
        }, { eventID: eventId })
      }

      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "Lead",
          event_id: eventId,
          phone: formatPhone(phone),
          email: email.trim() || undefined,
          source_url: window.location.href,
          client_user_agent: navigator.userAgent,
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        }),
      }).catch(() => {})

      fetch("https://n8n.alcovia.life/webhook/brochure-deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: formatPhone(phone),
          email: email.trim() || undefined,
        }),
      }).catch(() => {})

      setTimeout(() => close(), 4000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible) return null

  const inputClass = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
  const labelClass = "block text-[11px] font-medium text-white/50 mb-1"

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center"
      style={{ opacity: animateIn ? 1 : 0, transition: "opacity 250ms ease" }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-[380px] mx-4 rounded-2xl border border-white/10 bg-[#0a2e23] shadow-2xl overflow-hidden"
        style={{
          transform: animateIn ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          opacity: animateIn ? 1 : 0,
          transition: "transform 300ms cubic-bezier(0.22,1,0.36,1), opacity 250ms ease",
        }}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <CheckCircle className="h-12 w-12 text-[#EABF36] mb-4" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-white mb-1.5">
              Your brochure is ready!
            </h3>
            <p className="text-xs text-white/50 mb-5">
              We&apos;ll also send it to your WhatsApp &amp; email shortly.
            </p>
            <div className="flex gap-3 w-full">
              <a
                href="/Alcovia_Brochure.pdf"
                download="Alcovia_Brochure.pdf"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: GOLD_GRADIENT }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download PDF
              </a>
              <a
                href="/brochure"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-wider text-white border border-white/20 transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                View Online
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="px-5 pt-5 pb-3 sm:px-6 sm:pt-6">
              <div className="mb-4 text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#EABF36]/10 mb-3">
                  <svg className="h-5 w-5 text-[#EABF36]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-white mb-0.5">
                  Download Our Free Brochure
                </h2>
                <p className="text-[11px] text-white/40">
                  Learn about India's first ambition-building programme for teens
                </p>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className={labelClass}>
                    Your Name <span className="text-[#EABF36]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError("") }}
                    placeholder="Full name"
                    className={inputClass}
                    autoFocus
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    WhatsApp Number <span className="text-[#EABF36]">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-2.5 text-sm text-white/50">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError("") }}
                      placeholder="10-digit number"
                      className={"flex-1 " + inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Email <span className="text-white/20">(for brochure delivery)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError("") }}
                    placeholder="email@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="px-5 pb-4 pt-1 sm:px-6 sm:pb-5 border-t border-white/5">
              {error && (
                <p className="mb-2 text-xs text-red-400 text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                style={{ background: GOLD_GRADIENT }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Get Free Brochure
                  </>
                )}
              </button>
              <p className="mt-2 text-[9px] text-white/25 text-center leading-relaxed">
                By submitting, you agree to receive updates from Alcovia via WhatsApp. Opt out anytime.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
