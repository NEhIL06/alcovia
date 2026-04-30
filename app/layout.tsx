import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Oswald, Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/context/session-context"
import { RegistrationModalProvider } from "@/context/registration-modal-context"
import LayoutShell from "@/components/layout-shell"
import DeferredScripts from "@/components/deferred-scripts"

import "./globals.css"

import localFont from "next/font/local"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-monument",
  display: "swap",
  preload: false,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  preload: false,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
})

const milan = localFont({
  src: "../public/fonts/GCMilanHeadlineDemo-ExLtSubhe.ttf",
  variable: "--font-milan",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Alcovia life",
  description:
    "Mentoring future builders of tomorrow, today",
  keywords: ["Indian teens", "mentorship", "education", "career discovery", "leadership", "student development"],
  authors: [{ name: "Alcovia" }],
  icons: {
    icon: "/images/alcovia-logo-navbar.png",
    shortcut: "/images/alcovia-logo-navbar.png",
    apple: "/images/alcovia-logo-navbar.png",
  },
  openGraph: {
    title: "Alcovia | Ready to Fly?",
    description: "Mentoring future builders of tomorrow, today",
    type: "website",
    locale: "en_IN",
    images: ["/images/alcovia-logo-navbar.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alcovia | Ready to Fly?",
    description: "Mentoring future builders of tomorrow, today",
    images: ["/images/alcovia-logo-navbar.png"],
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${milan.variable} ${oswald.variable} ${inter.variable} ${spaceGrotesk.variable} font-sans antialiased overflow-x-hidden bg-[#08261e] text-[#F7F7F3]`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1606881963979917&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Analytics />
        <SessionProvider>
          <RegistrationModalProvider>
            <LayoutShell>
              {children}
            </LayoutShell>
          </RegistrationModalProvider>
        </SessionProvider>
        <DeferredScripts />
      </body>
    </html>
  )
}

