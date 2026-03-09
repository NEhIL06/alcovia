"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words =
  "While the world focuses on the drivers and the athletes, the real game is being played in the boardroom.".split(
    " "
  );

export default function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.65"],
  });

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center py-12 sm:py-16 overflow-hidden"
    >
      {/* Subtle spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(234,191,54,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Side accent lines */}
      <motion.div
        className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 w-px h-32 sm:h-48 bg-gradient-to-b from-transparent via-[#EABF36]/20 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 w-px h-32 sm:h-48 bg-gradient-to-b from-transparent via-[#EABF36]/20 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Quote mark */}
        <motion.span
          className="block text-[#EABF36]/20 text-6xl sm:text-8xl font-[family-name:var(--font-playfair)] leading-none mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          &ldquo;
        </motion.span>

        {/* Word-by-word reveal */}
        <p className="text-[clamp(1.25rem,3.5vw,2.75rem)] leading-[1.3] sm:leading-[1.4] font-[family-name:var(--font-playfair)]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Closing quote */}
        <motion.span
          className="block text-[#EABF36]/20 text-6xl sm:text-8xl font-[family-name:var(--font-playfair)] leading-none mt-4 sm:mt-6 text-right"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          &rdquo;
        </motion.span>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgb(247,247,243)", "rgb(247,247,243)"]
  );

  // Highlight key words
  const highlights = ["real", "game", "boardroom."];
  const isHighlight = highlights.includes(children.toLowerCase());

  const highlightColor = useTransform(
    progress,
    range,
    ["rgb(247,247,243)", "rgb(234,191,54)"]
  );

  return (
    <motion.span
      className="inline-block mr-[0.25em]"
      style={{
        opacity,
        color: isHighlight ? highlightColor : color,
      }}
    >
      {children}
    </motion.span>
  );
}
