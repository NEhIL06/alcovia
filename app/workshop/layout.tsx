import type React from "react"

import { WorkshopCheckoutProvider } from "@/context/workshop-checkout-context"
import { ScrollFadeInit } from "@/components/lp/scroll-fade-init"
import WorkshopNavbar from "@/components/workshop/workshop-navbar"

// Server-side Meta Conversion API — fires on every page load
async function sendMetaCAPIPageView() {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  const pixelId = process.env.META_PIXEL_ID
  if (!accessToken || !pixelId) return

  const eventTime = Math.floor(Date.now() / 1000)
  const eventId = crypto.randomUUID()

  const body = JSON.stringify({
    data: [
      {
        event_name: "PageView",
        event_time: eventTime,
        event_id: eventId,
        event_source_url: "https://www.alcovia.life/workshop",
        action_source: "website",
      },
    ],
  })

  try {
    await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(3000),
      }
    )
  } catch {
    // Silently fail — pixel client-side is still active as fallback
  }
}

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  sendMetaCAPIPageView().catch(() => {})

  return (
    <>
      <link rel="preconnect" href="https://checkout.razorpay.com" />
      <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      <WorkshopCheckoutProvider>
        <ScrollFadeInit />
        <WorkshopNavbar />
        {children}
      </WorkshopCheckoutProvider>
    </>
  )
}
