"use client"

import { useMemo } from "react"

// Seeded random number generator for deterministic values (avoids hydration mismatch)
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

export default function ContourBackground() {
    // Create deterministic values based on index (seed) to avoid hydration mismatch
    const lines = useMemo(() => {
        return [...Array(50)].map((_, i) => ({
            id: i,
            // Use seeded random for deterministic values (same on server and client)
            duration: 20 + seededRandom(i * 1.1) * 20,
            delay: seededRandom(i * 2.2) * -20,
            curve: Math.sin(i) * 5,
            opacity: 0.5 + seededRandom(i * 3.3) * 0.5,
        }))
    }, [])

    return (
        <div className="fixed inset-0 z-[-1] bg-[#08261e] overflow-hidden">
            {/* Define the Keyframes for the "Drift" effect */}
            <style>
                {`
          @keyframes drift {
            0% { transform: translate(0, 0); }
            25% { transform: translate(2%, 1%); }
            50% { transform: translate(-1%, 3%); }
            75% { transform: translate(-2%, 0%); }
            100% { transform: translate(0, 0); }
          }
        `}
            </style>

            <div className="absolute inset-0 opacity-[0.15]">
                <svg
                    className="h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {lines.map((line, i) => (
                        <path
                            key={line.id}
                            // Extended coordinates: -20 to 120 so edges don't show when drifting
                            d={`
                M-20,${20 + i * 2} 
                Q30,${15 + i * 2 + line.curve} 
                60,${20 + i * 2 - line.curve} 
                T120,${20 + i * 2}
              `}
                            fill="none"
                            stroke="#F7F7F3"
                            strokeWidth="0.15"
                            style={{
                                animationName: "drift",
                                animationDuration: `${line.duration}s`,
                                animationDelay: `${line.delay}s`,
                                animationTimingFunction: "ease-in-out",
                                animationIterationCount: "infinite",
                                opacity: line.opacity,
                            }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    )
}
