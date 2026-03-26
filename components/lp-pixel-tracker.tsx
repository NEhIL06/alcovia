"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function LPPixelTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "PageView")
    }
  }, [pathname])

  return null
}
