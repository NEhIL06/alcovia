import type React from "react"
import Script from "next/script"

import { WorkshopCheckoutProvider } from "@/context/workshop-checkout-context"
import { ScrollFadeInit } from "@/components/lp/scroll-fade-init"
import WorkshopNavbar from "@/components/workshop/workshop-navbar"

const FB_PIXEL_ID = "1606881963979917"

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
    <WorkshopCheckoutProvider>
      <Script id="fb-pixel-workshop" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <ScrollFadeInit />
      <WorkshopNavbar />
      {children}
    </WorkshopCheckoutProvider>
  )
}
