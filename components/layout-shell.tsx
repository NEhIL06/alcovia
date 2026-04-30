"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

import { useRegistrationModal } from "@/context/registration-modal-context"

const PremiumNavbar = dynamic(() => import("@/components/premium-navbar"))
const SmoothScrollProvider = dynamic(() => import("@/components/smooth-scroll-provider"), { ssr: false })
const PageTransition = dynamic(() => import("@/components/PageTransition"))
const RegistrationModal = dynamic(() => import("@/components/registration-modal"), { ssr: false })

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
      </>
    )
  }

  if (isWorkshop) {
    return (
      <>
        {children}
        <LazyRegistrationModal />
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
    </SmoothScrollProvider>
  )
}
