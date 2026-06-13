import {
  CalendarDays,
  Check,
  Clock3,
  ClipboardCheck,
  Copy,
  Download,
  FileCheck2,
  Languages,
  Play,
  QrCode,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  UsersRound,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { teacherStudents, teacherTabs } from "../data/mock-data"
import type { Locale, TeacherTab } from "../types"
import {
  DashboardStat,
  FollowUp,
  InfoStrip,
  LaunchFact,
  MetricPill,
  Panel,
  Signal,
} from "../components/prototype-ui"

export function TeacherSideNav({
  locale,
  activeTab,
  onTabChange,
}: {
  locale: Locale
  activeTab: TeacherTab
  onTabChange: (tab: TeacherTab) => void
}) {
  const isVietnamese = locale === "vi"

  return (
    <>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <MetricPill
          label={isVietnamese ? "Sĩ số" : "Students"}
          value="24"
        />
        <MetricPill
          label={isVietnamese ? "Xong" : "Done"}
          value="18"
        />
        <MetricPill
          label={isVietnamese ? "Flag" : "Flags"}
          value="3"
        />
      </div>
      <nav className="mt-5 grid gap-1">
        {teacherTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.id === activeTab

          return (
            <button
              key={tab.id}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-left text-sm transition",
                isActive
                  ? "bg-[#1f7a68] text-white"
                  : "text-[#57534b] hover:bg-[#f0e8d8] dark:text-[#d6d0c4] dark:hover:bg-white/10"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="size-4" />
              <span className="min-w-0 flex-1 truncate">{tab.label[locale]}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}

export function TeacherPrototype({
  locale,
  activeTab,
  onTabChange,
}: {
  locale: Locale
  activeTab: TeacherTab
  onTabChange: (tab: TeacherTab) => void
}) {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2 lg:hidden">
        {teacherTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.id === activeTab

          return (
            <button
              key={tab.id}
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-semibold",
                isActive
                  ? "border-[#1f7a68] bg-[#1f7a68] text-white"
                  : "border-[#d6cfbd] bg-white dark:border-white/10 dark:bg-white/5"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="size-4" />
              {tab.label[locale]}
            </button>
          )
        })}
      </div>

      {activeTab === "launch" ? <TeacherLaunch locale={locale} /> : null}
      {activeTab === "live" ? <TeacherLiveClass locale={locale} /> : null}
      {activeTab === "report" ? <TeacherReport locale={locale} /> : null}
      {activeTab === "artifacts" ? <TeacherArtifacts locale={locale} /> : null}
    </div>
  )
}

function TeacherLaunch({ locale }: { locale: Locale }) {
  const isVietnamese = locale === "vi"

  return (
    <Panel
      eyebrow={isVietnamese ? "Teacher launch pad" : "Teacher launch pad"}
      title={
        isVietnamese
          ? "Chọn mission và bắt đầu lớp trong 3 thao tác"
          : "Choose a mission and start class in three actions"
      }
      description={
        isVietnamese
          ? "Prototype này mô phỏng luồng giáo viên: xem lesson flow, tạo mã lớp, và chuẩn bị hướng dẫn một trang."
          : "This prototype simulates the teacher flow: preview the lesson, generate a class code, and prepare a one-page guide."
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#88640d] dark:text-[#ffd978]">
                Confidently Wrong
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {isVietnamese
                  ? "Lên kế hoạch bữa trưa lành mạnh"
                  : "Plan a healthy school lunch"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#625d54] dark:text-[#c9c2b7]">
                {isVietnamese
                  ? "Học sinh bắt claim sai, thay chi tiết nhận dạng và biết khi nào cần người lớn."
                  : "Students catch a false claim, replace identifying details, and know when to involve a trusted human."}
              </p>
            </div>
            <span className="rounded-md bg-[#e4f3ed] px-3 py-1 text-xs font-semibold text-[#1f7a68] dark:bg-[#1f7a68]/20 dark:text-[#72d3be]">
              {isVietnamese ? "Khuyên dùng" : "Recommended"}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <LaunchFact
              icon={Clock3}
              label={isVietnamese ? "Thời lượng" : "Duration"}
              value="20 min"
            />
            <LaunchFact
              icon={UsersRound}
              label={isVietnamese ? "Độ tuổi" : "Age band"}
              value="10-14"
            />
            <LaunchFact
              icon={Languages}
              label={isVietnamese ? "Ngôn ngữ" : "Language"}
              value="VI / EN"
            />
          </div>

          <div className="mt-5 grid gap-3">
            {[
              isVietnamese
                ? "Think: học sinh tự nêu tiêu chí bữa trưa cân bằng."
                : "Think: students name what makes a balanced lunch.",
              isVietnamese
                ? "Ask: prompt builder Goal, Context, Format."
                : "Ask: Goal, Context, Format prompt builder.",
              isVietnamese
                ? "Check: phát hiện claim nước ngọt vitamin C thay trái cây."
                : "Check: catch the vitamin-C soft drink claim.",
              isVietnamese
                ? "Protect: thay tên trường/lớp bằng mô tả chung."
                : "Protect: replace school/class names with general context.",
              isVietnamese
                ? "Show: học sinh sửa lại và tạo AI Use Receipt."
                : "Show: students revise and generate an AI Use Receipt.",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6">
                <Check className="mt-1 size-4 shrink-0 text-[#1f7a68]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-[#dcd5c4] bg-[#fff8e8] p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold">
              {isVietnamese ? "Mã lớp đã tạo" : "Generated class code"}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-white p-3 dark:bg-black/20">
              <span className="font-mono text-2xl font-semibold">A4K-26</span>
              <Button size="icon" variant="outline" aria-label="Copy class code">
                <Copy />
              </Button>
            </div>
            <div className="mt-4 grid place-items-center rounded-lg border border-dashed border-[#c7bda8] bg-white py-6 dark:border-white/15 dark:bg-black/20">
              <QrCode className="size-16 text-[#1f7a68]" />
              <p className="mt-2 text-xs font-medium text-[#625d54] dark:text-[#c9c2b7]">
                {isVietnamese ? "QR mock cho lớp học" : "Mock classroom QR"}
              </p>
            </div>
            <Button className="mt-4 w-full bg-[#1f7a68] text-white hover:bg-[#176655]">
              <Play />
              {isVietnamese ? "Bắt đầu lớp" : "Start class"}
            </Button>
          </div>

          <InfoStrip
            icon={ShieldCheck}
            tone="green"
            title={isVietnamese ? "Giáo viên không thấy chat riêng" : "No private chat transcript"}
            body={
              isVietnamese
                ? "Dashboard chỉ hiển thị tín hiệu: attempted, checked, privacy, human help, revised."
                : "The dashboard only shows signals: attempted, checked, privacy, human help, revised."
            }
          />
        </div>
      </div>
    </Panel>
  )
}

function TeacherLiveClass({ locale }: { locale: Locale }) {
  const isVietnamese = locale === "vi"

  return (
    <Panel
      eyebrow={isVietnamese ? "Live completion view" : "Live completion view"}
      title={isVietnamese ? "Theo dõi tiến độ mà không đọc chat" : "Track progress without reading chats"}
      description={
        isVietnamese
          ? "Giáo viên thấy ai đang kẹt, ai cần follow-up, và lớp đang hoàn thành tới đâu."
          : "Teachers see who is stuck, who needs follow-up, and how far the class has progressed."
      }
    >
      <div className="grid gap-3 sm:grid-cols-4">
        <DashboardStat label={isVietnamese ? "Đã tham gia" : "Joined"} value="22/24" />
        <DashboardStat label={isVietnamese ? "Đã nghĩ trước" : "Attempted"} value="19" />
        <DashboardStat label={isVietnamese ? "Đã kiểm chứng" : "Checked"} value="14" />
        <DashboardStat label={isVietnamese ? "Cần hỗ trợ" : "Needs help"} value="3" />
      </div>

      <div className="overflow-hidden rounded-lg border border-[#dcd5c4] bg-white dark:border-white/10 dark:bg-white/5">
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 border-b border-[#e5ddce] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#6d685e] dark:border-white/10 dark:text-[#c9c2b7] sm:grid-cols-[1.2fr_1fr_1.4fr]">
          <span>{isVietnamese ? "Bí danh" : "Alias"}</span>
          <span>{isVietnamese ? "Tiến độ" : "Progress"}</span>
          <span className="hidden sm:block">{isVietnamese ? "Tín hiệu" : "Signals"}</span>
        </div>
        <div className="divide-y divide-[#eee6d7] dark:divide-white/10">
          {teacherStudents.map((student) => (
            <div
              key={student.alias}
              className="grid grid-cols-[1.1fr_0.9fr] items-center gap-3 px-4 py-4 sm:grid-cols-[1.2fr_1fr_1.4fr]"
            >
              <div>
                <p className="text-sm font-semibold">{student.alias}</p>
                <p className="mt-1 text-xs text-[#6d685e] dark:text-[#c9c2b7]">
                  {formatStudentStatus(student.status, locale)}
                </p>
              </div>
              <div>
                <div className="h-2 overflow-hidden rounded-full bg-[#e7dfcf] dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#1f7a68]"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs font-medium">{student.progress}%</p>
              </div>
              <div className="hidden flex-wrap gap-1 sm:flex">
                <Signal active={student.think} label="Think" />
                <Signal active={student.checked} label="Check" />
                <Signal active={student.privacy} label="Privacy" />
                <Signal active={student.human} label="Human" />
                <Signal active={student.revised} label="Revise" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function TeacherReport({ locale }: { locale: Locale }) {
  const isVietnamese = locale === "vi"
  const reportRows = [
    {
      label: isVietnamese ? "Phát hiện claim sai" : "False-claim detection",
      value: "78%",
      target: "70%",
    },
    {
      label: isVietnamese ? "Nhận diện rủi ro riêng tư" : "Privacy-risk recognition",
      value: "83%",
      target: "75%",
    },
    {
      label: isVietnamese ? "Chọn người hỗ trợ" : "Human escalation choice",
      value: "88%",
      target: "80%",
    },
    {
      label: isVietnamese ? "Có sửa bài có ý nghĩa" : "Meaningful revision",
      value: "64%",
      target: "60%",
    },
  ]

  return (
    <Panel
      eyebrow={isVietnamese ? "Class rubric" : "Class rubric"}
      title={isVietnamese ? "Báo cáo lớp cho giáo viên và nhà trường" : "Class report for teacher and school"}
      description={
        isVietnamese
          ? "Mock report ưu tiên tín hiệu học tập có thể hành động, không yêu cầu đọc từng đoạn chat."
          : "The mock report prioritizes actionable learning signals without requiring chat review."
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">
                {isVietnamese ? "Kết quả sau mission" : "Post-mission outcomes"}
              </p>
              <p className="mt-1 text-xs text-[#6d685e] dark:text-[#c9c2b7]">
                {isVietnamese ? "Lớp 6A · 13/06/2026" : "Class 6A · 13 Jun 2026"}
              </p>
            </div>
            <Button variant="outline" className="border-[#d6cfbd] bg-white dark:border-white/15 dark:bg-white/5">
              <Download />
              PDF
            </Button>
          </div>
          <div className="mt-4 grid gap-3">
            {reportRows.map((row) => (
              <div key={row.label} className="rounded-lg bg-[#f7f5ee] p-3 dark:bg-black/20">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{row.label}</span>
                  <span className="text-lg font-semibold text-[#1f7a68] dark:text-[#72d3be]">
                    {row.value}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#6d685e] dark:text-[#c9c2b7]">
                  {isVietnamese ? "Mục tiêu pilot" : "Pilot target"}: {row.target}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold">
              {isVietnamese ? "Học sinh cần follow-up" : "Students needing follow-up"}
            </p>
            <div className="mt-3 grid gap-2">
              <FollowUp alias="May Xanh" reason={isVietnamese ? "Chưa kiểm chứng claim sai" : "Did not verify the false claim"} />
              <FollowUp alias="Mat Troi" reason={isVietnamese ? "Chọn giữ tên trường trong prompt" : "Kept school name in prompt"} />
              <FollowUp alias="La Non" reason={isVietnamese ? "Chưa hoàn thành Think step" : "Has not completed Think step"} />
            </div>
          </div>

          <InfoStrip
            icon={SearchCheck}
            tone="yellow"
            title={isVietnamese ? "Tóm tắt cho leadership" : "Leadership summary"}
            body={
              isVietnamese
                ? "Phần lớn học sinh hoàn thành quy trình nghĩ trước, kiểm chứng và sửa lại. Cần củng cố privacy prompt ở nhóm nhỏ."
                : "Most students completed think, verify, and revise. A small group needs reinforcement on privacy-safe prompts."
            }
          />
        </div>
      </div>
    </Panel>
  )
}

function TeacherArtifacts({ locale }: { locale: Locale }) {
  const isVietnamese = locale === "vi"
  const artifacts = [
    {
      icon: ClipboardCheck,
      title: isVietnamese ? "One-page facilitation guide" : "One-page facilitation guide",
      body: isVietnamese
        ? "Mục tiêu, misconceptions, đáp án gợi ý và script hỏi cả lớp."
        : "Objectives, misconceptions, answer key, and whole-class prompts.",
    },
    {
      icon: ShieldCheck,
      title: isVietnamese ? "Classroom AI rules poster" : "Classroom AI rules poster",
      body: isVietnamese
        ? "Think first, check claims, protect private data, ask humans for high-stakes topics."
        : "Think first, check claims, protect private data, ask humans for high-stakes topics.",
    },
    {
      icon: FileCheck2,
      title: isVietnamese ? "Parent note and consent" : "Parent note and consent",
      body: isVietnamese
        ? "Giải thích kỹ năng học sinh luyện tập và dữ liệu không thu thập."
        : "Explains the skills students practice and the data not collected.",
    },
    {
      icon: CalendarDays,
      title: isVietnamese ? "Six-week pilot outline" : "Six-week pilot outline",
      body: isVietnamese
        ? "Lịch 4 mission, baseline/post check và school outcome summary."
        : "Four-mission schedule, baseline/post check, and school outcome summary.",
    },
  ]

  return (
    <Panel
      eyebrow={isVietnamese ? "Policy and parent kit" : "Policy and parent kit"}
      title={isVietnamese ? "Tài liệu sẵn dùng cho lớp và phụ huynh" : "Ready-to-use classroom and parent artifacts"}
      description={
        isVietnamese
          ? "Các artifact mock này giúp giáo viên triển khai mà không phải tự viết policy từ đầu."
          : "These mock artifacts help teachers run the lesson without writing policy material from scratch."
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {artifacts.map((artifact) => {
          const Icon = artifact.icon

          return (
            <div
              key={artifact.title}
              className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5"
            >
              <Icon className="size-5 text-[#1f7a68] dark:text-[#72d3be]" />
              <p className="mt-3 text-sm font-semibold">{artifact.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#625d54] dark:text-[#c9c2b7]">
                {artifact.body}
              </p>
              <Button variant="outline" className="mt-4 border-[#d6cfbd] bg-white dark:border-white/15 dark:bg-white/5">
                <Download />
                {isVietnamese ? "Tải mock" : "Download mock"}
              </Button>
            </div>
          )
        })}
      </div>
      <InfoStrip
        icon={RefreshCcw}
        tone="green"
        title={isVietnamese ? "Versioned safety content" : "Versioned safety content"}
        body={
          isVietnamese
            ? "Mọi nội dung policy/safety trong prototype có version và ngày review để phù hợp yêu cầu pilot."
            : "All policy and safety content in the prototype includes a version and review date for pilot readiness."
        }
      />
    </Panel>
  )
}

function formatStudentStatus(status: string, locale: Locale) {
  const vi: Record<string, string> = {
    completed: "Đã tạo receipt",
    checking: "Đang ở bước kiểm chứng",
    protecting: "Đang xử lý privacy",
    joined: "Mới vào lớp",
  }
  const en: Record<string, string> = {
    completed: "Receipt generated",
    checking: "Checking claim",
    protecting: "Handling privacy step",
    joined: "Just joined",
  }

  return locale === "vi" ? vi[status] : en[status]
}
