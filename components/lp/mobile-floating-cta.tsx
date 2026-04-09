"use client"

import { ArrowUpRight } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"

const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"

export function MobileFloatingCTA() {
  const { openModal } = useRegistrationModal()
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden p-3 bg-gradient-to-t from-[#08261e] via-[#08261e]/95 to-transparent">
      <button onClick={() => {
        if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
          (window as any).fbq("trackCustom", "CTAClick", { content_name: "lp_mobile_floating" })
        }
        openModal("lp_mobile_floating")
      }} className="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer" style={{ background: GOLD_GRADIENT }}>
        Book a Fit Call
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  )
}
