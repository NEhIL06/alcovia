"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import type { FormData } from "./question-types"
import { commonQuestions, buildQuestionFlow, getGradeGroup } from "../_data/questions"
import { QuestionCard } from "./question-card"
import { ProgressBar } from "./progress-bar"

export function QuestionnaireForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)

  // Build question flow based on selected grade
  const questions = useMemo(() => {
    const grade = formData.grade as string | undefined
    if (!grade || !getGradeGroup(grade)) return commonQuestions
    return buildQuestionFlow(grade)
  }, [formData.grade])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalQuestions - 1

  const currentValue = formData[currentQuestion?.id] ?? ""

  const updateValue = useCallback(
    (value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [currentQuestion.id]: value }))
      setFieldError(null)
    },
    [currentQuestion?.id]
  )

  const goNext = useCallback(async () => {
    if (!currentQuestion) return

    // Validate required field
    if (currentQuestion.required) {
      const val = formData[currentQuestion.id]
      const isEmpty = Array.isArray(val) ? val.length === 0 : (!val || val === "Other: ")
      if (isEmpty) return
    }

    // Inline format validation for phone and email
    const val = formData[currentQuestion.id] as string
    if (currentQuestion.id === "parent_phone" && val) {
      const digits = val.replace(/\D/g, "")
      if (digits.length < 10) {
        setFieldError("Please enter a valid phone number (at least 10 digits)")
        return
      }
    }
    if (currentQuestion.id === "parent_email" && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(val)) {
        setFieldError("Please enter a valid email address")
        return
      }
    }
    setFieldError(null)

    // If we just answered the grade question (index 6 in common questions),
    // the questions list will rebuild via useMemo on next render.
    // We just advance the index normally.

    if (isLast) {
      await handleSubmit()
      return
    }

    setDirection(1)
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1))
  }, [currentQuestion, formData, isLast, totalQuestions])

  const goBack = useCallback(() => {
    if (isFirst) return
    setDirection(-1)
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [isFirst])

  // Global keyboard listener for Enter / Shift+Enter
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      // Never intercept Enter inside a textarea — let it add newlines
      if (e.target instanceof HTMLTextAreaElement) return

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        goNext()
      } else if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault()
        goBack()
      }
    }

    window.addEventListener("keydown", handleGlobalKey)
    return () => window.removeEventListener("keydown", handleGlobalKey)
  }, [goNext, goBack])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const gradeGroup = getGradeGroup(formData.grade as string)

      const payload = {
        ...formData,
        grade_group: gradeGroup,
        submitted_at: new Date().toISOString(),
        user_agent: navigator.userAgent,
        page_url: window.location.href,
      }

      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit questionnaire")
      }

      // Store student name for thank-you page
      if (formData.student_name) {
        sessionStorage.setItem("questionnaire_name", formData.student_name as string)
      }

      router.push("/questionnaire/thank-you")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )
      setIsSubmitting(false)
    }
  }

  if (!currentQuestion) return null

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#1a1a2e]">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      

      {/* Question area */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            initial={{ y: direction > 0 ? 80 : -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction > 0 ? -80 : 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              value={currentValue}
              onChange={updateValue}
              onNext={goNext}
              onBack={goBack}
              isFirst={isFirst}
              isLast={isLast}
              fieldError={fieldError}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-red-600 px-6 py-3 text-sm text-white shadow-lg"
          >
            {error}
            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-4 font-medium underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submitting overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1a1a2e] border-t-transparent" />
              <p className="text-lg font-medium text-[#1a1a2e]">
                Submitting your responses...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
