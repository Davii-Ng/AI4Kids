import type { ElementType } from "react"
import {
  BarChart3,
  BookOpenCheck,
  Brain,
  ClipboardCheck,
  Eye,
  FileCheck2,
  Flag,
  LayoutDashboard,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react"

import type { FormState, Locale, PrototypeUser, StepId, TeacherTab } from "../types"

export const steps: { id: StepId; label: Record<Locale, string>; icon: ElementType }[] =
  [
    { id: "join", label: { vi: "Vào lớp", en: "Join" }, icon: UserRoundCheck },
    { id: "orient", label: { vi: "Định hướng", en: "Orient" }, icon: ShieldCheck },
    { id: "think", label: { vi: "Nghĩ trước", en: "Think" }, icon: Brain },
    { id: "ask", label: { vi: "Hỏi AI", en: "Ask" }, icon: Sparkles },
    { id: "response", label: { vi: "Đọc gợi ý", en: "Read" }, icon: Eye },
    { id: "check", label: { vi: "Kiểm chứng", en: "Check" }, icon: BookOpenCheck },
    { id: "protect", label: { vi: "Bảo mật", en: "Protect" }, icon: LockKeyhole },
    { id: "escalate", label: { vi: "Nhờ người", en: "Human" }, icon: Flag },
    { id: "revise", label: { vi: "Sửa lại", en: "Revise" }, icon: ClipboardCheck },
    { id: "receipt", label: { vi: "Biên nhận", en: "Receipt" }, icon: FileCheck2 },
  ]

export const copy = {
  vi: {
    appName: "AI4Kids",
    classroom: "Lớp 6A · Mission 02",
    mission: "Confidently Wrong",
    missionTitle: "Lên kế hoạch bữa trưa lành mạnh",
    missionMeta: "20 phút · 10-14 tuổi · Prototype dùng mock data",
    toolNotice: "AI là phần mềm gợi ý, không phải người bạn hay giáo viên.",
    next: "Tiếp tục",
    back: "Quay lại",
    reset: "Làm lại",
    student: "Học sinh",
    teacherCode: "Mã lớp",
    step: "Bước",
    receipt: "AI Use Receipt",
  },
  en: {
    appName: "AI4Kids",
    classroom: "Class 6A · Mission 02",
    mission: "Confidently Wrong",
    missionTitle: "Plan a healthy school lunch",
    missionMeta: "20 min · Ages 10-14 · Mock-data prototype",
    toolNotice: "AI is suggestion software, not a friend or teacher.",
    next: "Continue",
    back: "Back",
    reset: "Reset",
    student: "Student",
    teacherCode: "Class code",
    step: "Step",
    receipt: "AI Use Receipt",
  },
} satisfies Record<Locale, Record<string, string>>

export const initialForm: FormState = {
  alias: "Sao Bien",
  classCode: "A4K-26",
  preAttempt: "",
  goal: "Xin gợi ý để cải thiện kế hoạch bữa trưa, không viết hộ toàn bộ.",
  context: "Học sinh lớp 6 cần bữa trưa dễ chuẩn bị ở trường.",
  format: "3 gợi ý ngắn + 1 điều cần kiểm chứng.",
  claim: "",
  source: "",
  privacyChoice: "",
  escalationChoice: "",
  revision: "",
  disclosure: "",
}

export const prototypeUsers: PrototypeUser[] = [
  {
    id: "teacher-lan",
    name: "Co Lan",
    role: "teacher",
    label: { vi: "Cô Lan", en: "Ms. Lan" },
    description: {
      vi: "Giáo viên lớp 6A, chuẩn bị chạy mission Healthy School Lunch.",
      en: "Class 6A teacher preparing the Healthy School Lunch mission.",
    },
  },
  {
    id: "student-sao-bien",
    name: "Sao Bien",
    role: "student",
    label: { vi: "Sao Bien", en: "Sao Bien" },
    description: {
      vi: "Học sinh dùng bí danh, vào lớp bằng mã A4K-26.",
      en: "Student alias joining class with code A4K-26.",
    },
  },
]

export const mockMission = {
  response: {
    vi: [
      "Gợi ý bữa trưa: cơm, trứng, rau xanh, trái cây và nước lọc.",
      "Bạn có thể ghi tên trường Nguyễn Du và lớp 6A để AI biết khẩu phần phù hợp hơn.",
      "Một hộp nước ngọt có vitamin C nên được tính giống như một phần trái cây.",
      "Nếu bạn thấy chóng mặt sau khi ăn ít, hãy hỏi AI thực đơn ăn kiêng nhanh trong 7 ngày.",
    ],
    en: [
      "Lunch idea: rice, egg, green vegetables, fruit, and water.",
      "You can add Nguyen Du School and class 6A so AI understands the setting better.",
      "A vitamin-C soft drink should count the same as one serving of fruit.",
      "If you feel dizzy after eating less, ask AI for a quick 7-day diet menu.",
    ],
  },
  claims: {
    vi: [
      "Nước ngọt có vitamin C được tính như trái cây.",
      "Cơm, trứng, rau xanh, trái cây và nước lọc là bữa trưa cân bằng.",
      "AI cần biết tên trường và lớp để đưa lời khuyên tốt.",
    ],
    en: [
      "A vitamin-C soft drink counts as fruit.",
      "Rice, egg, vegetables, fruit, and water make a balanced lunch.",
      "AI needs the school and class name to give good advice.",
    ],
  },
  sources: {
    vi: [
      "Hỏi giáo viên / phụ huynh và xem tài liệu dinh dưỡng cho trẻ em.",
      "Tin ngay vì câu trả lời nghe rất tự tin.",
      "Chỉ hỏi AI thêm một lần nữa.",
    ],
    en: [
      "Ask a teacher / caregiver and check child nutrition guidance.",
      "Trust it because the answer sounds confident.",
      "Only ask AI one more time.",
    ],
  },
  privacy: {
    vi: [
      "Thay tên trường/lớp bằng: một trường THCS ở thành phố.",
      "Giữ nguyên tên trường vì AI cần thông tin cụ thể.",
      "Thêm họ tên đầy đủ để AI cá nhân hóa hơn.",
    ],
    en: [
      "Replace school/class with: a middle school in the city.",
      "Keep the school name because AI needs specific info.",
      "Add full name so AI can personalize more.",
    ],
  },
  escalation: {
    vi: [
      "Nói với giáo viên, phụ huynh hoặc nhân viên y tế nếu bị chóng mặt.",
      "Giữ bí mật và hỏi AI vì nhanh hơn.",
      "Thử thực đơn ăn kiêng 7 ngày rồi tính tiếp.",
    ],
    en: [
      "Tell a teacher, caregiver, or health professional if feeling dizzy.",
      "Keep it secret and ask AI because it is faster.",
      "Try the 7-day diet menu first and decide later.",
    ],
  },
}

export const teacherStudents = [
  {
    alias: "Sao Bien",
    status: "completed",
    progress: 100,
    think: true,
    checked: true,
    privacy: true,
    human: true,
    revised: true,
    flag: "ready",
  },
  {
    alias: "May Xanh",
    status: "checking",
    progress: 62,
    think: true,
    checked: false,
    privacy: true,
    human: false,
    revised: false,
    flag: "needs_check",
  },
  {
    alias: "Mat Troi",
    status: "protecting",
    progress: 76,
    think: true,
    checked: true,
    privacy: false,
    human: false,
    revised: false,
    flag: "privacy_followup",
  },
  {
    alias: "La Non",
    status: "joined",
    progress: 18,
    think: false,
    checked: false,
    privacy: false,
    human: false,
    revised: false,
    flag: "stuck",
  },
]

export const teacherTabs: { id: TeacherTab; label: Record<Locale, string>; icon: ElementType }[] =
  [
    { id: "launch", label: { vi: "Launch", en: "Launch" }, icon: Play },
    { id: "live", label: { vi: "Live class", en: "Live class" }, icon: LayoutDashboard },
    { id: "report", label: { vi: "Report", en: "Report" }, icon: BarChart3 },
    { id: "artifacts", label: { vi: "Kit", en: "Kit" }, icon: FileCheck2 },
  ]
