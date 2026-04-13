import Link from "next/link"

export const metadata = {
  title: "Thank You | Alcovia",
  description: "Your questionnaire has been submitted successfully.",
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] px-6">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 font-['Playfair_Display',serif] text-3xl font-bold text-[#1a1a2e] md:text-4xl">
          Thank you!
        </h1>

        <p className="mb-3 text-lg text-gray-600">
          Your responses have been submitted successfully.
        </p>

        <p className="mb-8 text-base text-gray-500">
          We&apos;ll review your answers and reach out to you soon.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-[#1a1a2e] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2a2a4e]"
        >
          Back to alcovia
        </Link>
      </div>
    </div>
  )
}
