"use client"

import { useEffect } from "react"

const GTM_ID = "G-T46NRQ65FV"
const FB_PIXEL_ID = "1606881963979917"
const CLARITY_ID = "vy2qj0kssf"

declare global {
  interface Window {
    fbq?: any
    _fbq?: any
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export default function DeferredScripts() {
  useEffect(() => {
    if (!window.fbq) {
      const fbq: any = function (...args: any[]) {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, args)
        else fbq.queue.push(args)
      }
      fbq.queue = []
      fbq.push = fbq
      fbq.loaded = true
      fbq.version = "2.0"
      window.fbq = fbq
      window._fbq = fbq
    }

    if (!window.gtag) {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer!.push(arguments as any)
      }
      window.gtag("js", new Date())
    }

    let loaded = false

    const loadScripts = () => {
      if (loaded) return
      loaded = true

      const ga = document.createElement("script")
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`
      ga.async = true
      document.head.appendChild(ga)
      window.gtag!("config", GTM_ID)

      const fbScript = document.createElement("script")
      fbScript.src = "https://connect.facebook.net/en_US/fbevents.js"
      fbScript.async = true
      document.head.appendChild(fbScript)
      window.fbq("init", FB_PIXEL_ID)
      window.fbq("track", "PageView")

      const clarityScript = document.createElement("script")
      clarityScript.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}")`
      document.head.appendChild(clarityScript)

      cleanup()
    }

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "touchstart",
      "keydown",
      "scroll",
      "mousemove",
    ]

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, loadScripts))
      window.clearTimeout(fallback)
    }

    events.forEach(e =>
      window.addEventListener(e, loadScripts, { once: true, passive: true })
    )

    const fallback = window.setTimeout(loadScripts, 4000)

    return cleanup
  }, [])

  return null
}
