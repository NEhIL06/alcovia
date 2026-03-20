"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Quote, Sparkles } from "lucide-react";
import TextReveal, { ScrollReveal } from "./text-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 1. DATA ---
const OFFERINGS = [
  {
    id: "01",
    label: "FROM IDEAS TO EXECUTION",
    title: "They stop only consuming ideas. They start building.",
    description: "At Alcovia, teenagers are expected to move from interest to execution. They do projects, make decisions, present work, test ideas and finish what they start.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157739/carrerDiscovery_tijhkf",
  },
  {
    id: "02",
    label: "CONVICTION OVER CONFORMITY",
    title: "They build conviction, not borrowed ambition.",
    description: "Instead of chasing what sounds impressive, they engage with real professionals, real domains and real-world questions until they begin to understand what genuinely fits them.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769158280/oneonone_mz0dio",
  },
  {
    id: "03",
    label: "ENVIRONMENT AS MULTIPLIER",
    title: "They grow in a room that raises their standards.",
    description: "The right environment changes what feels normal. Teenagers begin to speak more clearly, think more deeply, attempt more difficult work and expect more from themselves.",
    image: "https://res.cloudinary.com/ds1ka0bap/image/upload/f_auto,q_auto,w_800/v1769157740/forgebonds_bwekt3",
  },
];

export default function OfferingsHorizontal() {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // --- DESKTOP LOGIC (Horizontal Scroll + Parallax) ---
    mm.add("(min-width: 1280px)", () => {
      // 1. The Horizontal Scroll Movement
      const scrollTween = gsap.to(scrollContainer.current, {
        x: () => {
          const totalWidth = scrollContainer.current?.scrollWidth || 0;
          const viewportWidth = window.innerWidth;
          return -(totalWidth - viewportWidth + 100);
        },
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (scrollContainer.current?.scrollWidth || window.innerWidth * 3),
          invalidateOnRefresh: true,
        }
      });

      // 2. Parallax Effect on Images
      const images = gsap.utils.toArray<HTMLElement>(".parallax-image-inner");
      images.forEach((img) => {
        gsap.to(img, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: scrollTween, // Links to the horizontal scroll
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      });
    });

  }, { scope: container });

  // Helper to split titles into "Lines" for the effect
  const getTitleLines = (text: string) => {
    // Basic logic: Split roughly in half or keep as one line if short
    const words = text.split(" ");
    if (words.length > 3) {
      const mid = Math.ceil(words.length / 2);
      return [
        { text: words.slice(0, mid).join(" ") },
        { text: words.slice(mid).join(" ") }
      ];
    }
    return [{ text: text }];
  };

  return (
    <section
      ref={container}
      className="relative min-h-screen text-[#0D3B2E] overflow-hidden font-sans"
    >
      {/* --- DESKTOP HORIZONTAL TRACK --- */}
      <div className="hidden xl:flex h-screen items-center pl-12 relative z-10" ref={scrollContainer}>
        <div className="flex items-center gap-[clamp(2rem,3vw,4rem)] pr-32">

          {/* 1. SECTION HEADER (Fixed MultiLineReveal) */}
          <div className="flex-shrink-0 w-[clamp(300px,30vw,500px)] self-center pr-12 pl-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                The Transformation
              </p>
            </div>

            {/* Using ScrollReveal for the "Stacked" Lando Effect */}
            <div className="flex flex-col gap-2">
              <ScrollReveal className="w-fit">
                <span className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] italic leading-[1.1] text-[#F7F7F3]">
                  What changes
                </span>
              </ScrollReveal>
              <ScrollReveal className="w-fit">
                <span className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] italic leading-[1.1] text-[#F7F7F3] bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  inside Alcovia.
                </span>
              </ScrollReveal>
            </div>
          </div>

          {/* 2. DYNAMIC CARDS */}
          {OFFERINGS.map((item, index) => {
            const titleLines = getTitleLines(item.title);

            return (
              <div
                key={item.id}
                className="relative group w-[clamp(320px,30vw,550px)] flex-shrink-0 self-center transition-all duration-500"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card Container */}
                <div className={`
                  relative p-[clamp(1rem,2vw,2rem)] bg-[#08261e]/60 backdrop-blur-md border border-white/10 
                  transition-all duration-500 hover:border-[#D4AF37]/50 hover:bg-[#08261e]/80
                  ${activeCard === index ? 'scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10' : 'scale-100 opacity-90'}
                `}>

                  {/* Top Label */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37] px-3 py-1 rounded-full">
                      {item.label}
                    </span>
                  </div>

                  {/* Image Area */}
                  <div className="relative w-full h-[clamp(150px,16vw,280px)] overflow-hidden mb-6 bg-transparent">
                    <div className="parallax-image-inner absolute inset-[-10%] w-[110%] h-[110%]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-cover transition-opacity duration-500 ${['01', '02', '04'].includes(item.id) ? 'scale-110' : ''}`}
                        sizes="(max-width: 1280px) 50vw, 30vw"
                        priority={index < 3}
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>

                  {/* TYPOGRAPHY WITH LANDO REVEALS */}
                  <div className="mb-3">
                    {/* Title using ScrollReveal */}
                    <div className="font-serif text-[clamp(1.25rem,2vw,1.875rem)] text-[#D4AF37] leading-tight">
                      {item.title}
                    </div>
                  </div>

                  {/* Description using ScrollReveal */}
                  <div className="border-l border-white/10 pl-4 mt-2">
                    <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-light text-[#F7F7F3]/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}

          {/* 3. CLOSING QUOTE */}
          <div className="w-[clamp(300px,40vw,600px)] flex-shrink-0 flex items-center justify-center p-12 self-center">
            <div className="text-center">
              <Quote className="w-16 h-16 text-[#D4AF37] mx-auto mb-8 opacity-50" />
              <div className="flex flex-col items-center gap-2">
                <ScrollReveal className="w-fit">
                  <span className="font-serif text-[clamp(2rem,4vw,3rem)] italic leading-relaxed text-[#F7F7F3]">
                    "If your child has
                  </span>
                </ScrollReveal>
                <ScrollReveal className="w-fit">
                  <span className="font-serif text-[clamp(2rem,4vw,3rem)] italic leading-relaxed text-[#F7F7F3] bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    potential,
                  </span>
                </ScrollReveal>
                <ScrollReveal className="w-fit">
                  <span className="font-serif text-[clamp(2rem,4vw,3rem)] italic leading-relaxed text-[#F7F7F3]">
                    the right environment cannot wait."
                  </span>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VERTICAL LAYOUT (< 768px) --- */}
      <div className="md:hidden px-6 py-20 relative z-10">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">The Transformation</p>
          <div className="flex flex-col gap-1">
            <ScrollReveal className="w-fit">
              <span className="font-serif text-4xl italic text-[#F7F7F3] leading-tight">What changes</span>
            </ScrollReveal>
            <ScrollReveal className="w-fit">
              <span className="font-serif text-4xl italic text-[#F7F7F3] leading-tight bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>inside Alcovia.</span>
            </ScrollReveal>
          </div>
        </div>

        <div className="space-y-20">
          {OFFERINGS.map((item) => (
            <div key={item.id} className="mobile-card group">
              <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden rounded-sm border-l-2 border-[#D4AF37]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                  priority={item.id === '01' || item.id === '02'}
                  loading={(item.id === '01' || item.id === '02') ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2E] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block text-[10px] bg-[#D4AF37] text-[#0D3B2E] px-2 py-1 font-bold uppercase tracking-widest mb-2">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Mobile Text Reveals */}
              <div className="mb-3">
                <div className="font-serif text-2xl text-[#D4AF37] leading-tight">
                  {item.title}
                </div>
              </div>

              <div className="pl-4 border-l border-white/20">
                <p className="text-sm text-[#F7F7F3]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- TABLET VERTICAL LAYOUT (768px - 1280px) --- */}
      <div className="hidden md:block xl:hidden px-12 py-24 relative z-10">
        <div className="mb-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">The Transformation</p>
          <div className="flex flex-col items-center gap-1">
            <ScrollReveal className="w-fit">
              <span className="font-serif text-5xl italic text-[#F7F7F3] leading-tight">What changes</span>
            </ScrollReveal>
            <ScrollReveal className="w-fit">
              <span className="font-serif text-5xl italic text-[#F7F7F3] leading-tight bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>inside Alcovia.</span>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-24">
          {OFFERINGS.map((item) => (
            <div key={item.id} className="tablet-card group">
              <div className="relative aspect-[3/4] w-full mb-8 overflow-hidden rounded-sm border-l-2 border-[#D4AF37] shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1280px) 50vw, 33vw"
                  priority={item.id === '01' || item.id === '02'}
                  loading={(item.id === '01' || item.id === '02') ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2E] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4">
                  <span className="inline-block text-[10px] bg-[#D4AF37] text-[#0D3B2E] px-3 py-1 font-bold uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Tablet Text Reveals */}
              <div className="mb-4 pr-4">
                <div className="font-serif text-3xl text-[#D4AF37] leading-tight mb-2">
                  {item.title}
                </div>
              </div>

              <div className="pl-4 border-l border-white/20">
                <p className="text-base text-[#F7F7F3]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}