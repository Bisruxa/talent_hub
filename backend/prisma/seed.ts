import { PrismaClient, ROLE, STATUS } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  // --- Users ---
  const password = await bcrypt.hash("password123", 10);

  const admin = await prisma.users.create({
    data: {
      name: "Admin User",
      email: "admin@talenthub.com",
      password,
      role: ROLE.admin,
    },
  });

  const employer = await prisma.users.create({
    data: {
      name: "Employer One",
      email: "employer@talenthub.com",
      password,
      role: ROLE.employer,
    },
  });

  const applicant = await prisma.users.create({
    data: {
      name: "Applicant One",
      email: "applicant@talenthub.com",
      password,
      role: ROLE.applicant,
    },
  });

  console.log("Users seeded!");

  // --- Jobs ---
  const job1 = await prisma.jobs.create({
    data: {
      title: "Frontend Developer",
      description: "Looking for a React developer with 2+ years experience",
      createBy: employer.id,
    },
  });

  const job2 = await prisma.jobs.create({
    data: {
      title: "Backend Developer",
      description:
        "Looking for a Node.js developer with Express and Prisma experience",
      createBy: employer.id,
    },
  });

  console.log("Jobs seeded!");

  // --- Applications ---
  await prisma.applications.create({
    data: {
      jobId: job1.id,
      userId: applicant.id,
      status: STATUS.applied,
    },
  });

  await prisma.applications.create({
    data: {
      jobId: job2.id,
      userId: applicant.id,
      status: STATUS.applied,
    },
  });

  console.log("Applications seeded!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
