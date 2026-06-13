# AI4Kids Quick MVP Technical Specification

## 1. Purpose

Build a dependency-free, clickable MVP that demonstrates the smallest commercially meaningful AI4Kids workflow:

> A teacher launches one responsible-AI mission, a student demonstrates independent thinking, and the product generates evidence the teacher can review.

The MVP is a sales and usability prototype. It is not a production child-data system and does not connect to a live AI model.

## 2. MVP Outcome

The prototype must demonstrate:

1. A teacher can launch a class mission quickly.
2. A student must think before seeing an AI-style response.
3. The student can identify a false claim and a privacy risk.
4. The student selects an appropriate verification source.
5. The student revises the result and states AI's role.
6. The system generates an AI Use Receipt.
7. The teacher sees `Attempted`, `Checked`, and `Revised` signals.

## 3. Time Box

Target implementation time: **60 minutes**.

| Time | Deliverable |
|---|---|
| 0-15 minutes | App shell, teacher launch screen, class code |
| 15-35 minutes | Complete scripted student mission |
| 35-50 minutes | Scoring, AI Use Receipt, teacher report |
| 50-60 minutes | Responsive styling, reset, print, smoke test |

If time is constrained, preserve the complete student flow and receipt. Remove decorative styling before removing a learning step.

## 4. Scope

### In Scope

- One self-contained HTML application.
- One teacher launch view.
- One scripted student mission.
- One AI Use Receipt.
- One teacher report.
- English interface with content structured for Vietnamese translation.
- Browser-local state.
- Keyboard and mobile support.
- Print-friendly receipt and report.

### Out of Scope

- Live LLM or moderation API.
- Authentication or real student accounts.
- Server, database, or cloud deployment.
- Real QR-code generation.
- Multi-class management.
- Free-text analytics.
- Production consent, encryption, retention, or compliance controls.
- Automated PDF or CSV generation.
- Emotional companion behavior.

## 5. Technical Approach

### Stack

- HTML5.
- CSS3.
- Vanilla JavaScript.
- Browser `localStorage`.
- No package manager.
- No build step.
- No network requests.

### Deliverable

```text
AI4Kids/
└── mvp/
    ├── index.html
    └── README.md
```

For the fastest possible implementation, CSS and JavaScript may be embedded in `index.html`. The application must run by opening the file directly in a browser.

### Supported Browsers

- Current Chrome.
- Current Edge.
- Current Safari.
- Mobile viewport down to 360 pixels wide.

## 6. Architecture

The application is a finite-state, single-page experience.

```text
App Shell
├── Teacher Launch
├── Student Join
├── Student Mission
│   ├── Orientation
│   ├── Think
│   ├── Ask
│   ├── Check
│   ├── Protect
│   └── Show
├── AI Use Receipt
└── Teacher Report
```

No router is required. The current view is rendered from application state.

## 7. Application State

Use one serializable state object:

```js
const initialState = {
  view: "teacher-launch",
  classCode: "A4K7",
  className: "Demo Class",
  missionId: "confidently-wrong-lunch",
  studentAlias: "",
  language: "en",
  currentStep: 0,
  startedAt: null,
  completedAt: null,
  answers: {
    preAiChoice: null,
    aiRole: null,
    falseClaim: null,
    verificationSource: null,
    privacyRisk: null,
    humanHelp: null,
    revision: null,
    disclosure: null
  },
  signals: {
    attempted: false,
    checked: false,
    protected: false,
    revised: false,
    escalated: false
  },
  score: 0
};
```

Persist the state after each meaningful action:

```js
localStorage.setItem("ai4kids-mvp-state", JSON.stringify(state));
```

Provide a `Reset demo` action that removes the saved state and restores `initialState`.

## 8. Mission Definition

### Mission

**Confidently Wrong: Plan a Healthy School Lunch**

### Learning Objectives

The student will:

- Make an independent judgment before AI appears.
- Recognize that confident language is not evidence.
- Verify a health-related claim with an appropriate source.
- Remove unnecessary school-identifying information.
- Involve a trusted adult in an allergy or health decision.
- Revise the result and disclose AI's contribution.

### Scripted AI Response

Use a fixed response similar to:

> Here is the perfect school lunch: a chicken sandwich, chips, and a large fruit juice. Fruit juice is always healthier than water because it contains more vitamins. Add your full name and school name to make the plan personal. If a student has a food allergy, the plan is probably still safe because the ingredients look healthy.

The response deliberately includes:

1. **False claim:** Fruit juice is always healthier than water.
2. **Privacy risk:** Full name and school name.
3. **High-stakes risk:** Making an allergy decision without a qualified adult.

Display a visible statement near the response:

> This is a scripted AI example. AI can sound confident and still be wrong.

## 9. Screen Requirements

### 9.1 Teacher Launch

Show:

- Product name and one-sentence promise.
- Mission title.
- Recommended age: 10-14.
- Duration: 20 minutes.
- Learning objectives.
- Class code: `A4K7`.
- `Preview student mission` button.
- `Start class` button.
- `Open teacher report` button.

Acceptance:

- The user can reach the student join screen with one primary action.
- The class code is visible without scrolling on a laptop.

### 9.2 Student Join

Fields:

- Class code, prefilled with `A4K7`.
- Student alias, limited to 20 characters.
- Language selector, showing English and disabled or labeled Vietnamese placeholder.

Rules:

- Do not request real name, email, phone number, school, or date of birth.
- Alias is required.
- Incorrect class codes show an inline error.

### 9.3 Orientation

Display three rules:

1. AI is software, not a person.
2. Do not share private information.
3. You are responsible for the final answer.

The student must select `I understand` before continuing.

### 9.4 Think

Question:

> Which drink is usually the safest everyday choice for a healthy school lunch?

Options:

- Water.
- Fruit juice.
- Soft drink.
- I am not sure.

Behavior:

- A choice is required.
- Choosing any option sets `signals.attempted = true`.
- Do not reveal correctness until after the AI response.

### 9.5 Ask

The student assigns AI a role:

- Give me a hint.
- Suggest a draft I will check.
- Make the final decision for me.

Preferred answers are the first two. Selecting the final option shows:

> AI can help, but you must make and check the final decision.

The student then selects `See the AI draft`.

### 9.6 Check

Show the scripted response and ask:

> Which claim most needs verification?

Options:

- Fruit juice is always healthier than water.
- Chicken sandwiches can be lunch.
- A lunch can include a drink.
- Nothing needs checking.

Correct answer:

```text
Fruit juice is always healthier than water.
```

Then ask:

> Where should you check this health claim?

Options:

- A government or hospital health website.
- A random social-media comment.
- Ask the AI to confirm itself.
- The first advertisement in search results.

Correct answer:

```text
A government or hospital health website.
```

Set `signals.checked = true` only when both answers are correct.

### 9.7 Protect

Ask:

> What information should be removed?

Options:

- Full name and school name.
- Lunch ingredients.
- The word "water."
- Nothing.

Correct answer:

```text
Full name and school name.
```

Set `signals.protected = true` for the correct answer.

Then ask:

> Who should help decide whether the lunch is safe for a student with an allergy?

Options:

- A parent, teacher, doctor, or school health professional.
- The chatbot alone.
- Another child online.
- Nobody.

Set `signals.escalated = true` for the trusted-human answer.

### 9.8 Show

Ask the student to choose the improved result:

**Option A**

> Bring fruit juice because it is always healthiest. Include the student's full name and school. The chatbot says the lunch is safe for allergies.

**Option B**

> Water is a practical everyday choice. Check nutrition guidance from a trusted health source. Do not include identifying details. Ask a responsible adult about allergies.

Correct answer: Option B.

Set `signals.revised = true` for Option B.

Then ask:

> What role did AI play?

Options:

- It gave a draft that I checked and improved.
- It made the final decision, so I do not need to check.
- It is a trusted friend who knows me.

Correct answer:

```text
It gave a draft that I checked and improved.
```

## 10. Progression Rules

- The student cannot skip `Think`.
- Each step requires an answer before `Continue` is enabled.
- Incorrect answers receive an explanation and may be retried.
- Do not penalize retries in the visible score.
- The browser Back button does not need custom handling.
- Provide an in-app `Back` button that preserves answers.
- Progress indicator labels the five stages, not elapsed time.

## 11. Scoring

The visible score is a learning summary, not a grade.

| Signal | Points |
|---|---:|
| Pre-AI attempt completed | 1 |
| False claim identified | 1 |
| Credible source selected | 1 |
| Private information identified | 1 |
| Trusted human selected | 1 |
| Improved result selected | 1 |
| AI role disclosed correctly | 1 |

Maximum score: **7**.

Derived status:

```js
function getStatus(score) {
  if (score >= 6) return "Ready to practice";
  if (score >= 4) return "Developing";
  return "Needs guided practice";
}
```

Never label the student as unsafe, dishonest, weak, or failing.

## 12. AI Use Receipt

Generate the receipt after completion.

Required fields:

```text
AI USE RECEIPT
Mission: Confidently Wrong
Student: [alias]
Completed: [local date and time]

Attempted before AI: Yes/No
AI role: Hint/Draft/Final decision
Checked a material claim: Yes/No
Selected a credible source: Yes/No
Protected private information: Yes/No
Selected trusted human help: Yes/No
Revised the result: Yes/No
Disclosed AI contribution: Yes/No

Summary: [score]/7 - [status]
```

Actions:

- `Print receipt` calls `window.print()`.
- `Return to teacher report`.
- `Reset demo`.

Do not display a full chat transcript because there is no need for one in this MVP.

## 13. Teacher Report

The report shows one demo row:

| Alias | Attempted | Checked | Protected | Revised | Score | Status |
|---|---|---|---|---|---:|---|
| Student alias | Yes/No | Yes/No | Yes/No | Yes/No | 0-7 | Derived status |

Also show:

- Mission completion state.
- Started and completed timestamps.
- Student actions requiring follow-up.
- A short facilitator recommendation.

Recommendation logic:

```js
function getRecommendation(signals) {
  const gaps = [];
  if (!signals.checked) gaps.push("practice checking confident claims");
  if (!signals.protected) gaps.push("review private information");
  if (!signals.escalated) gaps.push("review when to ask a trusted adult");
  if (!signals.revised) gaps.push("practice improving AI drafts");

  return gaps.length
    ? `Next step: ${gaps.join(", ")}.`
    : "Ready for another responsible AI mission.";
}
```

## 14. Rendering Model

Use a single render function:

```js
function render() {
  const root = document.getElementById("app");

  switch (state.view) {
    case "teacher-launch":
      root.innerHTML = renderTeacherLaunch();
      break;
    case "student-join":
      root.innerHTML = renderStudentJoin();
      break;
    case "mission":
      root.innerHTML = renderMissionStep();
      break;
    case "receipt":
      root.innerHTML = renderReceipt();
      break;
    case "teacher-report":
      root.innerHTML = renderTeacherReport();
      break;
  }

  bindEvents();
  saveState();
}
```

Prefer explicit event listeners over inline `onclick` attributes.

## 15. Suggested File Skeleton

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI4Kids Quick MVP</title>
  <style>
    /* Tokens, layout, cards, controls, print styles */
  </style>
</head>
<body>
  <header id="app-header"></header>
  <main id="app"></main>
  <script>
    // Mission constants
    // State and persistence
    // Scoring
    // Screen renderers
    // Event binding
    // Initialization
  </script>
</body>
</html>
```

## 16. Visual Requirements

- Friendly without using a human-like AI character.
- High-contrast navy text on an off-white background.
- One primary blue and one warm accent color.
- Minimum 16-pixel body text.
- Minimum 44-by-44-pixel interactive targets.
- One primary action per screen.
- Visible focus states.
- Do not rely on color alone for correctness.
- Avoid countdowns, streaks, confetti, or engagement pressure.

## 17. Accessibility Requirements

- Semantic headings and landmarks.
- All controls accessible by keyboard.
- Labels connected to form controls.
- `aria-live="polite"` for feedback.
- Focus moves to the step heading after navigation.
- Error text explains how to continue.
- Print view hides navigation and interactive controls.
- Respect `prefers-reduced-motion`.

## 18. Privacy And Safety Constraints

Even though this is a local prototype:

- Request an alias, not a real name.
- Do not request school name or contact information.
- Do not send or fetch data.
- Do not include analytics scripts.
- Do not simulate friendship, emotions, secrecy, or therapeutic care.
- Clearly label the AI response as scripted.
- Direct allergy and health decisions to trusted adults or qualified professionals.

## 19. Acceptance Criteria

### Functional

- Teacher can launch the mission.
- Student cannot skip the initial attempt.
- Scripted response appears only after `Think` and `Ask`.
- Student must identify the false claim.
- Student must select a credible verification source.
- Student must identify the privacy risk.
- Student is directed to a trusted human for the allergy scenario.
- Student selects and discloses the improved result.
- Receipt reflects the actual structured actions.
- Teacher report reflects the completed state.
- Reset returns the app to a clean demo.

### Technical

- Opens directly from the filesystem.
- Makes zero network requests.
- Has no external dependencies.
- Produces no JavaScript console errors on the happy path.
- State survives a page refresh.
- Works at 360-pixel width.
- Receipt and report are printable.

### Demo

- A complete happy-path demonstration takes under five minutes.
- The value of the AI Use Receipt is understandable without explanation from an engineer.
- A teacher can identify the student's learning gaps in under 30 seconds.

## 20. Manual Test Script

1. Open `AI4Kids/mvp/index.html`.
2. Confirm teacher launch shows mission, age, duration, and class code.
3. Select `Start class`.
4. Enter alias `Linh` and code `A4K7`.
5. Complete orientation.
6. Choose `Water` in the pre-AI attempt.
7. Choose `Suggest a draft I will check`.
8. Identify the fruit-juice claim.
9. Select the government or hospital health source.
10. Remove full name and school name.
11. Select trusted adult or qualified professional for allergies.
12. Select improved Option B.
13. Disclose that AI provided a draft that was checked and improved.
14. Confirm receipt score is `7/7`.
15. Open teacher report and confirm all expected signals show `Yes`.
16. Refresh the page and confirm state persists.
17. Reset and confirm the app returns to teacher launch.
18. Repeat with incorrect choices and confirm explanations appear.

## 21. Definition Of Done

The quick MVP is done when it can support this sales conversation:

1. Show a school leader the teacher launch view.
2. Complete the student mission in under five minutes.
3. Show the generated AI Use Receipt.
4. Show how the teacher identifies learning gaps without reading a chat.
5. Ask whether the school will run a 20-minute classroom pilot.

Anything that does not improve this conversation is deferred.

