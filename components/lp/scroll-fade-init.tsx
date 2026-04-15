"use client"

import { useEffect } from "react"

export function ScrollFadeInit() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px 400px 0px" }
    )

    document.querySelectorAll(".lp-fade-in").forEach(el => observer.observe(el))

    const safety = window.setTimeout(() => {
      document.querySelectorAll(".lp-fade-in:not(.is-visible)").forEach(reveal)
    }, 2500)

    return () => {
      window.clearTimeout(safety)
      observer.disconnect()
    }
  }, [])

  return null
}
