# AI4Kids MVP Build Plan — Three Connected Workflows

## 0. The Pitch (read this first)

We build **one demo that runs in three browser windows side by side** and tells a single, complete story in under five minutes:

1. A **teacher** launches a responsible-AI mission and shares a class code.
2. A **student** joins and works through the mission — and the teacher's screen *lights up live* as they go.
3. A **school leader / parent** opens a Trust Dashboard and sees verifiable evidence of learning, plus a shareable AI Use Receipt — *without reading a single private chat*.

The "wow" is **three roles, one shared truth, updating in real time.** This is what closes a pilot: the buyer sees the operator, the user, and the trust stakeholder all served by the same product at the same moment.

This plan supersedes the single-file architecture in `09_quick_mvp_technical_spec.md` and the design summary previously in this file. It preserves the mission content, learning objectives, scoring, and privacy posture from `06_prd.md` and `09_quick_mvp_technical_spec.md`.

---

## 1. Architecture: Three Workflows, One Backbone

```text
                    ┌──────────────────────────────────────┐
                    │     Express + Prisma + SQLite          │
                    │     (shared classroom truth)           │
                    │  /missions  /classes/:code             │
                    │  /attempts  /classes/:code/report      │
                    │  /classes/:code/live                   │
                    └──────────────────────────────────────┘
                       ▲              ▲               ▲
        writes evidence│   reads live │      reads    │ reads aggregate
                       │              │               │
        ┌──────────────┴───┐  ┌───────┴──────┐  ┌─────┴───────────────┐
        │  WORKFLOW B       │  │  WORKFLOW A   │  │  WORKFLOW C          │
        │  STUDENT MISSION  │  │  TEACHER       │  │  LEADERSHIP / PARENT │
        │  (the learner)    │  │  LAUNCH+MONITOR│  │  TRUST DASHBOARD     │
        └──────────────────┘  └──────────────┘  └─────────────────────┘
```

The three workflows are **independent front-end journeys** that never talk to each other directly. They stay in sync only through the shared backend. That is the whole trick: each role gets a purpose-built experience, and the product feels alive because the same evidence flows to all three.

### Tech stack (already scaffolded — do not rebuild)
- **Frontend:** React + TypeScript + Tailwind in the existing Turbo monorepo (`frontend/`). Create one app `apps/web` with three top-level routes, one per workflow.
- **Backend:** Express + Prisma + SQLite in `backend/`. Extend the existing routes.
- **Sync mechanism:** lightweight polling (every 2s) on the teacher and leadership views. No websockets needed — polling is dead simple, demos perfectly on a laptop, and is invisible to the audience.

---

## 2. Shared Data Backbone (build this FIRST — everything depends on it)

The existing `MissionAttempt` model already carries the rubric. We keep it and add only what the receipt needs.

### Prisma change (`backend/prisma/schema.prisma`)
Extend `MissionAttempt`:
- `aiRole String?` — one of `hint`, `draft`, `final` (the role the student assigned to AI).
- `selectedCredibleSource Boolean @default(false)` — already partly covered by `checkedClaim`; keep both so the receipt can distinguish "spotted the claim" from "chose a trustworthy source."

Everything else (`attemptedBeforeAi`, `checkedClaim`, `protectedPrivacy`, `selectedHumanHelp`, `revisedResult`, `disclosedAiRole`, `score`, `status`, `completedAt`) already exists.

### API contract (extend `backend/src/index.ts`)
| Method | Route | Purpose | Used by |
|---|---|---|---|
| `GET` | `/missions` | list missions (exists) | A |
| `GET` | `/classes/:code` | class + roster | A, B |
| `POST` | `/classes/:code/attempts` | start/resume an attempt for an alias | B |
| `PATCH` | `/attempts/:id` | persist a signal as the student acts | B |
| `GET` | `/attempts/:id` | rehydrate after refresh | B |
| `GET` | `/classes/:code/live` | compact roster + per-student signal flags + step | **A (polls)** |
| `GET` | `/classes/:code/report` | full evidence + scores (exists) | **A, C** |
| `GET` | `/attempts/:id/receipt` | single shareable AI Use Receipt | **C** |

**Rules (carried from spec):** the server is the source of truth for `score` and `status` — it derives them from persisted signals, never trusting the client. Completed attempts are immutable. Rejoining resumes an incomplete attempt or starts a fresh one after completion. Zero personal data beyond a chosen alias.

### Scoring (server-derived, max 7) — unchanged from `09_quick_mvp_technical_spec.md` §11
`attemptedBeforeAi + checkedClaim + selectedCredibleSource + protectedPrivacy + selectedHumanHelp + revisedResult + disclosedAiRole`. Status: `>=6` Ready to practice · `>=4` Developing · else Needs guided practice. Never label a child as failing/unsafe.

---

## 3. WORKFLOW A — Teacher: Launch & Live Monitor

**Route:** `/teacher` · **Goal:** launch in under three clicks, then watch learning happen.

### A1. Launch Pad
- Product name + one-sentence promise.
- Mission card: *Confidently Wrong: Plan a Healthy School Lunch*, age 10–14, 20 min, learning objectives.
- Big class code `A4K7` (visible without scrolling) + a **"Project this"** join screen with the code in huge type for the room.
- Primary action: **Start class** → reveals the Live Monitor.
- Secondary: **Preview student mission**, **Open Trust Dashboard**.

### A2. Live Monitor (the showpiece)
Polls `GET /classes/:code/live` every 2s and renders one row per joined student:
- Alias · a row of **five signal pips** (Attempted · Checked · Protected · Escalated · Revised) that fill in as the student progresses.
- A current-step label ("On: Check").
- Live class tally: "3 of 4 students have caught the confident-but-wrong claim."
- A gentle **follow-up flag** only for predefined structured gaps (e.g. skipped escalation) — never free text.

**Why it lands:** the teacher literally watches the pips light up while the student (Workflow B) works in the next window. That is the demo's heartbeat.

### A3. Acceptance
- Reaches the join/projection screen in one primary action.
- Monitor reflects a student's progress within ~2s of each action.
- No private chat content ever shown.

---

## 4. WORKFLOW B — Student: The Guided Mission

**Route:** `/join` → `/mission` · **Goal:** the learner thinks before AI, checks it, protects themselves, and improves the work. This is the existing scripted flow — keep it intact; it is the proven core.

### Flow: Join → Orientation → Think → Ask → Check → Protect → Show → Receipt
- **Join:** alias (≤20 chars) + prefilled code `A4K7`. No real name/email/school. `POST /classes/:code/attempts`.
- **Orientation:** three rules (AI is software, not a person · don't share private info · you own the final answer).
- **Think:** independent drink choice *before* any AI → `PATCH attemptedBeforeAi=true`.
- **Ask:** assign AI a role (hint / draft / final). Choosing "final" shows the coaching nudge. → `PATCH aiRole`.
- **Check:** show the scripted, confidently-wrong response. Identify the false claim **and** pick a credible source → `PATCH checkedClaim`, `selectedCredibleSource`.
- **Protect:** remove name+school → `protectedPrivacy`; route the allergy decision to a trusted adult → `selectedHumanHelp`.
- **Show:** pick the improved result (Option B) → `revisedResult`; disclose AI's true role → `disclosedAiRole`.
- Each action PATCHes one signal so Workflow A updates live. State also mirrored to `localStorage` for instant refresh-recovery; the server stays authoritative.

### Scripted AI response (verbatim from `09_quick_mvp_technical_spec.md` §8)
Includes the planted false claim (juice > water), privacy bait (full name + school), and high-stakes trap (allergy decision without an adult). Always visibly labeled: *"This is a scripted AI example. AI can sound confident and still be wrong."*

### Acceptance
- Cannot skip Think; AI response appears only after Think + Ask.
- Wrong answers explain and allow retry; retries don't reduce the visible score.
- Works at 360px, keyboard-navigable, `aria-live` feedback.

---

## 5. WORKFLOW C — Leadership / Parent: Trust Dashboard

**Route:** `/leader` · **Goal:** give the *buyer and the trust stakeholder* proof of value without exposing children's chats. This is the workflow that converts a demo into a pilot.

### C1. Pilot Trust Dashboard (for the principal / buyer)
Reads `GET /classes/:code/report`:
- Plain-language headline: *"This class practiced checking AI before trusting it."*
- Class rubric bars: % who attempted before AI, caught the false claim, protected privacy, escalated correctly, revised.
- One-line per-student status (alias + derived status), follow-up list.
- A **policy & parent-trust footer**: links the acceptable-use posture and the "we never train on or expose student chats" guarantee — the compliance story the economic buyer needs.

### C2. Shareable AI Use Receipt (for the parent)
Reads `GET /attempts/:id/receipt` → a clean, **printable** card:
```text
AI USE RECEIPT
Mission: Confidently Wrong            Student: [alias]
Completed: [local date/time]
Attempted before AI:  Yes/No          AI role: Hint/Draft/Final
Checked a material claim: Yes/No      Chose a credible source: Yes/No
Protected private info: Yes/No        Asked a trusted adult: Yes/No
Revised the result: Yes/No            Disclosed AI's role: Yes/No
Summary: [score]/7 — [status]
```
- **Print receipt** → `window.print()` (print CSS hides nav).
- No chat transcript, by design.

### Acceptance
- A leader understands the class's learning gaps in under 30s.
- A parent understands the receipt with zero engineer explanation.
- Nothing on this screen reveals raw prompts or responses.

---

## 6. 60-Minute Build Timeline

| Time | Workflow | Deliverable |
|---|---|---|
| 0–12 min | Backbone | Prisma `aiRole`/`selectedCredibleSource` migration + seed; add `POST/PATCH/GET /attempts`, `/classes/:code/live`, `/attempts/:id/receipt`. Server-side scoring. |
| 12–20 min | A | Teacher Launch Pad + class code projection. |
| 20–38 min | B | Full student mission writing real signals to the API. |
| 38–48 min | A | Live Monitor polling `/live` — pips light up. |
| 48–56 min | C | Trust Dashboard + shareable/printable Receipt. |
| 56–60 min | All | Responsive pass, reset, print CSS, smoke test. |

**If time runs short:** protect the *connection between workflows* first (B writes → A sees it live), then the Receipt (C). Drop decorative styling before dropping any learning step or any cross-workflow live update — the live link is the entire pitch.

---

## 7. The Demo Script (this is what we rehearse)

Three windows open: **Teacher (A)** left, **Student (B)** center, **Leader (C)** right.

1. On A, click **Start class** → big code `A4K7`.
2. On B, join as `Linh`. *(A's monitor shows Linh appear.)*
3. On B, choose Water before AI. *(A's "Attempted" pip lights.)*
4. On B, reveal the confidently-wrong AI draft; catch the juice claim + pick a health-authority source. *(A's "Checked" pip lights; class tally ticks up.)*
5. On B, strip name/school and route the allergy call to an adult. *(A's "Protected" + "Escalated" pips light.)*
6. On B, pick the improved result and disclose AI's role → score 7/7, Receipt generated.
7. On C, refresh the Trust Dashboard → Linh's rubric is green; open her **AI Use Receipt** and **print** it.
8. Close: *"Operator, learner, and school leadership — all served by one product, in real time, with zero private chats exposed. Want to run a 20-minute pilot next week?"*

---

## 8. Verification

- `backend`: `yarn build` + typecheck; `prisma migrate` applies cleanly; seed creates class `A4K7` + the mission.
- `frontend`: `turbo build` + `turbo typecheck` pass for `apps/web`.
- Manual smoke (the §7 script): three windows, live pips update within ~2s, 7/7 receipt prints, refresh on B recovers state, reset returns to launch.
- Negative paths: bad class code → inline error; wrong mission answers → explain + retry; API down → friendly message, no crash.

No new automated test framework required.

---

## 9. Privacy & Safety (non-negotiable, from `06_prd.md`)

- Alias only — never request real name, email, phone, school, or DOB.
- No analytics scripts; no model training on student data; no behavioral ads.
- Scripted AI response is clearly labeled as scripted.
- Health/allergy and high-stakes decisions always routed to a qualified human.
- Receipts and dashboards expose **structured signals only** — never raw chat text.
- This is a local sales/usability prototype, **not** a production child-data system: no live LLM, no auth, no hosted deployment, no real QR generation.

---

## 10. Out of Scope (deferred)

Live LLM/moderation, authentication, multi-class management, Vietnamese localization (copy is centralized English, translation-ready), CSV/PDF export, real QR codes, websockets, cloud deployment. Anything that does not strengthen the §7 demo is deferred.
