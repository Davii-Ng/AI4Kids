import "dotenv/config";
import express from "express";
import { prisma } from "./db.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "ai4kids-backend" });
});

app.get("/missions", async (_req, res, next) => {
  try {
    const missions = await prisma.mission.findMany({
      orderBy: { createdAt: "asc" }
    });
    res.json({ missions });
  } catch (error) {
    next(error);
  }
});

app.get("/classes/:code/report", async (req, res, next) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: { code: req.params.code },
      include: {
        attempts: {
          include: {
            mission: true,
            studentAlias: true
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });

    if (!classroom) {
      res.status(404).json({ error: "Classroom not found" });
      return;
    }

    res.json({ classroom });
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`AI4Kids backend listening on http://localhost:${port}`);
});
