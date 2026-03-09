"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileFloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("f1-hero");
      const cta = document.getElementById("f1-cta");
      const footer = document.querySelector("footer");

      if (!hero || !cta) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const ctaTop = cta.getBoundingClientRect().top;
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;

      const heroGone = heroBottom < 0;
      const ctaOrFooterVisible = ctaTop < window.innerHeight || footerTop < window.innerHeight;

      setVisible(heroGone && !ctaOrFooterVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-0 right-0 flex justify-center z-50 md:hidden px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://alcovia-workshop.short.gy/f1-workshop"
            target="_self"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#EABF36] text-[#08261e] font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm px-8 py-4 rounded-full font-semibold w-full justify-center"
            style={{ boxShadow: "0 4px 24px rgba(234,191,54,0.5)" }}
          >
            Ready for Boardroom?
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
