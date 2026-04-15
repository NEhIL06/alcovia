"use client"

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"

import { useWorkshopCheckout } from "@/context/workshop-checkout-context"
import { getWorkshopPaymentUrl, type WorkshopCtaSource } from "@/lib/workshop-tracking"

interface WorkshopCheckoutLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  children: ReactNode
  ctaSource: WorkshopCtaSource
}

export default function WorkshopCheckoutLink({
  children,
  ctaSource,
  ...anchorProps
}: WorkshopCheckoutLinkProps) {
  const { open } = useWorkshopCheckout()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    open(ctaSource)
  }

  return (
    <a
      {...anchorProps}
      data-workshop-cta={ctaSource}
      href={getWorkshopPaymentUrl()}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
