"use client"

import { useEffect } from "react"

export function HeroParallax() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-hero-section]")
    if (!section) return
    let ticking = false

    function update() {
      if (!section) return
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 0) { ticking = false; return }
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height))
      const img = section.querySelector<HTMLElement>("[data-hero-img]")
      const overlay = section.querySelector<HTMLElement>("[data-hero-overlay]")
      const content = section.querySelector<HTMLElement>("[data-hero-content]")
      if (img) img.style.transform = `scale(${1 + progress * 0.15})`
      if (overlay) overlay.style.opacity = `${0.78 + progress * 0.14}`
      if (content) content.style.transform = `translateY(${progress * 80}px)`
      ticking = false
    }

    function onScroll() {
      if (!ticking) { requestAnimationFrame(update); ticking = true }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return null
}
