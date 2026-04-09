import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Oswald, Inter, Space_Grotesk } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import { SessionProvider } from "@/context/session-context"
import { RegistrationModalProvider } from "@/context/registration-modal-context"
import LayoutShell from "@/components/layout-shell"
import ClarityAnalytics from "@/components/clarity-analytics"

import "./globals.css"

import localFont from "next/font/local"

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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T46NRQ65FV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T46NRQ65FV');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1606881963979917');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
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
        <ClarityAnalytics />
        <SessionProvider>
          <RegistrationModalProvider>
            <SmoothScrollProvider>
              <LayoutShell>
                {children}
              </LayoutShell>
            </SmoothScrollProvider>
          </RegistrationModalProvider>
        </SessionProvider>

      </body>
    </html>
  )
}

