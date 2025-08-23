import { PrismaClient, ROLE, STATUS } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  const password = await bcrypt.hash("password123", 10);

  // --- Admin ---
  await prisma.users.create({
    data: {
      name: "Admin User",
      email: "admin@talenthub.com",
      password,
      role: ROLE.admin,
    },
  });

  // --- Employers ---
  const employers = await prisma.users.createMany({
    data: [
      {
        name: "Employer One",
        email: "employer1@talenthub.com",
        password,
        role: ROLE.employer,
      },
      {
        name: "Employer Two",
        email: "employer2@talenthub.com",
        password,
        role: ROLE.employer,
      },
      {
        name: "Employer Three",
        email: "employer3@talenthub.com",
        password,
        role: ROLE.employer,
      },
    ],
  });

  // Re-fetch employers to get IDs
  const employerUsers = await prisma.users.findMany({
    where: { role: ROLE.employer },
  });

  // --- Applicants ---
  const applicants = await prisma.users.createMany({
    data: [
      {
        name: "Applicant One",
        email: "applicant1@talenthub.com",
        password,
        role: ROLE.applicant,
      },
      {
        name: "Applicant Two",
        email: "applicant2@talenthub.com",
        password,
        role: ROLE.applicant,
      },
      {
        name: "Applicant Three",
        email: "applicant3@talenthub.com",
        password,
        role: ROLE.applicant,
      },
      {
        name: "Applicant Four",
        email: "applicant4@talenthub.com",
        password,
        role: ROLE.applicant,
      },
    ],
  });

  const applicantUsers = await prisma.users.findMany({
    where: { role: ROLE.applicant },
  });

  console.log("Users seeded!");

  // --- Jobs ---
  const jobTemplates = [
    {
      title: "Frontend Developer",
      description: "React/Next.js with 2+ years experience",
    },
    {
      title: "Backend Developer",
      description: "Node.js/Prisma/PostgreSQL experience required",
    },
    { title: "Fullstack Engineer", description: "React + Node.js all-rounder" },
    { title: "UI/UX Designer", description: "Mobile + Web portfolio a plus" },
    {
      title: "DevOps Engineer",
      description: "Docker, Kubernetes, CI/CD pipelines",
    },
  ];

  // Assign jobs to each employer
  for (const employer of employerUsers) {
    for (const job of jobTemplates) {
      await prisma.jobs.create({
        data: {
          title: job.title,
          description: job.description,
          createBy: employer.id,
        },
      });
    }
  }

  console.log("Jobs seeded!");

  // --- Applications ---
  const allJobs = await prisma.jobs.findMany();

  // Make each applicant apply to 2 jobs
  for (const applicant of applicantUsers) {
    await prisma.applications.create({
      data: {
        jobId: allJobs[Math.floor(Math.random() * allJobs.length)].id,
        userId: applicant.id,
        status: STATUS.applied,
      },
    });
    await prisma.applications.create({
      data: {
        jobId: allJobs[Math.floor(Math.random() * allJobs.length)].id,
        userId: applicant.id,
        status: STATUS.applied,
      },
    });
  }

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
