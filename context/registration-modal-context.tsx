"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface RegistrationModalContextType {
  isOpen: boolean
  formOpenSource: string
  openModal: (source?: string) => void
  closeModal: () => void
}

const RegistrationModalContext = createContext<RegistrationModalContextType>({
  isOpen: false,
  formOpenSource: "",
  openModal: () => {},
  closeModal: () => {},
})

export function RegistrationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formOpenSource, setFormOpenSource] = useState("")

  const openModal = useCallback((source?: string) => {
    setFormOpenSource(source || "unknown")
    setIsOpen(true)
  }, [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <RegistrationModalContext.Provider value={{ isOpen, formOpenSource, openModal, closeModal }}>
      {children}
    </RegistrationModalContext.Provider>
  )
}

export function useRegistrationModal() {
  return useContext(RegistrationModalContext)
}
