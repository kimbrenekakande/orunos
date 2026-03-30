import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Starting database seed...");

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
