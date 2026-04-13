import { z } from "zod"

const phoneRegex = /^(\+?\d{1,3}[\s-]?)?\d{10}$/

export const questionnaireSchema = z.object({
  // ── Common fields ──
  student_name: z.string().min(2, "Please enter your full name"),
  parent_name: z.string().min(2, "Please enter your parent/guardian's name"),
  parent_phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  parent_email: z.string().email("Please enter a valid email address"),
  school_name: z.string().min(2, "Please enter your school name"),
  board: z.string().min(1, "Please select your board"),
  grade: z.string().min(1, "Please select your grade"),
  city: z.string().min(2, "Please enter your city"),
  parent_occupation: z.string().optional(),
  previous_event: z.string().optional(),

  // ── Grade 6–8 ──
  subjects_enjoyed_6_8: z.array(z.string()).optional(),
  enjoy_doing_6_8: z.array(z.string()).optional(),
  full_day_activity_6_8: z.string().optional(),
  curious_about_6_8: z.string().optional(),
  self_description_6_8: z.string().optional(),
  exciting_challenge_6_8: z.array(z.string()).optional(),
  improve_this_year_6_8: z.string().optional(),

  // ── Grade 9–10 ──
  subjects_best_9_10: z.array(z.string()).optional(),
  important_now_9_10: z.array(z.string()).optional(),
  stream_thinking_9_10: z.string().optional(),
  career_directions_9_10: z.string().optional(),
  countries_9_10: z.array(z.string()).optional(),
  support_needed_9_10: z.array(z.string()).optional(),
  hobbies_9_10: z.string().optional(),
  defines_you_9_10: z.string().optional(),
  big_goals_9_10: z.string().optional(),
  india_or_abroad_9_10: z.string().optional(),
  success_vision_9_10: z.string().optional(),
  fears_9_10: z.string().optional(),
  comfortable_sharing_9_10: z.string().optional(),
  focused_hours_9_10: z.string().optional(),

  // ── Grade 11–12 ──
  career_directions_11_12: z.string().optional(),
  countries_11_12: z.array(z.string()).optional(),
  entrance_tests_11_12: z.array(z.string()).optional(),
  experiences_11_12: z.array(z.string()).optional(),
  biggest_confusion_11_12: z.string().optional(),
  focused_hours_11_12: z.string().optional(),
  confidence_scale_11_12: z.string().optional(),
  hobbies_11_12: z.string().optional(),
  defines_you_11_12: z.string().optional(),
  big_goals_11_12: z.string().optional(),
  india_or_abroad_11_12: z.string().optional(),
  success_vision_11_12: z.string().optional(),
})

export type QuestionnaireData = z.infer<typeof questionnaireSchema>
