import type { Question } from "../_components/question-types"

// ─── Section 1: Common questions for all students ───

export const commonQuestions: Question[] = [
  {
    id: "student_name",
    question: "What is your full name?",
    type: "text",
    required: true,
    placeholder: "Enter your full name",
  },
  {
    id: "parent_name",
    question: "What is your parent or guardian's name?",
    type: "text",
    required: true,
    placeholder: "Enter parent/guardian name",
  },
  {
    id: "parent_phone",
    question: "What is your parent or guardian's phone number?",
    type: "tel",
    required: true,
    placeholder: "+91 XXXXX XXXXX",
  },
  {
    id: "parent_email",
    question: "What is your parent or guardian's email address?",
    type: "email",
    required: true,
    placeholder: "email@example.com",
  },
  {
    id: "school_name",
    question: "What school do you go to?",
    type: "text",
    required: true,
    placeholder: "Enter your school name",
  },
  {
    id: "board",
    question: "Which board is your school affiliated with?",
    type: "radio",
    options: ["CBSE", "ICSE", "IB", "Cambridge", "State Board"],
    hasOtherOption: true,
    required: true,
  },
  {
    id: "grade",
    question: "What grade are you currently in?",
    type: "radio",
    options: [
      "Grade 6",
      "Grade 7",
      "Grade 8",
      "Grade 9",
      "Grade 10",
      "Grade 11",
      "Grade 12",
    ],
    required: true,
  },
  {
    id: "city",
    question: "Which city do you live in?",
    type: "select",
    options: [
      "Mumbai",
      "Delhi (NCR)",
      "Bengaluru",
      "Chennai",
      "Hyderabad",
      "Kolkata",
      "Pune",
      "Ahmedabad",
      "Jaipur",
      "Surat",
      "Lucknow",
      "Gurgaon",
      "Chandigarh",
      "Nagpur",
      "Indore",
      "Kochi",
      "Coimbatore",
      "Vadodara",
      "Thiruvananthapuram",
      "Bhopal",
      "Patna",
      "Visakhapatnam",
      "Amritsar",
      "Dehradun",
      "Guwahati",
      "Ranchi",
    ],
    hasOtherOption: true,
    required: true,
  },
  {
    id: "parent_occupation",
    question: "What do your parents or guardians do?",
    type: "text",
    required: false,
    placeholder: "e.g. Doctor, Engineer, Business (optional)",
  },
  {
    id: "previous_event",
    question: "Have you previously attended any alcovia workshop or event?",
    type: "radio",
    options: ["Yes", "No"],
    required: false,
  },
]

// ─── Section 2: Grades 6–8 ───

export const grade6to8Questions: Question[] = [
  {
    id: "subjects_enjoyed_6_8",
    question: "Which subjects do you enjoy the most right now?",
    type: "multi-select",
    options: [
      "Math",
      "Science",
      "English",
      "Social Science / History",
      "Computer / Coding",
      "Art / Design",
      "Sports",
    ],
    hasOtherOption: true,
    maxSelections: 3,
    required: true,
    gradeGroup: "6-8",
  },
  {
    id: "enjoy_doing_6_8",
    question: "Which of these do you enjoy doing most?",
    type: "multi-select",
    options: [
      "Solving puzzles or tricky problems",
      "Making or building things",
      "Drawing, writing or creating",
      "Speaking, debating or performing",
      "Helping people or working in teams",
      "Exploring how things work",
    ],
    maxSelections: 2,
    required: true,
    gradeGroup: "6-8",
  },
  {
    id: "full_day_activity_6_8",
    question:
      "If you could spend one full day doing any of these, what would you choose?",
    type: "radio",
    options: [
      "Building something new like a startup",
      "Working on a science or research idea",
      "Creating art, writing, or content",
      "Leading a team challenge",
      "Playing or training in a sport",
      "Helping solve a problem in society",
    ],
    required: true,
    gradeGroup: "6-8",
  },
  {
    id: "curious_about_6_8",
    question: "What are you most curious about these days?",
    type: "textarea",
    required: true,
    placeholder: "Tell us what's on your mind...",
    gradeGroup: "6-8",
  },
  {
    id: "self_description_6_8",
    question: "Which statement sounds most like you right now?",
    type: "radio",
    options: [
      "I like trying many new things",
      "I already have 1\u20132 strong interests",
      "I enjoy school but I\u2019m still figuring out what I like most",
      "I usually need help choosing what to explore",
    ],
    required: true,
    gradeGroup: "6-8",
  },
  {
    id: "exciting_challenge_6_8",
    question:
      "What kind of challenge would excite you most in the next one year?",
    type: "multi-select",
    options: [
      "A competition or Olympiad",
      "A project where I make something",
      "A workshop with experts",
      "A team challenge with other students",
      "A chance to present my ideas",
      "Trying something completely new",
    ],
    maxSelections: 2,
    required: true,
    gradeGroup: "6-8",
  },
  {
    id: "improve_this_year_6_8",
    question:
      "If there is one thing you would love to get better at this year, what would it be?",
    type: "textarea",
    required: true,
    placeholder: "Write freely...",
    gradeGroup: "6-8",
  },
]

// ─── Section 3: Grades 9–10 ───

export const grade9to10Questions: Question[] = [
  {
    id: "subjects_best_9_10",
    question: "Which subjects do you currently enjoy and perform best in?",
    type: "multi-select",
    options: [
      "Math",
      "Physics / Science",
      "Chemistry",
      "Biology",
      "Economics / Business",
      "Social Science (History, Political Science, Psychology, etc.)",
      "Computer Science",
      "Languages",
    ],
    hasOtherOption: true,
    maxSelections: 3,
    required: true,
    gradeGroup: "9-10",
  },
  {
    id: "important_now_9_10",
    question: "What feels most important to you right now?",
    type: "multi-select",
    options: [
      "Doing very well in school",
      "Figuring out which subjects to choose later",
      "Exploring possible careers",
      "Building my profile beyond academics",
      "Preparing for competitive exams",
      "Balancing school with hobbies / extracurriculars",
    ],
    maxSelections: 2,
    required: true,
    gradeGroup: "9-10",
  },
  {
    id: "stream_thinking_9_10",
    question:
      "Have you started thinking about which subjects or stream you may want to pursue in Grades 11\u201312?",
    type: "radio",
    options: [
      "Yes, I am quite clear",
      "I have a rough idea",
      "I am considering multiple options",
      "No, I have not thought about it seriously yet",
    ],
    required: true,
    gradeGroup: "9-10",
  },
  {
    id: "career_directions_9_10",
    question:
      "If you had to shortlist 2\u20133 possible career directions today, what would they be?",
    description: "Please list up to 3 options",
    type: "textarea",
    required: true,
    placeholder: "List your top 2\u20133 career ideas...",
    gradeGroup: "9-10",
  },
  {
    id: "countries_9_10",
    question:
      "Which countries are you currently open to for higher education later on?",
    type: "multi-select",
    options: [
      "India",
      "United States (US)",
      "United Kingdom (UK)",
      "Singapore",
      "Canada",
      "Australia / New Zealand",
      "Europe",
      "Not sure yet",
    ],
    required: true,
    gradeGroup: "9-10",
  },
  {
    id: "support_needed_9_10",
    question:
      "Which kind of support would help you most in the next 12 months?",
    type: "multi-select",
    options: [
      "Subject / stream clarity",
      "Career exploration",
      "Academic performance and study systems",
      "Competitive exam planning",
      "Profile-building / extracurricular guidance",
      "Confidence and communication",
    ],
    maxSelections: 2,
    required: true,
    gradeGroup: "9-10",
  },
  {
    id: "hobbies_9_10",
    question: "What are your hobbies and interests?",
    type: "textarea",
    required: true,
    placeholder: "Tell us about what you enjoy outside of school...",
    gradeGroup: "9-10",
  },
  {
    id: "defines_you_9_10",
    question: "What defines you other than your academics?",
    type: "textarea",
    required: true,
    placeholder: "What makes you, you?",
    gradeGroup: "9-10",
  },
  {
    id: "big_goals_9_10",
    question: "Do you have any big goals for yourself?",
    type: "textarea",
    required: true,
    placeholder: "Share your ambitions...",
    gradeGroup: "9-10",
  },
  {
    id: "india_or_abroad_9_10",
    question:
      "Do you have a preference of studying in India or abroad? Also mention the reason for your choice.",
    type: "textarea",
    required: true,
    placeholder: "Share your preference and why...",
    gradeGroup: "9-10",
  },
  {
    id: "success_vision_9_10",
    question:
      'If you try to envision a life for yourself 5 years from now, what will success look like for you? Give a few examples by saying, "I will consider myself to be successful if..."',
    type: "textarea",
    required: true,
    placeholder: '"I will consider myself to be successful if..."',
    gradeGroup: "9-10",
  },
  {
    id: "fears_9_10",
    question:
      'Are there big fears in your mind related to your personal or school life? Express them clearly. For example, "I worry that..."',
    type: "textarea",
    required: false,
    placeholder: '"I worry that..."',
    gradeGroup: "9-10",
  },
  {
    id: "comfortable_sharing_9_10",
    question:
      "Who are the people in your life that you are most comfortable sharing your point of view or your feelings with?",
    type: "textarea",
    required: true,
    placeholder: "e.g. parents, friends, teacher, sibling...",
    gradeGroup: "9-10",
  },
  {
    id: "focused_hours_9_10",
    question:
      "How many focused hours per week can you realistically commit to structured preparation outside school?",
    type: "radio",
    options: [
      "Under 2 hours",
      "2\u20134 hours",
      "4\u20136 hours",
      "6\u20138 hours",
      "More than 8 hours",
    ],
    required: true,
    gradeGroup: "9-10",
  },
]

// ─── Section 4: Grades 11–12 ───

export const grade11to12Questions: Question[] = [
  {
    id: "career_directions_11_12",
    question:
      "If you had to shortlist 2\u20133 possible career directions today, what would they be?",
    description: "Please list up to 3 options",
    type: "textarea",
    required: true,
    placeholder: "List your top 2\u20133 career ideas...",
    gradeGroup: "11-12",
  },
  {
    id: "countries_11_12",
    question:
      "Which countries are you seriously considering for university?",
    type: "multi-select",
    options: [
      "India \u2014 public universities (DU, HCU, Christ, etc.)",
      "India \u2014 private universities (Ashoka, NMIMS, etc.)",
      "United States (US)",
      "United Kingdom (UK)",
      "Singapore",
      "Canada",
      "Australia / New Zealand",
      "Europe (non-UK)",
    ],
    hasOtherOption: true,
    required: true,
    gradeGroup: "11-12",
  },
  {
    id: "entrance_tests_11_12",
    question:
      "Which entrance tests or application pathways are you currently open to?",
    type: "multi-select",
    options: [
      "SAT / ACT",
      "JEE",
      "NEET",
      "CLAT / LNAT / law-related tests",
      "AP / subject-based tests",
      "I am open to whatever is required for the right path",
      "Not sure yet",
    ],
    required: true,
    gradeGroup: "11-12",
  },
  {
    id: "experiences_11_12",
    question:
      "Over the next 2\u20133 years, which kinds of experiences excite you most?",
    type: "multi-select",
    options: [
      "Research projects / academic papers",
      "Internships / work exposure",
      "Competitions (Olympiads, debates, business challenges)",
      "Social impact / volunteering",
      "Entrepreneurship / building something",
      "Creative portfolio development",
      "Sports / high-level performance",
    ],
    maxSelections: 3,
    required: true,
    gradeGroup: "11-12",
  },
  {
    id: "biggest_confusion_11_12",
    question:
      "What is the biggest confusion or doubt you currently have about your college or career direction?",
    type: "textarea",
    required: true,
    placeholder: "Share what\u2019s on your mind...",
    gradeGroup: "11-12",
  },
  {
    id: "focused_hours_11_12",
    question:
      "How many focused hours per week can you realistically commit to preparation outside school and existing commitments?",
    type: "radio",
    options: [
      "Under 3 hours",
      "3\u20135 hours",
      "5\u20138 hours",
      "8\u201312 hours",
      "More than 12 hours",
    ],
    required: true,
    gradeGroup: "11-12",
  },
  {
    id: "confidence_scale_11_12",
    question:
      "On a scale of 1 to 10, how confident are you in your current academic or career direction?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { min: "Not confident at all", max: "Very confident and clear" },
    required: true,
    gradeGroup: "11-12",
  },
  {
    id: "hobbies_11_12",
    question: "What are your hobbies and interests?",
    type: "textarea",
    required: true,
    placeholder: "Tell us about what you enjoy outside of school...",
    gradeGroup: "11-12",
  },
  {
    id: "defines_you_11_12",
    question: "What defines you other than your academics?",
    type: "textarea",
    required: true,
    placeholder: "What makes you, you?",
    gradeGroup: "11-12",
  },
  {
    id: "big_goals_11_12",
    question: "Do you have any big goals for yourself?",
    type: "textarea",
    required: true,
    placeholder: "Share your ambitions...",
    gradeGroup: "11-12",
  },
  {
    id: "india_or_abroad_11_12",
    question:
      "Do you have a preference of studying in India or abroad? Also mention the reason for your choice.",
    type: "textarea",
    required: true,
    placeholder: "Share your preference and why...",
    gradeGroup: "11-12",
  },
  {
    id: "success_vision_11_12",
    question:
      'If you try to envision a life for yourself 5 years from now, what will success look like for you? Give a few examples by saying, "I will consider myself to be successful if..."',
    type: "textarea",
    required: true,
    placeholder: '"I will consider myself to be successful if..."',
    gradeGroup: "11-12",
  },
]

// ─── Helpers ───

export function getGradeGroup(grade: string): "6-8" | "9-10" | "11-12" | null {
  const num = parseInt(grade.replace(/\D/g, ""), 10)
  if (num >= 6 && num <= 8) return "6-8"
  if (num >= 9 && num <= 10) return "9-10"
  if (num >= 11 && num <= 12) return "11-12"
  return null
}

export function getConditionalQuestions(gradeGroup: "6-8" | "9-10" | "11-12"): Question[] {
  switch (gradeGroup) {
    case "6-8":
      return grade6to8Questions
    case "9-10":
      return grade9to10Questions
    case "11-12":
      return grade11to12Questions
  }
}

export function buildQuestionFlow(grade: string): Question[] {
  const gradeGroup = getGradeGroup(grade)
  if (!gradeGroup) return commonQuestions
  return [...commonQuestions, ...getConditionalQuestions(gradeGroup)]
}
