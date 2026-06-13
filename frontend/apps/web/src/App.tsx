import * as React from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Languages,
  Lightbulb,
  LogOut,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { copy, initialForm, steps } from "./data/mock-data"
import { LoginScreen } from "./screens/LoginScreen"
import { StepContent, getCanContinue } from "./screens/StudentFlow"
import { TeacherPrototype, TeacherSideNav } from "./screens/TeacherPrototype"
import type { FormState, Locale, PrototypeUser, StepId, TeacherTab } from "./types"

function App() {
  const [locale, setLocale] = React.useState<Locale>("vi")
  const [selectedUser, setSelectedUser] = React.useState<PrototypeUser | null>(null)
  const [teacherTab, setTeacherTab] = React.useState<TeacherTab>("launch")
  const [currentStep, setCurrentStep] = React.useState<StepId>("join")
  const [form, setForm] = React.useState<FormState>(initialForm)

  const stepIndex = steps.findIndex((step) => step.id === currentStep)
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100)
  const t = copy[locale]
  const isVietnamese = locale === "vi"
  const isTeacher = selectedUser?.role === "teacher"

  const handleLogin = (user: PrototypeUser) => {
    setSelectedUser(user)
    setTeacherTab("launch")
    setCurrentStep("join")
    setForm((current) => ({
      ...initialForm,
      alias: user.role === "student" ? user.name : current.alias,
    }))
  }

  const handleLogout = () => {
    setSelectedUser(null)
    setTeacherTab("launch")
    setCurrentStep("join")
    setForm(initialForm)
  }

  const updateForm = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const goTo = (offset: number) => {
    const nextStep = steps[Math.min(Math.max(stepIndex + offset, 0), steps.length - 1)]
    setCurrentStep(nextStep.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const canContinue = getCanContinue(currentStep, form)

  if (!selectedUser) {
    return (
      <LoginScreen
        locale={locale}
        onLocaleChange={() => setLocale(isVietnamese ? "en" : "vi")}
        onLogin={handleLogin}
      />
    )
  }

  return (
    <main className="min-h-svh bg-[#f7f5ee] text-[#202024] dark:bg-[#111213] dark:text-[#f5f4ef]">
      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col lg:grid lg:grid-cols-[290px_1fr]">
        <aside className="border-b border-[#ded8ca] bg-[#fffbf0] px-4 py-4 dark:border-white/10 dark:bg-[#18191b] lg:sticky lg:top-0 lg:h-svh lg:border-r lg:border-b-0 lg:px-5 lg:py-6">
          <div className="flex items-center justify-between gap-3 lg:block">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid size-8 place-items-center rounded-lg bg-[#1f7a68] text-white">
                  A4
                </span>
                {t.appName}
              </div>
              <p className="mt-2 hidden text-xs text-[#6d685e] dark:text-[#b9b3a8] sm:block">
                {t.classroom}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#d6cfbd] bg-white text-[#202024] hover:bg-[#f3ead8] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              onClick={() => setLocale(isVietnamese ? "en" : "vi")}
            >
              <Languages />
              {isVietnamese ? "EN" : "VI"}
            </Button>
          </div>

          <div className="mt-4 rounded-lg border border-[#d6cfbd] bg-white p-3 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6d685e] dark:text-[#c9c2b7]">
                  {isVietnamese ? "Đang đăng nhập" : "Signed in"}
                </p>
                <p className="mt-1 truncate text-sm font-semibold">
                  {selectedUser.label[locale]}
                </p>
                <p className="mt-1 text-xs text-[#6d685e] dark:text-[#c9c2b7]">
                  {selectedUser.role === "teacher"
                    ? isVietnamese
                      ? "Giáo viên"
                      : "Teacher"
                    : isVietnamese
                      ? "Học sinh"
                      : "Student"}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon-sm"
                className="border-[#d6cfbd] bg-white dark:border-white/15 dark:bg-white/5"
                aria-label={isVietnamese ? "Đổi user" : "Switch user"}
                onClick={handleLogout}
              >
                <LogOut />
              </Button>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-[#ded8ca] bg-white p-3 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#ffcf5a] text-[#202024]">
                <Lightbulb className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#88640d] dark:text-[#ffd978]">
                  {t.mission}
                </p>
                <h1 className="mt-1 text-base font-semibold leading-tight">
                  {t.missionTitle}
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#6d685e] dark:text-[#c9c2b7]">
                  {t.missionMeta}
                </p>
              </div>
            </div>
          </div>

          {isTeacher ? (
            <TeacherSideNav
              locale={locale}
              activeTab={teacherTab}
              onTabChange={setTeacherTab}
            />
          ) : (
            <>
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-medium text-[#6d685e] dark:text-[#c9c2b7]">
                  <span>
                    {t.step} {stepIndex + 1}/{steps.length}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e7dfcf] dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#1f7a68] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <nav className="mt-5 hidden gap-1 lg:grid">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = step.id === currentStep
                  const isDone = index < stepIndex

                  return (
                    <button
                      key={step.id}
                      className={cn(
                        "flex h-10 items-center gap-3 rounded-md px-3 text-left text-sm transition",
                        isActive
                          ? "bg-[#1f7a68] text-white"
                          : "text-[#57534b] hover:bg-[#f0e8d8] dark:text-[#d6d0c4] dark:hover:bg-white/10"
                      )}
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <Icon className="size-4" />
                      <span className="min-w-0 flex-1 truncate">
                        {step.label[locale]}
                      </span>
                      {isDone ? <Check className="size-4" /> : null}
                    </button>
                  )
                })}
              </nav>
            </>
          )}
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-[#ded8ca] bg-[#fffdf7]/90 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-[#151618]/90 sm:px-6">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#1f7a68] dark:text-[#72d3be]">
                  {isTeacher
                    ? "Teacher launch pad"
                    : `${t.student}: ${form.alias || "Guest"}`}
                </p>
                <p className="truncate text-sm font-semibold">
                  {isTeacher
                    ? isVietnamese
                      ? "Chạy một tiết học AI an toàn trong dưới 3 thao tác."
                      : "Run a responsible-AI lesson in under three actions."
                    : t.toolNotice}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#ded8ca] bg-white px-3 py-2 text-xs font-semibold dark:border-white/10 dark:bg-white/5">
                <span className="text-[#6d685e] dark:text-[#c9c2b7]">
                  {t.teacherCode}
                </span>
                <span>{form.classCode || "A4K-26"}</span>
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6 lg:py-8">
            {isTeacher ? (
              <TeacherPrototype
                locale={locale}
                activeTab={teacherTab}
                onTabChange={setTeacherTab}
              />
            ) : (
              <StepContent
                currentStep={currentStep}
                form={form}
                locale={locale}
                updateForm={updateForm}
              />
            )}
          </div>

          {isTeacher ? null : (
            <footer className="sticky bottom-0 border-t border-[#ded8ca] bg-[#fffdf7]/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-[#151618]/95 sm:px-6">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                <Button
                  variant="outline"
                  className="border-[#d6cfbd] bg-white dark:border-white/15 dark:bg-white/5"
                  disabled={stepIndex === 0}
                  onClick={() => goTo(-1)}
                >
                  <ArrowLeft />
                  {t.back}
                </Button>
                {currentStep === "receipt" ? (
                  <Button
                    className="bg-[#1f7a68] text-white hover:bg-[#176655]"
                    onClick={() => {
                      setForm(initialForm)
                      setCurrentStep("join")
                    }}
                  >
                    {t.reset}
                  </Button>
                ) : (
                  <Button
                    className="bg-[#1f7a68] text-white hover:bg-[#176655]"
                    disabled={!canContinue}
                    onClick={() => goTo(1)}
                  >
                    {t.next}
                    <ArrowRight />
                  </Button>
                )}
              </div>
            </footer>
          )}
        </section>
      </div>
    </main>
  )
}

export { App }
