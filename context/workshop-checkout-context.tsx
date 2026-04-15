"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import WorkshopCheckoutForm, { type WorkshopCheckoutFormData } from "@/components/cult-strategy/workshop-checkout-form"
import {
  beginWorkshopCheckout,
  submitWorkshopCheckoutLead,
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
