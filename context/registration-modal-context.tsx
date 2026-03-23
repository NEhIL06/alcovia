"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface RegistrationModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const RegistrationModalContext = createContext<RegistrationModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export function RegistrationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <RegistrationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </RegistrationModalContext.Provider>
  )
}

export function useRegistrationModal() {
  return useContext(RegistrationModalContext)
}
