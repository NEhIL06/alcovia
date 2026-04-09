"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

const SmoothScrollProvider = dynamic(() => import("@/components/smooth-scroll-provider"), { ssr: false })
const PremiumNavbar = dynamic(() => import("@/components/premium-navbar"))
const PageTransition = dynamic(() => import("@/components/PageTransition"))
const RegistrationModal = dynamic(() => import("@/components/registration-modal"), { ssr: false })

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLP = pathname.startsWith("/lp")

  if (isLP) {
    return (
      <>
        {children}
        <RegistrationModal />
      </>
    )
  }

  return (
    <SmoothScrollProvider>
      <PremiumNavbar />
      <PageTransition>
        {children}
      </PageTransition>
      <RegistrationModal />
    </SmoothScrollProvider>
  )
}
