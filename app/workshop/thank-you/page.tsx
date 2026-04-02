"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import Footer from "@/components/footer"
import {
  clearWorkshopCheckoutContext,
  hasPurchaseBeenTracked,
  markPurchaseTracked,
  parseRazorpayResult,
  readWorkshopCheckoutContext,
  trackWorkshopEvent,
  WORKSHOP_DETAILS,
} from "@/lib/workshop-tracking"

const ACCENT = "#FF6B2B"
const ACCENT_DIM = "rgba(255,107,43,"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export default function WorkshopThankYouPage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentReference, setPaymentReference] = useState<string | null>(null)

  const fallbackReference = useMemo(() => `alcovia-${Date.now()}`, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const razorpayResult = parseRazorpayResult(searchParams)
    const checkoutContext = readWorkshopCheckoutContext()
    const paymentReferenceId =
      razorpayResult.paymentId ||
      razorpayResult.orderId ||
      checkoutContext?.checkout_attempt_id ||
      fallbackReference

    setIsSuccess(razorpayResult.success)
    setPaymentReference(razorpayResult.paymentId || razorpayResult.orderId || null)

    trackWorkshopEvent("workshop_thank_you_view").catch(() => {})

    if (!razorpayResult.success || hasPurchaseBeenTracked(paymentReferenceId)) {
      return
    }

    const purchaseEventId = `purchase_${paymentReferenceId}`
    markPurchaseTracked(paymentReferenceId)

    window.gtag?.("event", "purchase", {
      currency: WORKSHOP_DETAILS.currency,
      transaction_id: razorpayResult.paymentId || razorpayResult.orderId || paymentReferenceId,
      value: WORKSHOP_DETAILS.amount,
      items: [
        {
          item_name: WORKSHOP_DETAILS.title,
          item_category: "Workshop",
        },
      ],
    })

    window.fbq?.(
      "track",
      "Purchase",
      {
        content_category: "Workshop",
        content_name: WORKSHOP_DETAILS.title,
        currency: WORKSHOP_DETAILS.currency,
        value: WORKSHOP_DETAILS.amount,
      },
      { eventID: purchaseEventId }
    )

    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_user_agent: navigator.userAgent,
        event_id: purchaseEventId,
        event_name: "Purchase",
        fbc: checkoutContext?.fbc,
        fbp: checkoutContext?.fbp,
        source_url: window.location.href,
      }),
    }).catch(() => {})

    fetch("/api/workshop-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(checkoutContext || {}),
        amount: WORKSHOP_DETAILS.amount,
        currency: WORKSHOP_DETAILS.currency,
        event_id: purchaseEventId,
        event_name: "workshop_payment_success",
        order_id: razorpayResult.orderId,
        payment_id: razorpayResult.paymentId,
        payment_signature: razorpayResult.signature,
        payment_status: "paid",
        thank_you_page: window.location.href,
        workshop_date: WORKSHOP_DETAILS.dateIso,
        workshop_title: WORKSHOP_DETAILS.title,
      }),
    }).catch(() => {})

    clearWorkshopCheckoutContext()
  }, [fallbackReference])

  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.04]">
          {Array.from({ length: 18 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute h-full"
              style={{
                left: `${(index * 5.55) % 100}%`,
                width: "1px",
                background: `linear-gradient(180deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: index * 0.04, duration: 1.2, ease: "easeOut" }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${ACCENT_DIM}0.1) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            className="mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            style={{ background: `${ACCENT_DIM}0.12)`, border: `2px solid ${ACCENT}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSuccess ? (
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 sm:w-12 sm:h-12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                />
              </motion.svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth={2}
                className="w-10 h-10 sm:w-12 sm:h-12"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v5" />
                <circle cx="12" cy="16.5" r="1" fill={ACCENT} stroke="none" />
              </svg>
            )}
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
            <span
              className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
              style={{ color: ACCENT }}
            >
              {isSuccess ? "Payment Successful" : "Payment Verification"}
            </span>
            <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
          </motion.div>

          <motion.h1
            className="font-[family-name:var(--font-milan)] text-[clamp(2rem,5vw,4rem)] leading-[0.95] mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="block text-white">
              {isSuccess ? "You’re In." : "We’re Checking Your Payment."}
            </span>
            <span className="block" style={{ color: ACCENT }}>
              {isSuccess ? "Welcome to the Workshop." : "We’ll confirm it shortly."}
            </span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base lg:text-lg text-white/60 font-[family-name:var(--font-satoshi)] max-w-lg mx-auto mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {isSuccess
              ? `Your seat for ${WORKSHOP_DETAILS.title} is confirmed. Keep this page handy while we sync the payment with your backend workflows.`
              : "If your bank has already debited the amount, Razorpay and your backend webhooks will usually reconcile it in a moment. You can safely keep this tab open or contact Alcovia if needed."}
          </motion.p>

          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-8 mb-10 sm:mb-12 px-6 sm:px-10 py-5 rounded-2xl"
            style={{ background: `${ACCENT_DIM}0.06)`, border: `1px solid ${ACCENT_DIM}0.15)` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-4 h-4">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="text-sm text-white/70 font-[family-name:var(--font-satoshi)]">
                {WORKSHOP_DETAILS.dateLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-4 h-4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm text-white/70 font-[family-name:var(--font-satoshi)]">
                {WORKSHOP_DETAILS.locationLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.5} className="w-4 h-4">
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span className="text-sm text-white/70 font-[family-name:var(--font-satoshi)]">
                {paymentReference ? `Ref: ${paymentReference}` : "Reference will sync from Razorpay"}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link
              href="/workshop"
              className="group relative inline-flex items-center gap-3 overflow-hidden"
            >
              <span
                className="relative z-10 inline-flex items-center gap-3 text-[#08261e] font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-500 group-hover:scale-105"
                style={{ background: ACCENT }}
              >
                Back to Workshop
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <a
              href="mailto:info@alcovia.life"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors font-[family-name:var(--font-satoshi)]"
            >
              Need help with the payment?
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
