"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface SessionContextType {
    hasShownLoader: boolean
    setLoaderShown: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

const SESSION_STORAGE_KEY = "alcovia_loader_shown"

export function SessionProvider({ children }: { children: ReactNode }) {
    const [hasShownLoader, setHasShownLoader] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        // Check sessionStorage on mount
        const stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
        if (stored === "true") {
            setHasShownLoader(true)
        }
        setIsHydrated(true)
    }, [])

    const setLoaderShown = () => {
        setHasShownLoader(true)
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true")
    }

    // Don't render children until hydrated to prevent flash
    if (!isHydrated) {
        return null
    }

    return (
        <SessionContext.Provider value={{ hasShownLoader, setLoaderShown }}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    const context = useContext(SessionContext)
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return context
}
