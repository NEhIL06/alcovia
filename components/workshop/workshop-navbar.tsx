import Link from "next/link"

export default function WorkshopNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B] border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Alcovia home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/alcovia-logo-white.png"
            alt="ALCOVIA"
            width={240}
            height={78}
            // @ts-expect-error fetchPriority is valid
            fetchPriority="high"
            decoding="async"
            className="h-10 sm:h-14 lg:h-16 w-auto"
          />
        </Link>
        <a
          href="#register"
          className="group inline-flex items-center gap-2 rounded-full bg-[#FF6B2B] px-5 sm:px-7 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-[#ff7a3f] transition-all shadow-lg shadow-[#FF6B2B]/30 hover:shadow-[#FF6B2B]/50"
        >
          Register
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </header>
  )
}
