import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.upsert({
    where: { id: "demo-org" },
    update: {},
    create: {
      id: "demo-org",
      name: "AI4Kids Demo School"
    }
  });

  await prisma.classroom.upsert({
    where: { code: "A4K7" },
    update: {},
    create: {
      code: "A4K7",
      name: "Demo Class",
      organizationId: organization.id
    }
  });

  await prisma.mission.upsert({
    where: { id: "confidently-wrong-lunch" },
    update: {},
    create: {
      id: "confidently-wrong-lunch",
      title: "Confidently Wrong: Plan a Healthy School Lunch",
      ageBand: "10-14",
      durationMin: 20,
      isScripted: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
