import type React from "react"
import Script from "next/script"

import { WorkshopCheckoutProvider } from "@/context/workshop-checkout-context"
import { ScrollFadeInit } from "@/components/lp/scroll-fade-init"
import WorkshopNavbar from "@/components/workshop/workshop-navbar"

const FB_PIXEL_ID = "1606881963979917"

export const revalidate = 3600

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkshopCheckoutProvider>
      <Script id="fb-pixel-workshop" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <ScrollFadeInit />
      <WorkshopNavbar />
      {children}
    </WorkshopCheckoutProvider>
  )
}
