import type React from "react"
import { SessionProvider } from "@/context/session-context"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import PageTransition from "@/components/PageTransition"

export default function BrochureLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <SmoothScrollProvider>
        <PageTransition>
          {children}
        </PageTransition>
      </SmoothScrollProvider>
    </SessionProvider>
  )
}
