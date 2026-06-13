import {
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  Languages,
  LockKeyhole,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"

import { prototypeUsers } from "../data/mock-data"
import type { Locale, PrototypeUser } from "../types"
import { InfoStrip, LaunchFact } from "../components/prototype-ui"

export function LoginScreen({
  locale,
  onLocaleChange,
  onLogin,
}: {
  locale: Locale
  onLocaleChange: () => void
  onLogin: (user: PrototypeUser) => void
}) {
  const isVietnamese = locale === "vi"

  return (
    <main className="min-h-svh bg-[#f7f5ee] text-[#202024] dark:bg-[#111213] dark:text-[#f5f4ef]">
      <div className="mx-auto grid min-h-svh w-full max-w-6xl content-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <section className="flex flex-col justify-center">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="grid size-9 place-items-center rounded-lg bg-[#1f7a68] text-white">
                A4
              </span>
              AI4Kids
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#d6cfbd] bg-white text-[#202024] hover:bg-[#f3ead8] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              onClick={onLocaleChange}
            >
              <Languages />
              {isVietnamese ? "EN" : "VI"}
            </Button>
          </div>

          <div className="mt-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1f7a68] dark:text-[#72d3be]">
              {isVietnamese ? "Prototype login" : "Prototype login"}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              {isVietnamese
                ? "Chọn user mock để vào đúng giao diện"
                : "Choose a mock user to enter the right interface"}
            </h1>
            <p className="mt-4 text-sm leading-6 text-[#625d54] dark:text-[#c9c2b7]">
              {isVietnamese
                ? "Chưa cần auth thật. Màn này mô phỏng role routing: giáo viên vào launch/report, học sinh vào mission Healthy School Lunch."
                : "No real auth yet. This screen simulates role routing: teachers enter launch/report, students enter the Healthy School Lunch mission."}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <LaunchFact
              icon={ShieldCheck}
              label={isVietnamese ? "Dữ liệu" : "Data"}
              value="Mock"
            />
            <LaunchFact
              icon={UsersRound}
              label={isVietnamese ? "User" : "Users"}
              value="2"
            />
            <LaunchFact
              icon={BookOpenCheck}
              label={isVietnamese ? "Mission" : "Mission"}
              value="Lunch"
            />
          </div>
        </section>

        <section className="rounded-lg border border-[#dcd5c4] bg-[#fffdf7] p-4 shadow-sm dark:border-white/10 dark:bg-[#18191b] sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-[#e5ddce] pb-4 dark:border-white/10">
            <div>
              <p className="text-sm font-semibold">
                {isVietnamese ? "Đăng nhập nhanh" : "Quick sign in"}
              </p>
              <p className="mt-1 text-xs text-[#6d685e] dark:text-[#c9c2b7]">
                {isVietnamese
                  ? "Chọn một persona để xem UI tương ứng."
                  : "Pick a persona to view the matching UI."}
              </p>
            </div>
            <UserRoundCheck className="size-5 text-[#1f7a68] dark:text-[#72d3be]" />
          </div>

          <div className="mt-4 grid gap-3">
            {prototypeUsers.map((user) => {
              const Icon = user.role === "teacher" ? GraduationCap : UserRoundCheck

              return (
                <button
                  key={user.id}
                  type="button"
                  className="rounded-lg border border-[#dcd5c4] bg-white p-4 text-left transition hover:border-[#1f7a68] hover:bg-[#f7f5ee] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  onClick={() => onLogin(user)}
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#e4f3ed] text-[#1f7a68] dark:bg-[#1f7a68]/20 dark:text-[#72d3be]">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold">
                          {user.label[locale]}
                        </span>
                        <span className="rounded-md bg-[#fff1c8] px-2 py-1 text-xs font-semibold text-[#88640d] dark:bg-[#ffcf5a]/15 dark:text-[#ffd978]">
                          {user.role === "teacher"
                            ? isVietnamese
                              ? "Teacher"
                              : "Teacher"
                            : isVietnamese
                              ? "Student"
                              : "Student"}
                        </span>
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#625d54] dark:text-[#c9c2b7]">
                        {user.description[locale]}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-[#1f7a68]" />
                  </div>
                </button>
              )
            })}
          </div>

          <InfoStrip
            icon={LockKeyhole}
            tone="green"
            title={isVietnamese ? "Prototype only" : "Prototype only"}
            body={
              isVietnamese
                ? "Không gửi form, không gọi backend, không lưu tài khoản thật."
                : "No form submission, no backend calls, no real account storage."
            }
          />
        </section>
      </div>
    </main>
  )
}
