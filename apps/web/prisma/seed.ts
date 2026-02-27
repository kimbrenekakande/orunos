import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Starting database seed...");

  // Seed Institutions
  const institutions = [
    {
      name: "Makerere University",
      country: "Uganda",
      address: "University Road, Kampala",
    },
    {
      name: "Kyambogo University",
      country: "Uganda",
      address: "Kyambogo, Kampala",
    },
    {
      name: "Kampala International University",
      country: "Uganda",
      address: "Ggaba Road, Kampala",
    },
    {
      name: "Uganda Christian University",
      country: "Uganda",
      address: "Mukono",
    },
    {
      name: "Harvard University",
      country: "United States",
      address: "Cambridge, MA 02138",
    },
    {
      name: "Stanford University",
      country: "United States",
      address: "Stanford, CA 94305",
    },
    {
      name: "University of Oxford",
      country: "United Kingdom",
      address: "Wellington Square, Oxford OX1 2JD",
    },
    {
      name: "University of Cambridge",
      country: "United Kingdom",
      address: "The Old Schools, Trinity Ln, Cambridge CB2 1TN",
    },
  ];

  console.log("📚 Seeding institutions...");
  for (const institution of institutions) {
    await prisma.institution.upsert({
      where: { name: institution.name },
      update: {},
      create: institution,
    });
  }

  // Seed Document Types
  const docTypes = [
    {
      type: "coursework",
      name: "Coursework",
      description: "Academic coursework and assignments",
      price: 5000,
    },
    {
      type: "fieldwork",
      name: "Field Work",
      description: "Field research and practical studies",
      price: 7500,
    },
    {
      type: "research",
      name: "Research Paper",
      description: "Academic research papers and articles",
      price: 10000,
    },
    {
      type: "thesis",
      name: "Thesis",
      description: "Master's and PhD thesis documents",
      price: 25000,
    },
    {
      type: "dissertation",
      name: "Dissertation",
      description: "Doctoral dissertation and dissertation",
      price: 35000,
    },
    {
      type: "proposal",
      name: "Research Proposal",
      description: "Research proposals and concept papers",
      price: 6000,
    },
    {
      type: "literature_review",
      name: "Literature Review",
      description: "Comprehensive literature reviews",
      price: 8000,
    },
    {
      type: "case_study",
      name: "Case Study",
      description: "Case study analysis and reports",
      price: 6500,
    },
  ];

  console.log("📄 Seeding document types...");
  for (const docType of docTypes) {
    await prisma.docType.upsert({
      where: { type: docType.type },
      update: {},
      create: docType,
    });
  }

  // Seed a demo user
  const makerere = await prisma.institution.findUnique({
    where: { name: "Makerere University" },
  });

  console.log("👤 Seeding demo user...");
  await prisma.user.upsert({
    where: { email: "demo@orunos.com" },
    update: {},
    create: {
      id: "demo-user-001",
      name: "Demo User",
      email: "demo@orunos.com",
      emailVerified: true,
      balance: 50000,
      institutionId: makerere?.id,
      admin: false,
    },
  });

  // Seed an admin user
  const oxford = await prisma.institution.findUnique({
    where: { name: "University of Oxford" },
  });

  console.log("👨‍💼 Seeding admin user...");
  await prisma.user.upsert({
    where: { email: "admin@orunos.com" },
    update: {},
    create: {
      id: "admin-user-001",
      name: "Admin User",
      email: "admin@orunos.com",
      emailVerified: true,
      balance: 100000,
      institutionId: oxford?.id,
      admin: true,
    },
  });

  // Seed sample transactions
  console.log("💰 Seeding transactions...");
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@orunos.com" },
  });

  if (demoUser) {
    const transactions = [
      {
        id: "txn-001",
        amount: 50000,
        type: "DEPOSIT",
        description: "Initial deposit",
        userId: demoUser.id,
      },
      {
        id: "txn-002",
        amount: 5000,
        type: "WITHDRAWAL",
        description: "Coursework document generation",
        userId: demoUser.id,
      },
    ];

    for (const txn of transactions) {
      await prisma.transaction.upsert({
        where: { id: txn.id },
        update: {},
        create: txn,
      });
    }
  }

  // Seed sample documents
  console.log("📝 Seeding sample documents...");
  if (demoUser) {
    const courseworkType = await prisma.docType.findUnique({
      where: { type: "coursework" },
    });

    const researchType = await prisma.docType.findUnique({
      where: { type: "research" },
    });

    const documents = [
      {
        id: "doc-001",
        docTypeId: courseworkType?.type || "coursework",
        title: "Introduction to Computer Science",
        question: "Discuss the fundamental concepts of computer science",
        answer: null,
        status: "READY",
        cost: 5000,
        userId: demoUser.id,
      },
      {
        id: "doc-002",
        docTypeId: researchType?.type || "research",
        title: "Machine Learning in Healthcare",
        question: "Analyze the impact of machine learning on healthcare outcomes",
        answer: null,
        status: "GENERATING",
        cost: 10000,
        userId: demoUser.id,
      },
    ];

    for (const doc of documents) {
      await prisma.document.upsert({
        where: { id: doc.id },
        update: {},
        create: doc,
      });
    }
  }

  console.log("✅ Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
