"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface Props {
  children: ReactNode
  rootMargin?: string
  fallbackMinHeight?: string
}

/**
 * Renders children only after the wrapping element scrolls within rootMargin
 * of the viewport. Use to defer hydration of below-fold sections so heavy
 * client deps (e.g. framer-motion) don't load during initial page load.
 *
 * Reserves vertical space via fallbackMinHeight to prevent layout shift.
 */
export default function LazySection({
  children,
  rootMargin = "400px 0px",
  fallbackMinHeight,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div
      ref={ref}
      style={!visible && fallbackMinHeight ? { minHeight: fallbackMinHeight } : undefined}
    >
      {visible ? children : null}
    </div>
  )
}
