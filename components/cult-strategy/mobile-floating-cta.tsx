"use client";

import { useState, useEffect } from "react";

import WorkshopCheckoutLink from "@/components/cult-strategy/workshop-checkout-link";

const ACCENT = "#34D399";

export default function MobileFloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const cta = document.getElementById("cult-cta");
      const footer = document.querySelector("footer");

      const ctaTop = cta ? cta.getBoundingClientRect().top : Infinity;
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;

      const pastHero = scrollY > 200;
      const ctaOrFooterVisible =
        ctaTop < window.innerHeight || footerTop < window.innerHeight;

      setVisible(pastHero && !ctaOrFooterVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-6 pointer-events-none transition-all duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
      aria-hidden={!visible}
    >
      <WorkshopCheckoutLink
        ctaSource="mobile_floating"
        className="pointer-events-auto inline-flex items-center gap-3 text-black font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm px-8 py-4 rounded-full font-semibold w-full max-w-md justify-center"
        style={{
          background: ACCENT,
          boxShadow: `0 4px 24px rgba(52,211,153,0.45)`,
        }}
      >
        Secure My Spot
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-4 h-4 shrink-0"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </WorkshopCheckoutLink>
    </div>
  );
}
