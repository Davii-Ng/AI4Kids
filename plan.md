# AI4Kids Quick MVP Design Document

## Summary

Create `AI4Kids/10_quick_mvp_design.md` as the authoritative MVP design. It supersedes the single-file architecture in `09_quick_mvp_technical_spec.md` while preserving its mission flow and learning objectives.

The MVP is a local sales/usability demo built with the existing React, Express, Prisma, and SQLite scaffold.

## Key Design

- One seeded class (`A4K7`) and scripted healthy-lunch mission.
- Multiple pseudonymous student aliases.
- Flow: Join -> Think -> Ask -> Check -> Protect -> Show -> Receipt.
- Teacher report displays persisted evidence and scores.
- English-first copy centralized for future Vietnamese localization.
- React manages navigation and local recovery; Express persists evidence and derives scores.

### API

- `GET /api/missions`
- `GET /api/classes/:code`
- `POST /api/classes/:code/attempts`
- `PATCH /api/attempts/:id`
- `GET /api/attempts/:id`
- `GET /api/classes/:code/report`

Completed attempts are immutable. Rejoining resumes an incomplete attempt or creates a new one after completion.

### Data Model

Extend `MissionAttempt` with:

- `selectedCredibleSource Boolean`
- `aiRole String?`, restricted to `hint`, `draft`, or `final`

The server calculates score and status from persisted signals.

## Document Contents

- Product objective, audience, success criteria, and non-goals.
- Screen-by-screen student and teacher experience.
- Component boundaries and application state flow.
- API contracts, data ownership, and Prisma changes.
- Scoring, receipt, and teacher-report derivation.
- Refresh recovery, invalid codes, unavailable API, and empty-state behavior.
- Privacy, accessibility, responsive, and print requirements.
- Explicit statement that this is not a production child-data system.

## Verification

Require frontend/backend build and typecheck checks plus a concise manual smoke test covering:

- Happy-path mission completion.
- Incorrect-answer feedback.
- Multiple aliases.
- Refresh recovery.
- Receipt and report accuracy.
- API failure messaging.
- Keyboard navigation, printing, and 360-pixel layout.

No new automated test framework is required.

## Assumptions

- Local developer-laptop runtime only.
- No authentication, live AI, class creation, real-time updates, exports, or hosted deployment.
- SQLite and the seeded demo data remain.
- Only the new Markdown design document is added; existing product documents remain unchanged.
