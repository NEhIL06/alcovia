"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const ACCENT = "#22C55E"
const ACCENT_DIM = "rgba(34,197,94,"

const GRADE_OPTIONS = ["6th", "7th", "8th", "9th", "10th"]

export interface WorkshopCheckoutFormData {
  parent_name: string
  parent_phone: string
  student_name: string
  grade: string
  school: string
  whatsapp_optin: boolean
}

interface Props {
  open: boolean
  submitting: boolean
  error: string | null
  onClose: () => void
  onSubmit: (data: WorkshopCheckoutFormData) => void
}

const EMPTY_FORM: WorkshopCheckoutFormData = {
  parent_name: "",
  parent_phone: "",
  student_name: "",
  grade: "",
  school: "",
  whatsapp_optin: true,
}

export default function WorkshopCheckoutForm({ open, submitting, error, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<WorkshopCheckoutFormData>(EMPTY_FORM)
  const [localError, setLocalError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open && firstInputRef.current) {
      const timer = window.setTimeout(() => firstInputRef.current?.focus(), 80)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => {
        setForm(EMPTY_FORM)
        setLocalError(null)
      }, 220)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  const updateField = useCallback(
    <K extends keyof WorkshopCheckoutFormData>(key: K, value: WorkshopCheckoutFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }))
      setLocalError(null)
    },
    []
  )

  const validate = (data: WorkshopCheckoutFormData): string | null => {
    if (!data.parent_name.trim()) return "Please enter the parent or guardian's name."
    if (!data.student_name.trim()) return "Please enter the student's name."
    const phone = data.parent_phone.replace(/\D/g, "")
    if (phone.length !== 10) return "Please enter a valid 10-digit WhatsApp number."
    if (!data.grade) return "Please select the student's grade."
    if (!data.school.trim()) return "Please enter the school name."
    return null
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const problem = validate(form)
    if (problem) {
      setLocalError(problem)
      return
    }
    onSubmit({
      ...form,
      parent_name: form.parent_name.trim(),
      student_name: form.student_name.trim(),
      school: form.school.trim(),
      parent_phone: form.parent_phone.replace(/\D/g, "").slice(0, 10),
    })
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (submitting) return
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  if (!open) return null

  const displayError = error ?? localError
  const inputBase =
    "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#22C55E]/60 focus:bg-white/[0.07]"

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workshop-checkout-form-title"
      onClick={handleBackdropClick}
      style={{ animation: "workshopFormFadeIn 200ms ease-out" }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        className="relative w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#0b0b0c] shadow-2xl"
        style={{
          animation: "workshopFormScaleIn 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: `0 30px 80px -20px ${ACCENT_DIM}0.25), 0 0 0 1px rgba(255,255,255,0.04) inset`,
        }}
      >
        <style jsx>{`
          @keyframes workshopFormFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes workshopFormScaleIn {
            from { opacity: 0; transform: translateY(16px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col px-5 pt-6 pb-5 sm:px-7 sm:pt-8 sm:pb-7">
          <div className="mb-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-px w-6" style={{ background: ACCENT }} />
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
                style={{ color: ACCENT }}
              >
                Final Step
              </span>
              <span className="h-px w-6" style={{ background: ACCENT }} />
            </div>
            <h2
              id="workshop-checkout-form-title"
              className="font-[family-name:var(--font-milan)] text-2xl sm:text-[1.65rem] leading-tight text-white"
            >
              Reserve Your Seat
            </h2>
            <p className="mt-1.5 text-xs text-white/45 font-[family-name:var(--font-satoshi)]">
              We need these details before you pay. Takes 30 seconds.
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="wcf-parent-name" className="block text-[11px] font-medium text-white/55 mb-1">
                  Parent / Guardian <span style={{ color: ACCENT }}>*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="wcf-parent-name"
                  type="text"
                  autoComplete="name"
                  value={form.parent_name}
                  onChange={(event) => updateField("parent_name", event.target.value)}
                  placeholder="Full name"
                  className={inputBase}
                  disabled={submitting}
                />
              </div>
              <div>
                <label htmlFor="wcf-student-name" className="block text-[11px] font-medium text-white/55 mb-1">
                  Student Name <span style={{ color: ACCENT }}>*</span>
                </label>
                <input
                  id="wcf-student-name"
                  type="text"
                  value={form.student_name}
                  onChange={(event) => updateField("student_name", event.target.value)}
                  placeholder="Student's name"
                  className={inputBase}
                  disabled={submitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="wcf-phone" className="block text-[11px] font-medium text-white/55 mb-1">
                Parent&apos;s WhatsApp <span style={{ color: ACCENT }}>*</span>
              </label>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2.5 text-sm text-white/55">
                  +91
                </span>
                <input
                  id="wcf-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={form.parent_phone}
                  onChange={(event) =>
                    updateField("parent_phone", event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit number"
                  className={`flex-1 ${inputBase}`}
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="wcf-grade" className="block text-[11px] font-medium text-white/55 mb-1">
                  Grade <span style={{ color: ACCENT }}>*</span>
                </label>
                <select
                  id="wcf-grade"
                  value={form.grade}
                  onChange={(event) => updateField("grade", event.target.value)}
                  className={`${inputBase} appearance-none pr-8`}
                  disabled={submitting}
                >
                  <option value="" disabled className="bg-[#0b0b0c] text-white/40">
                    Select grade
                  </option>
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g} className="bg-[#0b0b0c] text-white">
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="wcf-school" className="block text-[11px] font-medium text-white/55 mb-1">
                  School <span style={{ color: ACCENT }}>*</span>
                </label>
                <input
                  id="wcf-school"
                  type="text"
                  value={form.school}
                  onChange={(event) => updateField("school", event.target.value)}
                  placeholder="School name"
                  className={inputBase}
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2 cursor-pointer group mt-1">
            <input
              type="checkbox"
              checked={form.whatsapp_optin}
              onChange={(event) => updateField("whatsapp_optin", event.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-[#22C55E] accent-[#22C55E] focus:ring-[#22C55E]/50 flex-shrink-0"
            />
            <span className="text-[10px] text-white/40 leading-relaxed group-hover:text-white/50 transition-colors">
              I agree to receive promotional messages and updates from Expargent India Private Limited via WhatsApp. You can opt out at any time by replying STOP.
            </span>
          </label>

          {displayError && (
            <p className="mt-3 text-xs text-red-400 text-center" role="alert">
              {displayError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            style={{
              background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
              boxShadow: `0 4px 24px ${ACCENT_DIM}0.35)`,
              fontFamily: "var(--font-monument)",
            }}
          >
            {submitting ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 animate-spin">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Redirecting to Payment
              </>
            ) : (
              <>
                Continue to Payment
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[10px] text-white/35 font-[family-name:var(--font-satoshi)]">
            ₹3,999 · Secured by Razorpay
          </p>
        </form>
      </div>
    </div>
  )
}
