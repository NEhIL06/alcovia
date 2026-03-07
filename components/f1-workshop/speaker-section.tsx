"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SpeakerSection() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(234,191,54,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#EABF36] text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]">
            Meet Your Speaker
          </span>
        </motion.div>

        {/* Speaker card */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-10 sm:gap-14 lg:gap-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image placeholder */}
          <div className="relative flex-shrink-0">
            {/* Frame */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              {/* Outer border */}
              <div className="absolute inset-0 border border-[#EABF36]/15 rounded-2xl" />

              {/* Inner placeholder */}
              <div className="absolute inset-3 rounded-xl bg-[#F7F7F3]/[0.03] border border-[#F7F7F3]/[0.06] flex flex-col items-center justify-center gap-4 overflow-hidden">
                <Image
                  src="/images/gaurav.jpg"
                  alt="Gaurav Jain"
                  fill
                  className="object-cover"
                  priority
                  loading="eager"
                />
              </div>

              {/* Corner accents */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-[#EABF36]/40 rounded-tl-md" />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-[#EABF36]/40 rounded-tr-md" />
              <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-[#EABF36]/40 rounded-bl-md" />
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-[#EABF36]/40 rounded-br-md" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#08261e] border border-[#EABF36]/30 rounded-full px-4 py-1.5 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#EABF36]" />
              <span className="text-[10px] sm:text-xs text-[#EABF36] font-[family-name:var(--font-satoshi)] font-medium tracking-wider uppercase whitespace-nowrap">
                Red Bull
              </span>
            </motion.div>
          </div>

          {/* Speaker info */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Speaker Header */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-[#F7F7F3] mb-2">
                  Gaurav Jain
                </h3>
                <p className="text-sm sm:text-base text-[#EABF36]/80 font-[family-name:var(--font-satoshi)]">
                  Head Of Content, India @ Red Bull
                </p>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-[#EABF36]/30 mx-auto lg:mx-0" />

              {/* Bio Content */}
              <div className="text-sm sm:text-base text-[#F7F7F3]/70 font-[family-name:var(--font-satoshi)] leading-relaxed max-w-lg mx-auto lg:mx-0 mt-4 space-y-4 text-left">
                <p>
                  Gaurav Jain, based in Mumbai, is currently the Head Of Content, India at Red Bull. With a rich background spanning leadership roles at Disney+ Hotstar and Star TV, he brings unparalleled expertise in sports media, original content, and the business of entertainment.
                </p>
                <div className="space-y-3 mt-6 text-[#F7F7F3]/60 text-sm">
                  <p className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EABF36] mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-[#EABF36] font-medium block">2019 - Present</strong>
                      Head Of Content, India @ Red Bull
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EABF36] mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-[#EABF36] font-medium block">2017 - 2018</strong>
                      Sr. Manager, Sports Originals & Branded Content @ Disney+ Hotstar
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EABF36] mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-[#EABF36] font-medium block">2015 - 2017</strong>
                      Sr. Manager, Content Acquisition & Strategy @ Star TV
                    </span>
                  </p>
                </div>
              </div>

              {/* Credential tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-8">
                {["Red Bull", "Disney+ Hotstar", "Star TV", "Sports Media"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-[#F7F7F3]/10 rounded-full px-3 py-1.5 text-[#F7F7F3]/40 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
