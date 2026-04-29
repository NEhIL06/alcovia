"use client"

import { useEffect } from "react"

import { trackWorkshopEvent, WORKSHOP_DETAILS } from "@/lib/workshop-tracking"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export default function WorkshopPageTracker() {
  useEffect(() => {
    const eventId = `view_${crypto.randomUUID()}`

    window.gtag?.("event", "view_item", {
      currency: WORKSHOP_DETAILS.currency,
      item_category: "Workshop",
      item_name: WORKSHOP_DETAILS.slug,
      value: WORKSHOP_DETAILS.amount,
    })

    window.fbq?.(
      "track",
      "ViewContent",
      {
        content_category: "Workshop",
        content_name: WORKSHOP_DETAILS.title,
        currency: WORKSHOP_DETAILS.currency,
        value: WORKSHOP_DETAILS.amount,
      },
      { eventID: eventId }
    )

    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_user_agent: navigator.userAgent,
        event_id: eventId,
        event_name: "ViewContent",
        fbc: document.cookie.match(/(^| )_fbc=([^;]+)/)?.[2],
        fbp: document.cookie.match(/(^| )_fbp=([^;]+)/)?.[2],
        source_url: window.location.href,
        custom_data: {
          currency: WORKSHOP_DETAILS.currency,
          value: WORKSHOP_DETAILS.amount,
          content_name: WORKSHOP_DETAILS.title,
          content_category: "Workshop",
        },
      }),
    }).catch(() => {})

    trackWorkshopEvent("workshop_page_view", { eventId }).catch(() => {})
  }, [])

  return null
}
