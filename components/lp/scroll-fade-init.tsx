"use client"

import { useEffect } from "react"

export function ScrollFadeInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "-80px" }
    )
    document.querySelectorAll(".lp-fade-in").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
