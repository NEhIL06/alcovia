"use client";

export default function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 text-xs text-white/25 hover:text-[#22C55E]/60 transition-colors font-[family-name:var(--font-satoshi)] tracking-wider uppercase mt-2 cursor-pointer"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3">
        <path d="M12 5v14M5 12l7-7 7 7" />
      </svg>
      Back to top
    </button>
  );
}
