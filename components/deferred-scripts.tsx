"use client"

import { useEffect } from "react"

const GTM_ID = "G-T46NRQ65FV"
const FB_PIXEL_ID = "1606881963979917"
const CLARITY_ID = "vy2qj0kssf"

export default function DeferredScripts() {
  useEffect(() => {
    let loaded = false

    const loadScripts = () => {
      if (loaded) return
      loaded = true

      // Google Analytics
      const gtag = document.createElement("script")
      gtag.async = true
      gtag.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`
      document.head.appendChild(gtag)

      const gtagInit = document.createElement("script")
      gtagInit.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GTM_ID}');`
      document.head.appendChild(gtagInit)

      // Meta Pixel
      const fbScript = document.createElement("script")
      fbScript.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`
      document.head.appendChild(fbScript)

      // Microsoft Clarity
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

    // Safety fallback: load after 4s even without interaction
    const fallback = window.setTimeout(loadScripts, 4000)

    return cleanup
  }, [])

  return null
}
