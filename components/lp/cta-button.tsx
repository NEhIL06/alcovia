"use client"

import { ArrowUpRight } from "lucide-react"
import { useRegistrationModal } from "@/context/registration-modal-context"

const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)"

export function CTAButton({ children, size = "md" }: { children: React.ReactNode; size?: "sm" | "md" | "lg" }) {
  const { openModal } = useRegistrationModal()
  const sizes = { sm: "px-5 py-2 text-[11px]", md: "px-8 py-4 text-sm", lg: "px-10 py-5 text-sm" }
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
          (window as any).fbq("trackCustom", "CTAClick", { content_name: "lp_cta_button" })
        }
        openModal("lp_cta_button")
      }}
      className={`inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-wider text-[#0C0C0C] cursor-pointer transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(234,191,54,0.3)] ${sizes[size]}`}
      style={{ background: GOLD_GRADIENT }}
    >
      {children}
      <ArrowUpRight className="w-4 h-4" />
    </button>
  )
}
