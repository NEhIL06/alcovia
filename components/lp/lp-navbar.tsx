"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"

const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"

export function LPNavbar() {
  const { openModal } = useRegistrationModal()
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-1 bg-[#08261e]/80 backdrop-blur-lg border-b border-white/5">
      <a href="/" className="flex items-center -my-5">
        <Image src="/alcovia_logo_dark.png" alt="Alcovia" width={160} height={133} className="object-contain h-[100px] w-auto" priority sizes="160px" />
      </a>
      <button onClick={() => {
        if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
          (window as any).fbq("trackCustom", "CTAClick", { content_name: "lp_navbar" })
        }
        openModal("lp_navbar", "Book a Fit Call")
      }} className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer transition-all hover:scale-105" style={{ background: GOLD_GRADIENT }}>
        Book a Fit Call
        <ArrowUpRight className="w-3 h-3" />
      </button>
    </nav>
  )
}
