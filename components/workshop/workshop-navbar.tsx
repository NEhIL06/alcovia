import Link from "next/link"

export default function WorkshopNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Alcovia home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/alcovia_logo_dark.png"
            alt="ALCOVIA"
            width={120}
            height={40}
            // @ts-expect-error fetchPriority is valid
            fetchPriority="high"
            decoding="async"
            className="h-8 w-auto"
          />
        </Link>
        <a
          href="#register"
          className="inline-flex items-center rounded-full bg-[#FF6B2B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff7a3f] transition-colors"
        >
          Register
        </a>
      </div>
    </header>
  )
}
