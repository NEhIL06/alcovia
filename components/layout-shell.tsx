"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

import { useRegistrationModal } from "@/context/registration-modal-context"
import PremiumNavbar from "@/components/premium-navbar"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import PageTransition from "@/components/PageTransition"

const RegistrationModal = dynamic(() => import("@/components/registration-modal"), { ssr: false })
const ExitIntentPopup = dynamic(() => import("@/components/exit-intent-popup"), { ssr: false })

function LazyRegistrationModal() {
  const { isOpen } = useRegistrationModal()
  if (!isOpen) return null
  return <RegistrationModal />
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLP = pathname.startsWith("/lp")
  const isWorkshop =
    pathname.startsWith("/workshop") ||
    pathname.startsWith("/neuromarketing-workshop")

  if (isLP) {
    return (
      <>
        {children}
        <LazyRegistrationModal />
        <ExitIntentPopup />
      </>
    )
  }

  if (isWorkshop) {
    return (
      <>
        {children}
        <LazyRegistrationModal />
        <ExitIntentPopup />
      </>
    )
  }

  return (
    <SmoothScrollProvider>
      <PremiumNavbar />
      <PageTransition>
        {children}
      </PageTransition>
      <LazyRegistrationModal />
      <ExitIntentPopup />
    </SmoothScrollProvider>
  )
}
