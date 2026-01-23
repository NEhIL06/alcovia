import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display, Oswald, Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import { SessionProvider } from "@/context/session-context"
import PremiumNavbar from "@/components/premium-navbar"
import PageTransition from "@/components/PageTransition"

import "./globals.css"

import localFont from "next/font/local"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-monument",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
})

const milan = localFont({
  src: "../public/fonts/GCMilanHeadlineDemo-ExLtSubhe.ttf",
  variable: "--font-milan",
  display: "swap",
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
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KK8D28BG');`,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${milan.variable} ${oswald.variable} ${inter.variable} font-sans antialiased overflow-x-hidden bg-[#08261e] text-[#F7F7F3]`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KK8D28BG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        <SessionProvider>
          <SmoothScrollProvider>
            <PremiumNavbar />
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScrollProvider>
        </SessionProvider>

      </body>
    </html>
  )
}

