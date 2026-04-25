"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ACCENT = "#22C55E";

const images = [
  { src: "/images/lp/cohort.jpg", alt: "Intimate mentoring session" },
  { src: "/images/lp/environment.jpg", alt: "Teens collaborating on ideas" },
  { src: "/images/workshop/w4.jpeg", alt: "Full audience workshop" },
  { src: "/images/lp/ideas-to-execution.jpg", alt: "Students pitching their brand" },
  { src: "/images/workshop/w2.jpeg", alt: "Group discussion with mentor" },
];

export default function WorkshopGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <section className="relative py-4 sm:py-8 overflow-hidden">
      <div className="px-4 sm:px-6 mb-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(247,247,243,0.06))" }} />
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
            From Our Workshops
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(247,247,243,0.06))" }} />
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-2.5"
          style={{ width: "max-content" }}
          animate={trackWidth ? { x: [0, -trackWidth] } : undefined}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="relative w-[140px] h-[180px] sm:w-[180px] sm:h-[230px] flex-shrink-0 rounded-xl overflow-hidden border border-white/[0.06]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
