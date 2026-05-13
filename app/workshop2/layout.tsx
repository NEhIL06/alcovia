import type React from "react"

import { WorkshopCheckoutProvider } from "@/context/workshop-checkout-context"
import { ScrollFadeInit } from "@/components/lp/scroll-fade-init"
import WorkshopNavbar from "@/components/workshop/workshop-navbar"

export const revalidate = 3600

export default function Workshop2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkshopCheckoutProvider>
      <ScrollFadeInit />
      <WorkshopNavbar theme="gold" opacity50 />
      {children}
    </WorkshopCheckoutProvider>
  )
}
