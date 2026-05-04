import Image from "next/image";

const ACCENT = "#00E5FF";

export default function SpeakerSection() {
  return (
    <section className="relative py-6 sm:py-16 lg:py-24 overflow-hidden" style={{ background: "#050505" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lp-fade-in text-center mb-6 sm:mb-10">
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] font-semibold"
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
                style={{ borderColor: `rgba(0,229,255,0.2)` }}
              />
              <div className="absolute inset-3 rounded-xl overflow-hidden">
                <Image
                  src="/assets/mentors/akash-zaveri.jpeg"
                  alt="Akash Zaveri, Co-Founder and COO, Plix"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 288px, 320px"
                />
              </div>

              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: `rgba(0,229,255,0.4)` }} />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: `rgba(0,229,255,0.4)` }} />
              <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: `rgba(0,229,255,0.4)` }} />
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: `rgba(0,229,255,0.4)` }} />
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md border border-[#00E5FF]/25 shadow-sm rounded-full px-4 py-1.5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
              <span
                className="text-[10px] sm:text-xs font-[family-name:var(--font-satoshi)] font-medium tracking-wider uppercase whitespace-nowrap"
                style={{ color: ACCENT }}
              >
                Co-Founder &amp; COO · Plix
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <div className="space-y-3 sm:space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-white mb-3">
                  Akash Zaveri
                </h3>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start mb-2">
                  <span
                    className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] font-medium"
                    style={{ color: ACCENT }}
                  >
                    Co-Founder &amp; COO
                  </span>
                  <span className="text-white/50">at</span>
                  <span className="text-sm sm:text-base font-[family-name:var(--font-satoshi)] font-bold text-white">
                    Plix
                  </span>
                </div>
                <p className="text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
                  Built a 500 Cr+ health &amp; wellness brand, acquired by Marico
                </p>
              </div>

              <div className="w-12 h-px mx-auto lg:mx-0" style={{ background: `rgba(0,229,255,0.3)` }} />

              <div className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-snug max-w-lg mx-auto lg:mx-0 space-y-2 text-left">
                <p>
                  This isn&apos;t a lecture. This is a{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    masterclass from the founder who built one of India&apos;s leading health &amp; wellness brands from zero to a Marico acquisition.
                  </span>
                </p>
                <p className="hidden sm:block text-white/50">
                  Business World 30U30. From a single bottle of apple cider
                  vinegar to a 1000+ person organisation. Your teen learns the
                  exact playbook from the person who lived it.
                </p>
              </div>

              <div className="hidden sm:flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4">
                {[
                  "BW 30U30",
                  "Health & Wellness",
                  "Marico Acquired",
                  "500Cr+ Brand",
                  "Northeastern Alum",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-white/10 rounded-full px-3 py-1.5 text-white/50 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
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
