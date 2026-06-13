import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./db.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

// ── Helpers ───────────────────────────────────────────────────────────────────

const STEP_LABELS = ["Orientation", "Think", "Ask", "Check", "Protect", "Show", "Done"];

function deriveScore(a: {
  attemptedBeforeAi: boolean;
  checkedClaim: boolean;
  selectedCredibleSource: boolean;
  protectedPrivacy: boolean;
  selectedHumanHelp: boolean;
  revisedResult: boolean;
  disclosedAiRole: boolean;
}) {
  return (
    (a.attemptedBeforeAi     ? 1 : 0) +
    (a.checkedClaim           ? 1 : 0) +
    (a.selectedCredibleSource ? 1 : 0) +
    (a.protectedPrivacy       ? 1 : 0) +
    (a.selectedHumanHelp      ? 1 : 0) +
    (a.revisedResult          ? 1 : 0) +
    (a.disclosedAiRole        ? 1 : 0)
  );
}

function deriveStatus(score: number) {
  if (score >= 6) return "Ready to practise";
  if (score >= 4) return "Developing";
  return "Needs guided practice";
}

// ── Health ────────────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "ai4kids-backend" });
});

// ── Missions ──────────────────────────────────────────────────────────────────

app.get("/missions", async (_req, res, next) => {
  try {
    const missions = await prisma.mission.findMany({ orderBy: { createdAt: "asc" } });
    res.json({ missions });
  } catch (err) { next(err); }
});

app.get("/missions/:id", async (req, res, next) => {
  try {
    const mission = await prisma.mission.findUnique({ where: { id: req.params.id } });
    if (!mission) { res.status(404).json({ error: "Mission not found" }); return; }
    res.json({ mission });
  } catch (err) { next(err); }
});

// ── Classes ───────────────────────────────────────────────────────────────────

app.get("/classes/:code", async (req, res, next) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: { code: req.params.code.toUpperCase() },
      include: {
        organization: { select: { name: true } },
        students: { select: { id: true, alias: true, createdAt: true } },
      },
    });
    if (!classroom) { res.status(404).json({ error: "Classroom not found" }); return; }
    res.json({ classroom });
  } catch (err) { next(err); }
});

// Student joins and starts (or resumes) an attempt.
// Body: { alias, missionId? }
app.post("/classes/:code/attempts", async (req, res, next) => {
  try {
    const { alias, missionId } = req.body as { alias?: unknown; missionId?: unknown };

    if (typeof alias !== "string" || !alias.trim()) {
      res.status(400).json({ error: "alias is required" }); return;
    }
    if (alias.trim().length > 20) {
      res.status(400).json({ error: "alias must be 20 characters or fewer" }); return;
    }

    const resolvedMissionId =
      typeof missionId === "string" && missionId ? missionId : "confidently-wrong-lunch";

    const classroom = await prisma.classroom.findUnique({
      where: { code: req.params.code.toUpperCase() },
    });
    if (!classroom) { res.status(404).json({ error: "Classroom not found" }); return; }

    const mission = await prisma.mission.findUnique({ where: { id: resolvedMissionId } });
    if (!mission) { res.status(404).json({ error: "Mission not found" }); return; }

    // Upsert alias
    const studentAlias = await prisma.studentAlias.upsert({
      where: { classroomId_alias: { classroomId: classroom.id, alias: alias.trim() } },
      update: {},
      create: { classroomId: classroom.id, alias: alias.trim() },
    });

    // Resume an incomplete attempt or create a fresh one
    const existing = await prisma.missionAttempt.findFirst({
      where: { studentAliasId: studentAlias.id, missionId: resolvedMissionId, completedAt: null },
      orderBy: { createdAt: "desc" },
    });

    const attempt = existing ?? await prisma.missionAttempt.create({
      data: {
        classroomId:    classroom.id,
        missionId:      resolvedMissionId,
        studentAliasId: studentAlias.id,
      },
    });

    res.status(existing ? 200 : 201).json({
      attemptId:      attempt.id,
      studentAliasId: studentAlias.id,
      alias:          studentAlias.alias,
      resumed:        !!existing,
    });
  } catch (err) { next(err); }
});

// Live monitor — compact snapshot for teacher polling (every ~2s).
app.get("/classes/:code/live", async (req, res, next) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: { code: req.params.code.toUpperCase() },
      include: {
        attempts: {
          orderBy: { createdAt: "asc" },
          include: { studentAlias: { select: { alias: true } } },
        },
      },
    });
    if (!classroom) { res.status(404).json({ error: "Classroom not found" }); return; }

    const students = classroom.attempts.map((a) => ({
      alias:      a.studentAlias.alias,
      attemptId:  a.id,
      currentStep: a.currentStep,
      stepLabel:  a.completedAt ? "Done" : (STEP_LABELS[a.currentStep] ?? "Done"),
      isComplete: !!a.completedAt,
      signals: {
        attempted: a.attemptedBeforeAi,
        checked:   a.checkedClaim && a.selectedCredibleSource,
        protected: a.protectedPrivacy,
        escalated: a.selectedHumanHelp,
        revised:   a.revisedResult,
      },
    }));

    const tally = {
      total:     students.length,
      attempted: students.filter((s) => s.signals.attempted).length,
      checked:   students.filter((s) => s.signals.checked).length,
      protected: students.filter((s) => s.signals.protected).length,
      escalated: students.filter((s) => s.signals.escalated).length,
      revised:   students.filter((s) => s.signals.revised).length,
    };

    res.json({ code: classroom.code, name: classroom.name, students, tally });
  } catch (err) { next(err); }
});

// Teacher full report.
app.get("/classes/:code/report", async (req, res, next) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: { code: req.params.code.toUpperCase() },
      include: {
        organization: { select: { name: true } },
        attempts: {
          orderBy: { createdAt: "desc" },
          include: {
            mission:      { select: { id: true, title: true } },
            studentAlias: { select: { alias: true } },
          },
        },
      },
    });
    if (!classroom) { res.status(404).json({ error: "Classroom not found" }); return; }
    res.json({ classroom });
  } catch (err) { next(err); }
});

// ── Attempts ──────────────────────────────────────────────────────────────────

// Rehydrate a single attempt (for page refresh recovery).
app.get("/attempts/:id", async (req, res, next) => {
  try {
    const attempt = await prisma.missionAttempt.findUnique({
      where: { id: req.params.id },
      include: {
        studentAlias: { select: { alias: true } },
        mission:      { select: { id: true, title: true } },
        classroom:    { select: { code: true, name: true } },
      },
    });
    if (!attempt) { res.status(404).json({ error: "Attempt not found" }); return; }
    res.json({ attempt });
  } catch (err) { next(err); }
});

// Persist a signal as the student acts. Completed attempts are immutable.
// Body: any subset of signal booleans + currentStep + aiRole + completedAt
app.patch("/attempts/:id", async (req, res, next) => {
  try {
    const current = await prisma.missionAttempt.findUnique({ where: { id: req.params.id } });
    if (!current) { res.status(404).json({ error: "Attempt not found" }); return; }
    if (current.completedAt) { res.status(409).json({ error: "Attempt is already completed" }); return; }

    const body = req.body as Record<string, unknown>;

    const data: Record<string, unknown> = {};
    if (typeof body.currentStep           === "number")  data.currentStep           = body.currentStep;
    if (typeof body.aiRole                === "string")  data.aiRole                = body.aiRole;
    if (typeof body.attemptedBeforeAi     === "boolean") data.attemptedBeforeAi     = body.attemptedBeforeAi;
    if (typeof body.checkedClaim          === "boolean") data.checkedClaim          = body.checkedClaim;
    if (typeof body.selectedCredibleSource=== "boolean") data.selectedCredibleSource= body.selectedCredibleSource;
    if (typeof body.protectedPrivacy      === "boolean") data.protectedPrivacy      = body.protectedPrivacy;
    if (typeof body.selectedHumanHelp     === "boolean") data.selectedHumanHelp     = body.selectedHumanHelp;
    if (typeof body.revisedResult         === "boolean") data.revisedResult         = body.revisedResult;
    if (typeof body.disclosedAiRole       === "boolean") data.disclosedAiRole       = body.disclosedAiRole;
    if (body.completedAt === true || typeof body.completedAt === "string") {
      data.completedAt = body.completedAt === true ? new Date() : new Date(body.completedAt as string);
    }

    // Merge with current values to compute server-authoritative score
    const merged = { ...current, ...data } as typeof current;
    data.score  = deriveScore(merged);
    data.status = deriveStatus(data.score as number);

    const attempt = await prisma.missionAttempt.update({ where: { id: req.params.id }, data });
    res.json({ attempt });
  } catch (err) { next(err); }
});

// Shareable AI Use Receipt for a completed attempt.
app.get("/attempts/:id/receipt", async (req, res, next) => {
  try {
    const attempt = await prisma.missionAttempt.findUnique({
      where: { id: req.params.id },
      include: {
        studentAlias: { select: { alias: true } },
        mission:      { select: { title: true } },
        classroom:    { select: { code: true, name: true } },
      },
    });
    if (!attempt) { res.status(404).json({ error: "Attempt not found" }); return; }

    const aiRoleLabel: Record<string, string> = { hint: "Hint", draft: "Draft", final: "Final decision" };

    res.json({
      receipt: {
        missionTitle:           attempt.mission.title,
        alias:                  attempt.studentAlias.alias,
        classCode:              attempt.classroom.code,
        className:              attempt.classroom.name,
        startedAt:              attempt.createdAt,
        completedAt:            attempt.completedAt,
        attemptedBeforeAi:      attempt.attemptedBeforeAi,
        aiRole:                 attempt.aiRole ? (aiRoleLabel[attempt.aiRole] ?? attempt.aiRole) : null,
        checkedClaim:           attempt.checkedClaim,
        selectedCredibleSource: attempt.selectedCredibleSource,
        protectedPrivacy:       attempt.protectedPrivacy,
        selectedHumanHelp:      attempt.selectedHumanHelp,
        revisedResult:          attempt.revisedResult,
        disclosedAiRole:        attempt.disclosedAiRole,
        score:                  attempt.score,
        status:                 attempt.status,
      },
    });
  } catch (err) { next(err); }
});

// ── Error handler ─────────────────────────────────────────────────────────────

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`AI4Kids backend listening on http://localhost:${port}`);
});
