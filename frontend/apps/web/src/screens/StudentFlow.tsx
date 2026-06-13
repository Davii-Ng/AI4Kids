import {
  AlertTriangle,
  BadgeCheck,
  BookOpenCheck,
  Brain,
  Flag,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react"

import { mockMission } from "../data/mock-data"
import type { FormState, Locale, StepId } from "../types"
import {
  InfoStrip,
  Field,
  OptionGroup,
  Panel,
  Principle,
  ReceiptItem,
  Textarea,
} from "../components/prototype-ui"

export function StepContent({
  currentStep,
  form,
  locale,
  updateForm,
}: {
  currentStep: StepId
  form: FormState
  locale: Locale
  updateForm: (field: keyof FormState, value: string) => void
}) {
  const isVietnamese = locale === "vi"

  if (currentStep === "join") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Không cần tài khoản" : "No account needed"}
        title={isVietnamese ? "Vào lớp bằng bí danh" : "Join with an alias"}
        description={
          isVietnamese
            ? "Prototype này chỉ lưu mock data trên màn hình để mô phỏng trải nghiệm học sinh."
            : "This prototype uses on-screen mock data to simulate the student experience."
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label={isVietnamese ? "Bí danh học sinh" : "Student alias"}
            value={form.alias}
            onChange={(value) => updateForm("alias", value)}
            placeholder="Sao Bien"
          />
          <Field
            label={isVietnamese ? "Mã lớp" : "Class code"}
            value={form.classCode}
            onChange={(value) => updateForm("classCode", value)}
            placeholder="A4K-26"
          />
        </div>
        <InfoStrip
          icon={ShieldCheck}
          tone="green"
          title={isVietnamese ? "Quyền riêng tư trước" : "Privacy first"}
          body={
            isVietnamese
              ? "Học sinh dùng bí danh. Giáo viên xem tín hiệu học tập, không cần đọc đoạn chat riêng."
              : "Students use aliases. Teachers see learning signals, not private chat transcripts."
          }
        />
      </Panel>
    )
  }

  if (currentStep === "orient") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Trước khi bắt đầu" : "Before starting"}
        title={isVietnamese ? "AI không tự biết đúng sai" : "AI does not know right from wrong"}
        description={
          isVietnamese
            ? "Nhiệm vụ hôm nay là dùng AI có suy nghĩ: tự thử trước, hỏi rõ, kiểm chứng, bảo vệ thông tin cá nhân."
            : "Today's mission is thoughtful AI use: try first, ask clearly, verify, and protect private information."
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Principle
            icon={Brain}
            title={isVietnamese ? "Nghĩ trước AI" : "Think before AI"}
            body={
              isVietnamese
                ? "Câu trả lời đầu tiên là điểm xuất phát, không phải điểm số."
                : "Your first answer is a starting point, not a grade."
            }
          />
          <Principle
            icon={BookOpenCheck}
            title={isVietnamese ? "Kiểm chứng điều đáng nghi" : "Check what feels doubtful"}
            body={
              isVietnamese
                ? "Câu văn nghe tự tin không có nghĩa là đúng."
                : "Confident wording does not prove something is true."
            }
          />
          <Principle
            icon={LockKeyhole}
            title={isVietnamese ? "Ẩn thông tin riêng" : "Hide private details"}
            body={
              isVietnamese
                ? "Không đưa họ tên, trường, số điện thoại, địa chỉ hoặc tài khoản."
                : "Do not share names, school, phone, address, or account details."
            }
          />
          <Principle
            icon={Flag}
            title={isVietnamese ? "Biết khi nào cần người lớn" : "Know when humans should help"}
            body={
              isVietnamese
                ? "Sức khỏe, an toàn và cảm xúc mạnh cần người đáng tin cậy."
                : "Health, safety, and strong feelings need a trusted human."
            }
          />
        </div>
      </Panel>
    )
  }

  if (currentStep === "think") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Think" : "Think"}
        title={
          isVietnamese
            ? "Tự chọn trước: bữa trưa cân bằng cần gì?"
            : "Choose first: what makes a balanced lunch?"
        }
        description={
          isVietnamese
            ? "Viết 2-3 ý của em trước khi xem gợi ý AI."
            : "Write 2-3 ideas before seeing AI suggestions."
        }
      >
        <Textarea
          label={isVietnamese ? "Ý tưởng ban đầu" : "First attempt"}
          value={form.preAttempt}
          onChange={(value) => updateForm("preAttempt", value)}
          placeholder={
            isVietnamese
              ? "Ví dụ: cơm hoặc bánh mì, chất đạm, rau, trái cây, nước lọc..."
              : "Example: rice or bread, protein, vegetables, fruit, water..."
          }
        />
        <InfoStrip
          icon={BadgeCheck}
          tone="yellow"
          title={isVietnamese ? "Không chấm điểm ở bước này" : "This is not graded"}
          body={
            isVietnamese
              ? "Mục tiêu là giữ suy nghĩ của em trước khi AI ảnh hưởng đến câu trả lời."
              : "The goal is to keep your own thinking visible before AI influences the answer."
          }
        />
      </Panel>
    )
  }

  if (currentStep === "ask") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Ask" : "Ask"}
        title={isVietnamese ? "Dựng prompt bằng 3 phần" : "Build a 3-part prompt"}
        description={
          isVietnamese
            ? "AI hữu ích hơn khi em nói rõ mục tiêu, bối cảnh và định dạng mong muốn."
            : "AI is more useful when you state the goal, context, and output format."
        }
      >
        <div className="grid gap-4">
          <Field
            label={isVietnamese ? "Goal · Mục tiêu" : "Goal"}
            value={form.goal}
            onChange={(value) => updateForm("goal", value)}
            placeholder={isVietnamese ? "Em muốn AI giúp gì?" : "What should AI help with?"}
          />
          <Field
            label={isVietnamese ? "Context · Bối cảnh" : "Context"}
            value={form.context}
            onChange={(value) => updateForm("context", value)}
            placeholder={isVietnamese ? "Bối cảnh an toàn, không riêng tư" : "Safe, non-private context"}
          />
          <Field
            label={isVietnamese ? "Format · Định dạng" : "Format"}
            value={form.format}
            onChange={(value) => updateForm("format", value)}
            placeholder={isVietnamese ? "Muốn nhận câu trả lời kiểu gì?" : "What format do you want?"}
          />
        </div>
        <div className="rounded-lg border border-[#dcd5c4] bg-[#fff8e8] p-4 text-sm leading-6 dark:border-white/10 dark:bg-white/5">
          <p className="font-semibold">{isVietnamese ? "Prompt xem trước" : "Prompt preview"}</p>
          <p className="mt-2 text-[#4d4942] dark:text-[#ddd6ca]">
            {form.goal} {form.context} {form.format}
          </p>
        </div>
      </Panel>
    )
  }

  if (currentStep === "response") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Scripted AI response" : "Scripted AI response"}
        title={isVietnamese ? "Đọc kỹ: có lỗi được cài sẵn" : "Read carefully: seeded issues included"}
        description={
          isVietnamese
            ? "Đây là phản hồi mô phỏng, không gọi AI thật. Một số câu nghe hợp lý nhưng cần kiểm chứng."
            : "This is a simulated response, not live AI. Some lines sound reasonable but need checking."
        }
      >
        <div className="grid gap-3">
          {mockMission.response[locale].map((line, index) => (
            <div
              key={line}
              className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#ddebe4] text-sm font-semibold text-[#1f7a68] dark:bg-[#1f7a68]/25 dark:text-[#72d3be]">
                  {index + 1}
                </span>
                <p className="text-sm leading-6">{line}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    )
  }

  if (currentStep === "check") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Check" : "Check"}
        title={isVietnamese ? "Chọn điều cần kiểm chứng" : "Choose what needs checking"}
        description={
          isVietnamese
            ? "Một câu sai thường trông rất tự tin. Em chọn claim và cách kiểm chứng."
            : "A false claim can look confident. Choose a claim and a verification route."
        }
      >
        <OptionGroup
          label={isVietnamese ? "Điều nào đáng nghi nhất?" : "Which claim is most suspicious?"}
          options={mockMission.claims[locale]}
          value={form.claim}
          onChange={(value) => updateForm("claim", value)}
        />
        <OptionGroup
          label={isVietnamese ? "Cách kiểm chứng tốt nhất" : "Best verification route"}
          options={mockMission.sources[locale]}
          value={form.source}
          onChange={(value) => updateForm("source", value)}
        />
        {form.claim ? (
          <InfoStrip
            icon={AlertTriangle}
            tone="yellow"
            title={isVietnamese ? "Gợi ý phản biện" : "Critical thinking cue"}
            body={
              isVietnamese
                ? "Nước ngọt có thêm vitamin không tự động thay thế trái cây thật."
                : "A soft drink with added vitamins does not automatically replace real fruit."
            }
          />
        ) : null}
      </Panel>
    )
  }

  if (currentStep === "protect") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Protect" : "Protect"}
        title={isVietnamese ? "Sửa thông tin riêng trước khi gửi" : "Fix private details before sending"}
        description={
          isVietnamese
            ? "Phản hồi mô phỏng đã gợi ý dùng tên trường/lớp. Em chọn cách thay thế an toàn."
            : "The simulated response suggested using school/class names. Choose a safer replacement."
        }
      >
        <OptionGroup
          label={isVietnamese ? "Cách xử lý thông tin riêng" : "Private information decision"}
          options={mockMission.privacy[locale]}
          value={form.privacyChoice}
          onChange={(value) => updateForm("privacyChoice", value)}
        />
        <InfoStrip
          icon={LockKeyhole}
          tone="green"
          title={isVietnamese ? "Mẫu an toàn" : "Safe pattern"}
          body={
            isVietnamese
              ? "Nói đủ bối cảnh để AI hữu ích, nhưng thay chi tiết nhận dạng bằng mô tả chung."
              : "Give enough context to be useful, but replace identifying details with general descriptions."
          }
        />
      </Panel>
    )
  }

  if (currentStep === "escalate") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Human help" : "Human help"}
        title={isVietnamese ? "Khi nào cần người đáng tin cậy?" : "When should a trusted human help?"}
        description={
          isVietnamese
            ? "AI không phải nơi xử lý vấn đề sức khỏe, an toàn hoặc tình huống nguy cơ cao."
            : "AI is not the right place for health, safety, or high-stakes situations."
        }
      >
        <OptionGroup
          label={isVietnamese ? "Nếu bạn bị chóng mặt sau khi ăn ít..." : "If you feel dizzy after eating less..."}
          options={mockMission.escalation[locale]}
          value={form.escalationChoice}
          onChange={(value) => updateForm("escalationChoice", value)}
        />
      </Panel>
    )
  }

  if (currentStep === "revise") {
    return (
      <Panel
        eyebrow={isVietnamese ? "Show" : "Show"}
        title={isVietnamese ? "Sửa kế hoạch và nói rõ vai trò của AI" : "Revise and name AI's role"}
        description={
          isVietnamese
            ? "Biên nhận sẽ chỉ tóm tắt hành động học tập, không hiện toàn bộ chat."
            : "The receipt summarizes learning actions, not a full chat transcript."
        }
      >
        <Textarea
          label={isVietnamese ? "Kế hoạch sau khi kiểm chứng" : "Revised plan"}
          value={form.revision}
          onChange={(value) => updateForm("revision", value)}
          placeholder={
            isVietnamese
              ? "Ví dụ: Giữ cơm/trứng/rau/trái cây/nước lọc, bỏ ý nước ngọt thay trái cây..."
              : "Example: Keep rice/egg/vegetables/fruit/water, remove the soft-drink-as-fruit idea..."
          }
        />
        <Textarea
          label={isVietnamese ? "AI đã giúp phần nào?" : "What did AI contribute?"}
          value={form.disclosure}
          onChange={(value) => updateForm("disclosure", value)}
          placeholder={
            isVietnamese
              ? "Ví dụ: AI gợi ý cấu trúc, em kiểm chứng và sửa claim sai."
              : "Example: AI suggested structure; I checked and fixed the false claim."
          }
        />
      </Panel>
    )
  }

  return (
    <Panel
      eyebrow={locale === "vi" ? "Hoàn thành" : "Complete"}
      title={locale === "vi" ? "AI Use Receipt của em" : "Your AI Use Receipt"}
      description={
        locale === "vi"
          ? "Mock receipt này là bằng chứng học tập cho giáo viên, không phải transcript riêng tư."
          : "This mock receipt is learning evidence for the teacher, not a private transcript."
      }
    >
      <div className="grid gap-3 md:grid-cols-2">
        <ReceiptItem label={locale === "vi" ? "Bí danh" : "Alias"} value={form.alias} />
        <ReceiptItem
          label={locale === "vi" ? "Mission" : "Mission"}
          value={locale === "vi" ? "Bữa trưa lành mạnh" : "Healthy school lunch"}
        />
        <ReceiptItem
          label={locale === "vi" ? "Nghĩ trước AI" : "Pre-AI attempt"}
          value={form.preAttempt ? (locale === "vi" ? "Đã hoàn thành" : "Completed") : "-"}
        />
        <ReceiptItem
          label={locale === "vi" ? "Kiểm chứng" : "Verification"}
          value={form.source || "-"}
        />
        <ReceiptItem
          label={locale === "vi" ? "Bảo vệ riêng tư" : "Privacy decision"}
          value={form.privacyChoice || "-"}
        />
        <ReceiptItem
          label={locale === "vi" ? "Nhờ người hỗ trợ" : "Human escalation"}
          value={form.escalationChoice || "-"}
        />
      </div>
      <div className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-sm font-semibold">{locale === "vi" ? "Tuyên bố vai trò AI" : "AI role disclosure"}</p>
        <p className="mt-2 text-sm leading-6 text-[#4d4942] dark:text-[#ddd6ca]">
          {form.disclosure || "-"}
        </p>
      </div>
    </Panel>
  )
}

export function getCanContinue(step: StepId, form: FormState) {
  if (step === "join") return Boolean(form.alias.trim() && form.classCode.trim())
  if (step === "think") return form.preAttempt.trim().length >= 8
  if (step === "ask") return Boolean(form.goal.trim() && form.context.trim() && form.format.trim())
  if (step === "check") return Boolean(form.claim && form.source)
  if (step === "protect") return Boolean(form.privacyChoice)
  if (step === "escalate") return Boolean(form.escalationChoice)
  if (step === "revise") return Boolean(form.revision.trim() && form.disclosure.trim())
  return true
}
