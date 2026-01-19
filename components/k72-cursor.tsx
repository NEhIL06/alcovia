"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function K72Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isLarge, setIsLarge] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        // Check for touch device - don't render cursor
        if ('ontouchstart' in window) {
            cursor.style.display = 'none'
            return
        }

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" })
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" })

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX)
            yTo(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            // Check for text elements
            const isText = ["P", "H1", "H2", "H3", "H4", "SPAN", "A", "LI", "BUTTON"].includes(target.tagName)

            // Check for team name hover (data-cursor="large")
            const isTeamName = target.closest("[data-cursor='large']")

            setIsHovering(isText || !!isTeamName)
            setIsLarge(!!isTeamName)
        }

        const handleMouseOut = () => {
            setIsHovering(false)
            setIsLarge(false)
        }

        window.addEventListener("mousemove", moveCursor)
        document.addEventListener("mouseover", handleMouseOver)
        document.addEventListener("mouseout", handleMouseOut)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            document.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseout", handleMouseOut)
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
            style={{
                width: isLarge ? "100px" : isHovering ? "30px" : "10px",
                height: isLarge ? "100px" : isHovering ? "30px" : "10px",
                transform: "translate(-50%, -50%)",
                transition: "width 0.3s ease-out, height 0.3s ease-out",
            }}
        />
    )
}
