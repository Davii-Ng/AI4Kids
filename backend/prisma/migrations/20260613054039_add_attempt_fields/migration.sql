-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MissionAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classroomId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "studentAliasId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "attemptedBeforeAi" BOOLEAN NOT NULL DEFAULT false,
    "aiRole" TEXT,
    "checkedClaim" BOOLEAN NOT NULL DEFAULT false,
    "selectedCredibleSource" BOOLEAN NOT NULL DEFAULT false,
    "protectedPrivacy" BOOLEAN NOT NULL DEFAULT false,
    "selectedHumanHelp" BOOLEAN NOT NULL DEFAULT false,
    "revisedResult" BOOLEAN NOT NULL DEFAULT false,
    "disclosedAiRole" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Needs guided practice',
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MissionAttempt_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MissionAttempt_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MissionAttempt_studentAliasId_fkey" FOREIGN KEY ("studentAliasId") REFERENCES "StudentAlias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MissionAttempt" ("attemptedBeforeAi", "checkedClaim", "classroomId", "completedAt", "createdAt", "disclosedAiRole", "id", "missionId", "protectedPrivacy", "revisedResult", "score", "selectedHumanHelp", "status", "studentAliasId") SELECT "attemptedBeforeAi", "checkedClaim", "classroomId", "completedAt", "createdAt", "disclosedAiRole", "id", "missionId", "protectedPrivacy", "revisedResult", "score", "selectedHumanHelp", "status", "studentAliasId" FROM "MissionAttempt";
DROP TABLE "MissionAttempt";
ALTER TABLE "new_MissionAttempt" RENAME TO "MissionAttempt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
