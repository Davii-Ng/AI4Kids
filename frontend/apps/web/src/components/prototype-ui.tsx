import * as React from "react"
import { Check, GraduationCap } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

export function Panel({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-5">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1f7a68] dark:text-[#72d3be]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#625d54] dark:text-[#c9c2b7]">
          {description}
        </p>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  )
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <input
        className="h-11 rounded-lg border border-[#d6cfbd] bg-white px-3 text-sm outline-none transition placeholder:text-[#9a9283] focus:border-[#1f7a68] focus:ring-3 focus:ring-[#1f7a68]/20 dark:border-white/15 dark:bg-white/5 dark:placeholder:text-white/40"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <textarea
        className="min-h-32 resize-y rounded-lg border border-[#d6cfbd] bg-white px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-[#9a9283] focus:border-[#1f7a68] focus:ring-3 focus:ring-[#1f7a68]/20 dark:border-white/15 dark:bg-white/5 dark:placeholder:text-white/40"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

export function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => {
          const selected = value === option

          return (
            <button
              key={option}
              type="button"
              className={cn(
                "flex min-h-12 items-start gap-3 rounded-lg border p-3 text-left text-sm leading-6 transition",
                selected
                  ? "border-[#1f7a68] bg-[#e4f3ed] text-[#123c34] ring-3 ring-[#1f7a68]/15 dark:bg-[#1f7a68]/25 dark:text-white"
                  : "border-[#dcd5c4] bg-white hover:border-[#1f7a68]/60 dark:border-white/10 dark:bg-white/5"
              )}
              onClick={() => onChange(option)}
            >
              <span
                className={cn(
                  "mt-1 grid size-5 shrink-0 place-items-center rounded-full border",
                  selected ? "border-[#1f7a68] bg-[#1f7a68] text-white" : "border-[#b7ad99]"
                )}
              >
                {selected ? <Check className="size-3" /> : null}
              </span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function Principle({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType
  title: string
  body: string
}) {
  return (
    <div className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <Icon className="size-5 text-[#1f7a68] dark:text-[#72d3be]" />
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#625d54] dark:text-[#c9c2b7]">
        {body}
      </p>
    </div>
  )
}

export function InfoStrip({
  icon: Icon,
  tone,
  title,
  body,
}: {
  icon: React.ElementType
  tone: "green" | "yellow"
  title: string
  body: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        tone === "green"
          ? "border-[#b8d8cc] bg-[#e9f6f0] dark:border-[#1f7a68]/40 dark:bg-[#1f7a68]/15"
          : "border-[#ead48d] bg-[#fff8df] dark:border-[#ffcf5a]/30 dark:bg-[#ffcf5a]/10"
      )}
    >
      <div className="flex gap-3">
        <Icon className="mt-0.5 size-5 shrink-0 text-[#1f7a68] dark:text-[#72d3be]" />
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-6 text-[#4d4942] dark:text-[#ddd6ca]">
            {body}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ReceiptItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6d685e] dark:text-[#c9c2b7]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-6">{value}</p>
    </div>
  )
}

export function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#dcd5c4] bg-white px-2 py-3 text-center dark:border-white/10 dark:bg-white/5">
      <p className="text-lg font-semibold text-[#1f7a68] dark:text-[#72d3be]">
        {value}
      </p>
      <p className="mt-1 text-[11px] font-medium text-[#6d685e] dark:text-[#c9c2b7]">
        {label}
      </p>
    </div>
  )
}

export function LaunchFact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg bg-[#f7f5ee] p-3 dark:bg-black/20">
      <Icon className="size-4 text-[#1f7a68] dark:text-[#72d3be]" />
      <p className="mt-2 text-xs font-medium text-[#6d685e] dark:text-[#c9c2b7]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}

export function DashboardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#dcd5c4] bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6d685e] dark:text-[#c9c2b7]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#1f7a68] dark:text-[#72d3be]">
        {value}
      </p>
    </div>
  )
}

export function Signal({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-xs font-semibold",
        active
          ? "bg-[#e4f3ed] text-[#1f7a68] dark:bg-[#1f7a68]/20 dark:text-[#72d3be]"
          : "bg-[#f0e8d8] text-[#8a8274] dark:bg-white/10 dark:text-white/45"
      )}
    >
      {label}
    </span>
  )
}

export function FollowUp({ alias, reason }: { alias: string; reason: string }) {
  return (
    <div className="rounded-lg bg-[#f7f5ee] p-3 dark:bg-black/20">
      <div className="flex items-start gap-3">
        <GraduationCap className="mt-0.5 size-4 shrink-0 text-[#1f7a68] dark:text-[#72d3be]" />
        <div>
          <p className="text-sm font-semibold">{alias}</p>
          <p className="mt-1 text-xs leading-5 text-[#625d54] dark:text-[#c9c2b7]">
            {reason}
          </p>
        </div>
      </div>
    </div>
  )
}
