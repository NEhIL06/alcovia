import Image from "next/image";
import CursorParallaxGrid from "./cursor-parallax-grid";

const ACCENT = "#FF6B2B";

export default function SpeakerSection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          <CursorParallaxGrid opacity={0.038} depth={12} spotlight />
        </div>
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,43,0.03) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lp-fade-in text-center mb-6 sm:mb-10">
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
            Meet the Mentor
          </span>
        </div>

        <div className="lp-fade-in flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16">
          <div className="relative flex-shrink-0">
            <div className="relative w-48 h-60 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              <div
                className="absolute inset-0 border rounded-2xl"
                style={{ borderColor: `rgba(255,107,43,0.15)` }}
              />

              <div className="absolute inset-3 rounded-xl overflow-hidden">
                <Image
                  src="/assets/mentors/siddhant-narayan.png"
                  alt="Siddhant Narayan, Country Head of Marketing, Nike"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 288px, 320px"
                />
                <div className="absolute inset-0 bg-black/15" />
              </div>

              <div
                className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 rounded-tl-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 rounded-tr-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 rounded-bl-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 rounded-br-md"
                style={{ borderColor: `rgba(255,107,43,0.4)` }}
              />
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0b0d0c] border border-[#FF6B2B]/30 rounded-full px-4 py-1.5 flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: ACCENT }}
              />
              <span
                className="text-[10px] sm:text-xs font-[family-name:var(--font-satoshi)] font-medium tracking-wider uppercase whitespace-nowrap"
                style={{ color: ACCENT }}
              >
                Country Head of Marketing · Nike
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <div className="space-y-3 sm:space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-white mb-3">
                  Siddhant Narayan
                </h3>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start mb-2">
                  <span
                    className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] font-medium"
                    style={{ color: ACCENT }}
                  >
                    Country Head of Marketing
                  </span>
                  <span className="text-white/25">at</span>
                  <Image
                    src="/assets/logos/nike-logo.png"
                    alt="Nike"
                    width={96}
                    height={40}
                    className="h-12 sm:h-14 w-auto object-contain"
                  />
                </div>
                <p className="text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
                  The architect behind India&apos;s biggest marketing engine
                </p>
              </div>

              <div
                className="w-12 h-px mx-auto lg:mx-0"
                style={{ background: `rgba(255,107,43,0.3)` }}
              />

              <div className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-snug max-w-lg mx-auto lg:mx-0 space-y-2 text-left">
                <p>
                  This isn&apos;t a lecture. This is a{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    masterclass from the man responsible for the brand that defined &ldquo;The Drop&rdquo; and &ldquo;The Community.&rdquo;
                  </span>
                </p>
                <p className="text-white/40">
                  Your teen will learn the exact frameworks used at the highest level
                  of global marketing, from the person who deploys them every day
                  at the world&apos;s most iconic brand.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4">
                {[
                  "The Drop",
                  "Community Building",
                  "Brand Psychology",
                  "Hype Engineering",
                  "Global Marketing",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-[#F7F7F3]/10 rounded-full px-3 py-1.5 text-white/40 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
