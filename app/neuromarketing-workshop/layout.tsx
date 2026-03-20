import type React from "react"
import Script from "next/script"

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
        event_source_url: "https://www.alcovia.life/neuromarketing-workshop",
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
        // Fire-and-forget; don't block page render on failure
        signal: AbortSignal.timeout(3000),
      }
    )
  } catch {
    // Silently fail — pixel client-side is still active as fallback
  }
}

export default async function NeuromarketingWorkshopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await sendMetaCAPIPageView()

  return (
    <>
      {/* Microsoft Clarity — Neuromarketing Workshop project */}
      <Script id="clarity-neuromarketing" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vyomq18cqq");
        `}
      </Script>
      {children}
    </>
  )
}
