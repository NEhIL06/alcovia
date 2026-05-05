"use client"

import { useEffect } from "react"

const CLARITY_ID = "vy2qj0kssf"

export default function DeferredScripts() {
  useEffect(() => {
    let loaded = false

    const loadScripts = () => {
      if (loaded) return
      loaded = true

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
