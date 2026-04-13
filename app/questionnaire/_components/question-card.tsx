"use client"

import { useEffect, useRef, useState } from "react"

import type { Question, FormData } from "./question-types"

type QuestionCardProps = {
  question: Question
  questionNumber: number
  totalQuestions: number
  value: string | string[]
  onChange: (value: string | string[]) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
  fieldError?: string | null
}

const LETTER_KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  value,
  onChange,
  onNext,
  onBack,
  isFirst,
  isLast,
  fieldError,
}: QuestionCardProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [otherText, setOtherText] = useState("")
  const [focusedOption, setFocusedOption] = useState(-1)

  const options = question.options ?? []
  const allOptions = question.hasOtherOption ? [...options, "Other"] : options

  useEffect(() => {
    setFocusedOption(-1)
    setOtherText("")
    const timeout = setTimeout(() => {
      inputRef.current?.focus()
    }, 400)
    return () => clearTimeout(timeout)
  }, [question.id])

  const isSelected = (option: string) => {
    if (Array.isArray(value)) return value.includes(option)
    return value === option
  }

  const handleOptionSelect = (option: string) => {
    if (question.type === "multi-select") {
      const current = Array.isArray(value) ? value : []
      if (current.includes(option)) {
        onChange(current.filter((v) => v !== option))
      } else if (!question.maxSelections || current.length < question.maxSelections) {
        onChange([...current, option])
      }
    } else {
      onChange(option)
    }
  }

  const handleOtherChange = (text: string) => {
    setOtherText(text)
    if (question.type === "multi-select") {
      const current = Array.isArray(value) ? value.filter((v) => !v.startsWith("Other: ")) : []
      if (text) {
        onChange([...current, `Other: ${text}`])
      } else {
        onChange(current)
      }
    } else {
      // Keep "Other: " prefix even when text is cleared so the button stays active
      onChange(text ? `Other: ${text}` : "Other: ")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter / Shift+Enter are handled by the global listener in questionnaire-form.
    // Only handle option-selection shortcuts here.

    // Letter key shortcuts for options
    if (allOptions.length > 0 && question.type !== "text" && question.type !== "textarea" && question.type !== "email" && question.type !== "tel") {
      const letterIndex = LETTER_KEYS.indexOf(e.key.toUpperCase())
      if (letterIndex >= 0 && letterIndex < allOptions.length) {
        e.preventDefault()
        handleOptionSelect(allOptions[letterIndex])
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setFocusedOption((prev) => Math.min(prev + 1, allOptions.length - 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setFocusedOption((prev) => Math.max(prev - 1, 0))
      }
      if ((e.key === " " || e.key === "Enter") && focusedOption >= 0) {
        e.preventDefault()
        handleOptionSelect(allOptions[focusedOption])
      }
    }
  }

  const renderInput = () => {
    switch (question.type) {
      case "text":
      case "email":
      case "tel":
        return (
          <>
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={question.type}
              value={(value as string) || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              className={`w-full border-b-2 bg-transparent py-3 text-lg outline-none transition-colors focus:border-[#1a1a2e] md:text-2xl ${fieldError ? "border-red-400" : "border-gray-300"
                }`}
              autoComplete={
                question.type === "email" ? "email" : question.type === "tel" ? "tel" : "off"
              }
            />
            {fieldError && (
              <p className="mt-2 text-sm text-red-500">{fieldError}</p>
            )}
          </>
        )

      case "textarea":
        return (
          <div>
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={(value as string) || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              rows={4}
              className="w-full resize-none rounded-lg border-2 border-gray-200 bg-white p-4 text-lg outline-none transition-colors focus:border-[#1a1a2e] md:text-xl"
            />
            <p className="mt-2 text-sm text-gray-400">
              Shift + Enter to go back &middot; Use the button below when done
            </p>
          </div>
        )

      case "radio":
      case "select":
        return (
          <div className="flex flex-col gap-3">
            {allOptions.map((option, i) => {
              const letter = LETTER_KEYS[i]
              const selected = isSelected(option)
              const focused = focusedOption === i

              if (option === "Other") {
                const isOtherSelected = typeof value === "string" && value.startsWith("Other: ")
                return (
                  <div key="other" className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (isOtherSelected) {
                          onChange("")
                        } else {
                          onChange("Other: ")
                        }
                        setOtherText("")
                      }}
                      className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-base transition-all md:text-lg ${isOtherSelected
                          ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                          : focused
                            ? "border-[#1a1a2e] bg-gray-50"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border text-sm font-medium">
                        {letter}
                      </span>
                      Other
                    </button>
                    {isOtherSelected && (
                      <input
                        type="text"
                        value={otherText}
                        onChange={(e) => handleOtherChange(e.target.value)}
                        placeholder="Please specify..."
                        className="ml-10 border-b-2 border-gray-300 bg-transparent py-2 text-base outline-none focus:border-[#1a1a2e]"
                        autoFocus
                      />
                    )}
                  </div>
                )
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-base transition-all md:text-lg ${selected
                      ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                      : focused
                        ? "border-[#1a1a2e] bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded border text-sm font-medium ${selected ? "border-white/30 bg-white/20" : "border-gray-300"
                      }`}
                  >
                    {letter}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>
        )

      case "multi-select":
        return (
          <div className="flex flex-col gap-3">
            {question.maxSelections && (
              <p className="text-sm text-gray-500">
                Select up to {question.maxSelections}
                {Array.isArray(value) && value.length > 0 && (
                  <span className="ml-1 font-medium text-[#1a1a2e]">
                    &middot; {value.length} selected
                  </span>
                )}
              </p>
            )}
            {allOptions.map((option, i) => {
              const letter = LETTER_KEYS[i]
              const selected = isSelected(option)
              const focused = focusedOption === i
              const atLimit = Boolean(
                question.maxSelections &&
                Array.isArray(value) &&
                value.length >= question.maxSelections &&
                !selected
              )

              if (option === "Other") {
                const otherValues = Array.isArray(value) ? value.filter((v) => v.startsWith("Other: ")) : []
                const isOtherSelected = otherValues.length > 0
                return (
                  <div key="other" className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (isOtherSelected) {
                          const current = Array.isArray(value) ? value.filter((v) => !v.startsWith("Other: ")) : []
                          onChange(current)
                          setOtherText("")
                        }
                      }}
                      disabled={atLimit && !isOtherSelected}
                      className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-base transition-all md:text-lg ${isOtherSelected
                          ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                          : atLimit
                            ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border text-sm font-medium">
                        {letter}
                      </span>
                      Other
                    </button>
                    {!isOtherSelected && !atLimit && (
                      <input
                        type="text"
                        value={otherText}
                        onChange={(e) => handleOtherChange(e.target.value)}
                        placeholder="Type and it will be added..."
                        className="ml-10 border-b-2 border-gray-300 bg-transparent py-2 text-base outline-none focus:border-[#1a1a2e]"
                      />
                    )}
                    {isOtherSelected && (
                      <input
                        type="text"
                        value={otherText}
                        onChange={(e) => handleOtherChange(e.target.value)}
                        placeholder="Please specify..."
                        className="ml-10 border-b-2 border-gray-300 bg-transparent py-2 text-base text-gray-800 outline-none focus:border-[#1a1a2e]"
                        autoFocus
                      />
                    )}
                  </div>
                )
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!atLimit}
                  className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-base transition-all md:text-lg ${selected
                      ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                      : atLimit
                        ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400"
                        : focused
                          ? "border-[#1a1a2e] bg-gray-50"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded border text-sm font-medium ${selected
                        ? "border-white/30 bg-white/20"
                        : atLimit
                          ? "border-gray-200"
                          : "border-gray-300"
                      }`}
                  >
                    {letter}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>
        )

      case "scale":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {Array.from(
                { length: (question.scaleMax ?? 10) - (question.scaleMin ?? 1) + 1 },
                (_, i) => {
                  const num = (question.scaleMin ?? 1) + i
                  const selected = value === String(num)
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onChange(String(num))}
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-lg font-medium transition-all md:h-14 md:w-14 md:text-xl ${selected
                          ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {num}
                    </button>
                  )
                }
              )}
            </div>
            {question.scaleLabels && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>{question.scaleLabels.min}</span>
                <span>{question.scaleLabels.max}</span>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const hasValue = Array.isArray(value) ? value.length > 0 : !!value
  const isOptional = !question.required

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="flex min-h-[60vh] flex-col justify-center px-6 md:px-0"
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto w-full max-w-2xl pb-16 pt-20 md:pt-24">
        <div className="mb-2 flex items-baseline gap-2">
          <span className="text-sm font-medium text-[#1a1a2e]/60">
            {questionNumber} of {totalQuestions}
          </span>
          {isOptional && (
            <span className="text-xs text-gray-400">Optional</span>
          )}
        </div>

        <h2 className={`font-['Playfair_Display',serif] text-2xl font-semibold leading-tight text-[#1a1a2e] md:text-3xl ${question.description ? "mb-2" : "mb-8"}`}>
          {question.question}
        </h2>

        {question.description && (
          <p className="mb-6 text-sm text-gray-500">{question.description}</p>
        )}

        {renderInput()}

        <div className="mt-8 flex items-center gap-4">
          {!isFirst && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border-2 border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            disabled={question.required && !hasValue}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${question.required && !hasValue
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-[#1a1a2e] text-white hover:bg-[#2a2a4e]"
              }`}
          >
            {isLast ? "Submit" : "OK"}
          </button>
          {!isLast && (
            <span className="hidden text-xs text-gray-400 md:block">
              press <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs">Enter</kbd>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
