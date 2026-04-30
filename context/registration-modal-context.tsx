"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface RegistrationModalContextType {
  isOpen: boolean
  formOpenSource: string
  formOpenCtaText: string
  openModal: (source?: string, ctaText?: string) => void
  closeModal: () => void
}

const RegistrationModalContext = createContext<RegistrationModalContextType>({
  isOpen: false,
  formOpenSource: "",
  formOpenCtaText: "",
  openModal: () => {},
  closeModal: () => {},
})

export function RegistrationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formOpenSource, setFormOpenSource] = useState("")
  const [formOpenCtaText, setFormOpenCtaText] = useState("")

  const openModal = useCallback((source?: string, ctaText?: string) => {
    const src = source || "unknown"
    const text = (ctaText && ctaText.trim()) || src
    setFormOpenSource(src)
    setFormOpenCtaText(text)
    setIsOpen(true)

    if (typeof window !== "undefined") {
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
      if (typeof gtag === "function") {
        gtag("event", "cta_click", {
          cta_text: text,
          cta_source: src,
          page_path: window.location.pathname,
        })
      }
    }
  }, [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <RegistrationModalContext.Provider value={{ isOpen, formOpenSource, formOpenCtaText, openModal, closeModal }}>
      {children}
    </RegistrationModalContext.Provider>
  )
}

export function useRegistrationModal() {
  return useContext(RegistrationModalContext)
}
