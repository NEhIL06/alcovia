"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Loader2 } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"

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
  const [formData, setFormData] = useState<FormData>({
    student_name: "",
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a2e23] shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="h-16 w-16 text-[#EABF36] mb-6" />
                </motion.div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-3">
                  You're In!
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                  Thank you for your interest in Alcovia. A representative will be in touch with you within 24 hours.
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8">
                {/* Header */}
                <div className="mb-6 text-center">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-1">
                    Join Alcovia
                  </h2>
                  <p className="text-xs text-white/40">
                    Begin your ambition-building journey
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Student Name */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      Student Name <span className="text-[#EABF36]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.student_name}
                      onChange={(e) => handleChange("student_name", e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      WhatsApp Number <span className="text-[#EABF36]">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/50">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit number"
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
                      />
                    </div>
                  </div>

                  {/* School Name */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      School Name <span className="text-[#EABF36]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.school}
                      onChange={(e) => handleChange("school", e.target.value)}
                      placeholder="School name"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
                    />
                  </div>

                  {/* Grade & Person Type - Side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">
                        Grade <span className="text-[#EABF36]">*</span>
                      </label>
                      <select
                        value={formData.grade}
                        onChange={(e) => handleChange("grade", e.target.value)}
                        className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
                      >
                        <option value="" disabled className="bg-[#0a2e23] text-white/40">Select</option>
                        {GRADE_OPTIONS.map((g) => (
                          <option key={g} value={g} className="bg-[#0a2e23] text-white">{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">
                        I am a <span className="text-[#EABF36]">*</span>
                      </label>
                      <select
                        value={formData.person_type}
                        onChange={(e) => handleChange("person_type", e.target.value)}
                        className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
                      >
                        <option value="" disabled className="bg-[#0a2e23] text-white/40">Select</option>
                        {PERSON_OPTIONS.map((p) => (
                          <option key={p} value={p} className="bg-[#0a2e23] text-white">{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      City <span className="text-[#EABF36]">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
                    >
                      <option value="" disabled className="bg-[#0a2e23] text-white/40">Select city</option>
                      {CITY_OPTIONS.map((c) => (
                        <option key={c} value={c} className="bg-[#0a2e23] text-white">{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      Email <span className="text-white/20">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="email@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#EABF36]/50 focus:bg-white/[0.07]"
                    />
                  </div>

                  {/* WhatsApp Opt-in */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.whatsapp_optin}
                      onChange={(e) => handleChange("whatsapp_optin", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#EABF36] accent-[#EABF36] focus:ring-[#EABF36]/50"
                    />
                    <span className="text-[11px] text-white/40 leading-relaxed group-hover:text-white/50 transition-colors">
                      I agree to receive promotional messages and updates from Expargent India Private Limited via WhatsApp. You can opt out at any time by replying STOP.
                    </span>
                  </label>
                </div>

                {/* Error message */}
                {error && (
                  <motion.p
                    className="mt-3 text-xs text-red-400 text-center"
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
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
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
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
