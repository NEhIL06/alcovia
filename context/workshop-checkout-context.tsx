"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import WorkshopCheckoutForm, { type WorkshopCheckoutFormData } from "@/components/cult-strategy/workshop-checkout-form"
import {
  beginWorkshopCheckout,
  submitWorkshopCheckoutLead,
  trackWorkshopEvent,
  WORKSHOP_DETAILS,
  type WorkshopCtaSource,
} from "@/lib/workshop-tracking"

interface WorkshopCheckoutContextValue {
  open: (source: WorkshopCtaSource) => void
}

const WorkshopCheckoutContext = createContext<WorkshopCheckoutContextValue>({
  open: () => {},
})

export function WorkshopCheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [ctaSource, setCtaSource] = useState<WorkshopCtaSource>("unknown")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const open = useCallback((source: WorkshopCtaSource) => {
    setCtaSource(source)
    setError(null)
    setIsOpen(true)

    const eventId = `ic_${crypto.randomUUID()}`
    ;(window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.(
      "track", "InitiateCheckout",
      { content_category: "Workshop", content_name: WORKSHOP_DETAILS.title, currency: "INR", value: WORKSHOP_DETAILS.amount },
      { eventID: eventId }
    )
    trackWorkshopEvent("workshop_initiate_checkout", { ctaSource: source, eventId }).catch(() => {})
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "InitiateCheckout",
        event_id: eventId,
        source_url: window.location.href,
        client_user_agent: navigator.userAgent,
        custom_data: {
          currency: WORKSHOP_DETAILS.currency,
          value: WORKSHOP_DETAILS.amount,
          content_name: WORKSHOP_DETAILS.title,
          content_category: "Workshop",
        },
      }),
      keepalive: true,
    }).catch(() => {})
  }, [])

  const close = useCallback(() => {
    if (submitting) return
    setIsOpen(false)
  }, [submitting])

  const handleSubmit = useCallback(
    async (data: WorkshopCheckoutFormData) => {
      setSubmitting(true)
      setError(null)

      try {
        const { leadId } = await submitWorkshopCheckoutLead(data, ctaSource)

        const leadEventId = `lead_evt_${crypto.randomUUID()}`
        ;(window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.(
          "track", "Lead",
          { content_category: "Workshop", content_name: WORKSHOP_DETAILS.title, currency: "INR", value: WORKSHOP_DETAILS.amount },
          { eventID: leadEventId }
        )
        fetch("/api/meta-capi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: "Lead",
            event_id: leadEventId,
            source_url: window.location.href,
            client_user_agent: navigator.userAgent,
            custom_data: {
              currency: WORKSHOP_DETAILS.currency,
              value: WORKSHOP_DETAILS.amount,
              content_name: WORKSHOP_DETAILS.title,
              content_category: "Workshop",
            },
          }),
          keepalive: true,
        }).catch(() => {})

        await beginWorkshopCheckout(ctaSource, { lead: data, leadId })
      } catch {
        setError("Something went wrong saving your details. Please try again.")
        setSubmitting(false)
      }
    },
    [ctaSource]
  )

  const value = useMemo(() => ({ open }), [open])

  return (
    <WorkshopCheckoutContext.Provider value={value}>
      {children}
      <WorkshopCheckoutForm
        open={isOpen}
        submitting={submitting}
        error={error}
        onClose={close}
        onSubmit={handleSubmit}
      />
    </WorkshopCheckoutContext.Provider>
  )
}

export function useWorkshopCheckout() {
  return useContext(WorkshopCheckoutContext)
}
