export type Locale = "vi" | "en"
export type UserMode = "teacher" | "student"

export type PrototypeUser = {
  id: string
  name: string
  role: UserMode
  label: Record<Locale, string>
  description: Record<Locale, string>
}

export type StepId =
  | "join"
  | "orient"
  | "think"
  | "ask"
  | "response"
  | "check"
  | "protect"
  | "escalate"
  | "revise"
  | "receipt"

export type FormState = {
  alias: string
  classCode: string
  preAttempt: string
  goal: string
  context: string
  format: string
  claim: string
  source: string
  privacyChoice: string
  escalationChoice: string
  revision: string
  disclosure: string
}

export type TeacherTab = "launch" | "live" | "report" | "artifacts"
