"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Loader2 } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"
import { useLenis } from "@/components/smooth-scroll-provider"

const GRADE_OPTIONS = [
  "6th", "7th", "8th", "9th", "10th", "11th", "12th",
]

const CITY_OPTIONS = [
  "Gurgaon",
  "New Delhi",
  "Noida",
  "Faridabad",
  "Ghaziabad",
  "Greater Noida",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Kochi",
  "Other",
]

const PERSON_OPTIONS = ["Student", "Parent"]

const WEBHOOK_URL = "https://n8n.alcovia.life/webhook/lead-form"

const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"

interface FormData {
  student_name: string
  parent_name: string
  phone: string
  school: string
  grade: string
  person_type: string
  city: string
  email: string
  whatsapp_optin: boolean
}

function getAdIdFromUrl(): string {
  if (typeof window === "undefined") return ""
  const params = new URLSearchParams(window.location.search)
  return params.get("ad_id") || ""
}

export default function RegistrationModal() {
  const { isOpen, closeModal } = useRegistrationModal()
  const { lenis } = useLenis()
  const [formData, setFormData] = useState<FormData>({
    student_name: "",
    parent_name: "",
    phone: "",
    school: "",
    grade: "",
    person_type: "",
    city: "",
    email: "",
    whatsapp_optin: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Lock body scroll AND stop Lenis when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
      lenis?.stop()
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      lenis?.start()
    }
  }, [isOpen, lenis])

  // Block scroll events from reaching the page behind the modal
  useEffect(() => {
    if (!isOpen) return
    const overlay = overlayRef.current
    if (!overlay) return

    const blockScroll = (e: Event) => {
      // Allow scrolling inside the modal itself
      const modal = modalRef.current
      if (modal && modal.contains(e.target as Node)) return
      e.preventDefault()
      e.stopPropagation()
    }

    overlay.addEventListener("wheel", blockScroll, { passive: false })
    overlay.addEventListener("touchmove", blockScroll, { passive: false })

    return () => {
      overlay.removeEventListener("wheel", blockScroll)
      overlay.removeEventListener("touchmove", blockScroll)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeModal()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeModal])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          student_name: "",
          parent_name: "",
          phone: "",
          school: "",
          grade: "",
          person_type: "",
          city: "",
          email: "",
          whatsapp_optin: false,
        })
        setSubmitted(false)
        setError("")
      }, 300)
    }
  }, [isOpen])

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, "")
    if (digits.startsWith("91") && digits.length > 10) {
      return `+${digits}`
    }
    return `+91${digits}`
  }

  const validate = (): string | null => {
    if (!formData.student_name.trim()) return "Please enter the student's name."
    if (!formData.parent_name.trim()) return "Please enter the parent/guardian's name."
    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (phoneDigits.length < 10) return "Please enter a valid 10-digit phone number."
    if (!formData.school.trim()) return "Please enter the school name."
    if (!formData.grade) return "Please select a grade."
    if (!formData.person_type) return "Please select whether you are a student or parent."
    if (!formData.city) return "Please select your city."
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    setError("")

    const payload = {
      student_name: formData.student_name.trim(),
      parent_name: formData.parent_name.trim(),
      phone: formatPhone(formData.phone),
      school: formData.school.trim(),
      grade: formData.grade,
      person_type: formData.person_type,
      city: formData.city,
      email: formData.email.trim() || undefined,
      whatsapp_optin: formData.whatsapp_optin,
      ad_id: getAdIdFromUrl() || undefined,
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Submission failed")
      setSubmitted(true)

      // Fire Meta Pixel Lead event
      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead", {
          content_name: "Alcovia Registration",
          content_category: "lead_form",
        })
      }

      // Auto-close after 4 seconds
      setTimeout(() => {
        closeModal()
      }, 4000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal()
    }
  }

  const inputClass = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
  const selectClass = "w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
  const labelClass = "block text-[11px] font-medium text-white/50 mb-1"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto overscroll-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-[420px] my-2 sm:my-4 mx-4 rounded-2xl border border-white/10 bg-[#0a2e23] shadow-2xl flex flex-col"
            style={{ maxHeight: "calc(100vh - 16px)", maxHeight: "calc(100dvh - 16px)" }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="h-14 w-14 text-[#EABF36] mb-5" />
                </motion.div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-2">
                  You're In!
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                  Thank you for your interest in Alcovia. A representative will be in touch with you within 24 hours.
                </p>
              </div>
            ) : (
              /* Form - scrollable content */
              <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                <div className="overflow-y-auto overscroll-contain flex-1 px-5 pt-5 pb-2 sm:px-6 sm:pt-6">
                  {/* Header */}
                  <div className="mb-4 text-center">
                    <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-0.5">
                      Join Alcovia
                    </h2>
                    <p className="text-[11px] text-white/40">
                      Begin your ambition-building journey
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {/* Row 1: Student Name + Parent Name side by side */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className={labelClass}>
                          Student Name <span className="text-[#EABF36]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.student_name}
                          onChange={(e) => handleChange("student_name", e.target.value)}
                          placeholder="Student's name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Parent/Guardian <span className="text-[#EABF36]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.parent_name}
                          onChange={(e) => handleChange("parent_name", e.target.value)}
                          placeholder="Parent's name"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className={labelClass}>
                        Parent/Guardian's WhatsApp <span className="text-[#EABF36]">*</span>
                      </label>
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-sm text-white/50">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="10-digit number"
                          className={"flex-1 " + inputClass}
                        />
                      </div>
                    </div>

                    {/* School Name */}
                    <div>
                      <label className={labelClass}>
                        School Name <span className="text-[#EABF36]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.school}
                        onChange={(e) => handleChange("school", e.target.value)}
                        placeholder="School name"
                        className={inputClass}
                      />
                    </div>

                    {/* I am a - Radio cards with icons */}
                    <div>
                      <label className={labelClass}>
                        I am a <span className="text-[#EABF36]">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {PERSON_OPTIONS.map((option) => {
                          const isSelected = formData.person_type === option
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleChange("person_type", option)}
                              className={`relative flex items-center gap-2.5 rounded-lg border-2 px-3 py-2.5 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-[#EABF36] bg-[#EABF36]/10"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                              }`}
                            >
                              {/* Radio dot */}
                              <span className={`flex h-4 w-4 items-center justify-center rounded-full border-2 flex-shrink-0 transition-all duration-200 ${
                                isSelected ? "border-[#EABF36]" : "border-white/25"
                              }`}>
                                {isSelected && (
                                  <span className="h-2 w-2 rounded-full bg-[#EABF36]" />
                                )}
                              </span>
                              {/* Icon + Label */}
                              <div className="flex items-center gap-1.5">
                                <svg className={`h-4 w-4 flex-shrink-0 transition-colors duration-200 ${isSelected ? "text-[#EABF36]" : "text-white/30"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  {option === "Student" ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                  )}
                                </svg>
                                <span className={`text-sm font-medium transition-colors duration-200 ${isSelected ? "text-[#EABF36]" : "text-white/50"}`}>
                                  {option}
                                </span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Row: Grade + City */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className={labelClass}>
                          Grade <span className="text-[#EABF36]">*</span>
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) => handleChange("grade", e.target.value)}
                          className={selectClass}
                        >
                          <option value="" disabled className="bg-[#0a2e23] text-white/40">Select</option>
                          {GRADE_OPTIONS.map((g) => (
                            <option key={g} value={g} className="bg-[#0a2e23] text-white">{g}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>
                          City <span className="text-[#EABF36]">*</span>
                        </label>
                        <select
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          className={selectClass}
                        >
                          <option value="" disabled className="bg-[#0a2e23] text-white/40">Select</option>
                          {CITY_OPTIONS.map((c) => (
                            <option key={c} value={c} className="bg-[#0a2e23] text-white">{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label className={labelClass}>
                        Email <span className="text-white/20">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="email@example.com"
                        className={inputClass}
                      />
                    </div>

                    {/* WhatsApp Opt-in */}
                    <label className="flex items-start gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.whatsapp_optin}
                        onChange={(e) => handleChange("whatsapp_optin", e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-[#EABF36] accent-[#EABF36] focus:ring-[#EABF36]/50 flex-shrink-0"
                      />
                      <span className="text-[10px] text-white/40 leading-relaxed group-hover:text-white/50 transition-colors">
                        I agree to receive promotional messages and updates from Expargent India Private Limited via WhatsApp. You can opt out at any time by replying STOP.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Sticky footer: error + submit button */}
                <div className="px-5 pb-4 pt-2 sm:px-6 sm:pb-5 flex-shrink-0 border-t border-white/5">
                  {/* Error message */}
                  {error && (
                    <motion.p
                      className="mb-2 text-xs text-red-400 text-center"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                    style={{ background: GOLD_GRADIENT }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
