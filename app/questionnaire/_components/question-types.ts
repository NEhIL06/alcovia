export type QuestionType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "multi-select"
  | "radio"
  | "textarea"
  | "scale"

export type GradeGroup = "6-8" | "9-10" | "11-12"

export type Question = {
  id: string
  question: string
  type: QuestionType
  options?: string[]
  maxSelections?: number
  required: boolean
  placeholder?: string
  gradeGroup?: GradeGroup
  hasOtherOption?: boolean
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: { min: string; max: string }
  description?: string
}

export type FormData = Record<string, string | string[]>
