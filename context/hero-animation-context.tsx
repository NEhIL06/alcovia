"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface HeroAnimationContextType {
    isHeroAnimationComplete: boolean
    setHeroAnimationComplete: (value: boolean) => void
}

const HeroAnimationContext = createContext<HeroAnimationContextType>({
    isHeroAnimationComplete: false,
    setHeroAnimationComplete: () => { },
})

export function HeroAnimationProvider({ children }: { children: ReactNode }) {
    const [isHeroAnimationComplete, setHeroAnimationComplete] = useState(false)

    return (
        <HeroAnimationContext.Provider
            value={{ isHeroAnimationComplete, setHeroAnimationComplete }}
        >
            {children}
        </HeroAnimationContext.Provider>
    )
}

export function useHeroAnimation() {
    return useContext(HeroAnimationContext)
}
