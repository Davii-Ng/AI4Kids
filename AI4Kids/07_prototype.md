# Prototype Plan: AI4Kids

## Prototype Goal

Test the narrowest commercially meaningful promise:

> A teacher can launch one responsible-AI lesson quickly, students demonstrate independent thinking, and the resulting evidence is valuable enough for a school to buy.

## Fidelity

Build a bilingual mid-fidelity clickable prototype with scripted responses and realistic school-facing artifacts. It should feel complete enough for a paid-pilot sales conversation but avoid live model integration.

## End-To-End Flow

```text
School leader preview
  -> Policy kit and outcome promise
  -> Teacher selects mission
  -> Class code generated
  -> Student joins
  -> Think: pre-AI attempt
  -> Ask: guided prompt
  -> Scripted AI response
  -> Check: catch and verify an error
  -> Protect: remove private data / choose human help
  -> Show: revise and disclose AI's role
  -> AI Use Receipt
  -> Teacher class report
  -> Buyer pilot outcome summary
```

## Prototype Mission

**Confidently Wrong: Plan a Healthy School Lunch**

The student first chooses what makes a balanced lunch. The simulated AI then proposes a plan containing:

- One plausible but false nutrition claim.
- A request or example that includes school-identifying information.
- A recommendation that should be checked with a trusted adult or qualified source.

The student verifies, removes private data, revises the plan, and states what AI contributed.

This mission is concrete, culturally adaptable, and tests all core behaviors without requiring advanced subject knowledge.

## Screens

### Buyer Preview

- Problem and promise.
- Six-week pilot scope.
- Example policy kit.
- Sample outcome report.
- Pricing placeholder.

### Teacher

- Mission library with objective, duration, and age band.
- One-page lesson preview.
- Class-code launch.
- Live completion view.
- Class rubric and students-needing-help view.
- Exportable report.

### Student

- Join and language choice.
- "AI is a tool, not a person" orientation.
- Pre-AI attempt.
- Goal, Context, Format prompt builder.
- Simulated response.
- Claim-selection and source-choice check.
- Personal-data correction.
- Human-help decision.
- Revision and AI-role disclosure.
- AI Use Receipt.

### Parent Artifact

- Plain-language skill summary.
- Five-minute offline discussion prompt.
- No chat transcript or screen-time score.

## Interaction Principles

- Student must act before AI responds.
- Every correction explains the reason and a safer alternative.
- No human-like avatar, typing theatrics, affection, secrecy, or relationship language.
- Progress is based on completed reasoning actions, not time in product.
- Human discussion is part of the mission, not an error state.
- Teacher view prioritizes three signals: attempted, checked, revised.
- Controls remain usable on small screens and shared devices.

## Faked Backend

- Predefined class and student aliases.
- Scripted prompt options and AI response.
- Seeded error and privacy patterns.
- Predetermined rubric scoring.
- Mock policy customization.
- Mock class and buyer outcome reports.
- Local state only for the clickable test.

## Test Sessions

### Student Usability

- 12 students: 6 ages 10-11 and 6 ages 12-14.
- Test Vietnamese-first comprehension and tone.
- Observe whether the pre-AI step preserves initiative.

### Teacher Workflow

- 6 teachers across English, science, and digital skills.
- Ask each to prepare and launch without facilitator coaching.
- Measure preparation time and report usefulness.

### Buyer Conversation

- 5 school leaders or center owners.
- Show pilot scope, artifacts, and three price anchors.
- Ask for a next meeting, pilot agreement, or deposit rather than general feedback.

### Parent Trust

- 6 parents.
- Compare AI Use Receipt against chat transcript and screen-time report.
- Test whether the non-companion positioning is clear.

## Usability Tasks

1. Teacher chooses and launches the correct mission.
2. Student joins without an account.
3. Student makes a pre-AI attempt.
4. Student catches the false claim.
5. Student selects a credible verification route.
6. Student removes identifying information.
7. Student chooses human help for the high-stakes element.
8. Student revises and accurately states AI's role.
9. Teacher identifies who needs follow-up.
10. Buyer explains why the school would or would not pay.

## Decision Rules

- Simplify any student step where more than 2 of 6 users in an age band need rescue.
- Split wording by age if either band calls it childish or confusing.
- Redesign teacher setup if median first-use launch exceeds 5 minutes.
- Reduce the receipt if fewer than 4 of 6 teachers use it correctly within 2 minutes.
- Change the commercial offer if fewer than 2 of 5 buyers accept a concrete pilot follow-up.
- Do not add live AI unless the scripted flow produces both learning evidence and buying intent.

## Prototype Deliverables

- Clickable bilingual student flow.
- Clickable teacher launch and report.
- Sample AI Use Receipt.
- Sample school policy kit.
- Sample parent communication.
- One-page paid pilot offer.
- Test script and evidence scorecard.
