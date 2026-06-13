# Product Requirements Document: AI4Kids Paid Pilot MVP

## Objective

Enable a Vietnamese teacher to run a 20-minute responsible-AI lesson with minimal preparation and receive evidence that students thought before AI, checked the output, protected private information, and improved their work.

## Product Promise

**Students learn to use AI without surrendering judgment. Teachers see the process without reading private chats. Schools gain a ready-to-deploy policy and parent-trust program.**

## Target

- **Primary user:** Students ages 10-14.
- **Primary operator:** Classroom or learning-center teacher.
- **Economic buyer:** Principal, academic director, or center owner.
- **Trust stakeholder:** Parent or caregiver.
- **Initial geography:** Urban Vietnam.
- **Initial languages:** Vietnamese and English.

## Core Workflow

1. Teacher selects a mission and shares a class code.
2. Student joins with a pseudonym or roster alias.
3. Student completes a short pre-AI attempt.
4. Student builds or selects a prompt.
5. System returns a scripted AI-style response.
6. Student checks a claim, protects private data, and chooses when human help is needed.
7. Student revises the work and states AI's role.
8. System creates an AI Use Receipt and class-level rubric.

## Functional Requirements

### Teacher Launch Pad

- Select age band, language, mission, and delivery mode.
- Preview objective, lesson flow, expected misconceptions, and answer key.
- Start a class in under three actions.
- Generate a short class code and printable QR code.
- Provide a one-page facilitation guide and offline version.
- Reopen a previous class without rebuilding it.

### Student Access

- Join without email, phone number, or open profile.
- Display a persistent statement that AI is software, not a person.
- Choose Vietnamese or English and basic accessibility preferences.
- Work individually or in a teacher-enabled pair mode.
- Resume an interrupted scripted mission on the same device where practical.

### Think

- Require an initial answer, prediction, outline, or choice before revealing AI output.
- Keep the input short and structured.
- Explain that the attempt is a starting point, not a grade.
- Store only the minimum data needed for the receipt and pilot evaluation.

### Ask

- Build a prompt using Goal, Context, and Format.
- Provide hints that improve the request without completing the task.
- Detect seeded personal-data patterns such as full name, school name, phone number, address, account credentials, and precise location.
- Explain the risk and offer a safe replacement.

### Check

- Present a scripted response containing a known uncertainty or error.
- Require the student to select what needs checking.
- Offer age-appropriate trusted-source options.
- Require one evidence-based decision before continuing.
- Explain why fluency and confidence are not proof.

### Protect And Escalate

- Test whether the student recognizes private information.
- Include a scenario involving health, safety, strong emotions, or another high-stakes topic.
- Route the student toward a trusted or qualified human.
- Never simulate therapy, friendship, secrecy, or emotional dependency.
- Provide a teacher-visible safety flag only for predefined structured events.

### Show: AI Use Receipt

The receipt must show:

- Mission and completion date.
- Whether a pre-AI attempt was made.
- The role assigned to AI.
- Verification action taken.
- Privacy or escalation decision.
- Whether the student revised the result.
- Student's structured disclosure of AI contribution.

The receipt must not expose private chat content by default.

### Teacher Report

- Show completion and rubric signals by student alias.
- Highlight students needing follow-up.
- Show class-level pre/post results.
- Export a PDF or CSV summary.
- Avoid requiring manual review for the normal happy path.
- Include a plain-language summary suitable for school leadership.

### Policy And Parent Kit

- Customizable acceptable-use policy.
- Classroom rules poster.
- Parent introduction and consent template.
- Family discussion guide.
- Incident-response flow.
- Version number and review date on safety content.

## Pilot Missions

### 1. Homework Helper, Not Answer Machine

Student attempts a science explanation, then asks AI for a hint rather than a completed answer.

### 2. Confidently Wrong

Student identifies a plausible false claim and chooses a trusted way to verify it.

### 3. Private By Default

Student removes identifying details from a prompt while preserving useful context.

### 4. Who Should Help?

Student distinguishes low-risk AI assistance from situations requiring a teacher, parent, counselor, doctor, or emergency support.

## Non-Functional Requirements

- Meet WCAG 2.2 AA targets for pilot flows.
- Mobile-first and usable on current low-cost Android browsers.
- Core scripted content available after initial load on weak connections.
- All instructional audio has text equivalents.
- Keyboard-accessible supported flows.
- Encrypt data in transit and at rest.
- Separate organization, class, and pseudonymous learner data.
- Do not train models on learner data.
- Do not use behavioral advertising.
- Do not store unrestricted free text in analytics.
- Provide defined retention and deletion controls.
- Maintain an auditable version history for missions and interventions.

## Acceptance Criteria

- A teacher launches a class in under 5 minutes on first use and under 2 minutes after onboarding.
- A student joins with a class code in under 60 seconds.
- The student cannot skip the pre-AI attempt.
- Seeded personal data triggers an explanation and safe alternative.
- The Trust Check requires an active verification decision.
- The high-stakes scenario directs the student to a human.
- The AI Use Receipt accurately represents structured learning events.
- The teacher sees no private free-text conversation by default.
- A cached or printable mission can be completed during connectivity loss.
- Vietnamese copy is reviewed by local educators for age and classroom fit.

## Analytics Events

- Class created.
- Mission started and completed.
- Pre-AI attempt completed.
- Hint used.
- Privacy warning triggered and resolved.
- Claim selected for checking.
- Verification source selected.
- Human escalation selected.
- Revision completed.
- Receipt generated.
- Teacher report viewed.

No raw prompt or response text is included in product analytics.

## Success Criteria

### Student

- 80% mission completion.
- 70% correct seeded-error detection.
- 75% correct privacy-risk recognition.
- 80% correct high-stakes escalation.
- 60% make a meaningful revision after checking.

### Teacher

- Under 10 minutes median preparation.
- 80% would run another mission.
- 70% say the receipt improves visibility into student process.

### Buyer

- At least 2 of 3 pilots are paid or deposit-backed.
- At least 60% of completed pilots convert to annual intent or contract.

## Scope

### In Scope

- Four scripted missions.
- Two age bands.
- Vietnamese and English.
- Class-code access.
- AI Use Receipts and teacher reporting.
- Policy and parent kit.
- Baseline and post-pilot assessment.
- Printable fallback.

### Out Of Scope

- Unrestricted live AI.
- Student-to-student communication.
- Emotional companion features.
- Full LMS/SIS integrations.
- Automated grading of essays.
- Direct-to-consumer subscriptions.
- Medical, mental-health, legal, or financial advice.

## Open Validation Questions

- Which buyer trigger closes fastest: cheating, parent differentiation, teacher readiness, or policy compliance?
- Does the receipt need student text, structured choices, or both?
- Will schools accept pseudonymous access for a pilot?
- Which four missions align most naturally with existing class periods?
- What annual minimum contract supports founder-led sales and onboarding?
