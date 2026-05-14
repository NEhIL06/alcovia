"use client"

import { useEffect } from "react"
import { persistUtmParams } from "@/lib/utm"

export default function UtmPersist() {
  useEffect(() => {
    persistUtmParams()
  }, [])
  return null
}
