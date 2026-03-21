"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#C77DFF";

export default function MobileFloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const cta = document.getElementById("neuro-cta");
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
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://rzp.io/rzp/neuromarketingalcovia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[#08261e] font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm px-8 py-4 rounded-full font-semibold w-full max-w-md justify-center"
            style={{
              background: ACCENT,
              boxShadow: "0 4px 24px rgba(199,125,255,0.5)",
            }}
          >
            Claim Your Seat
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4 shrink-0"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
