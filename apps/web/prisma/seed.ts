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

  console.log("📝 Seeding sample documents...");
  const userId = "SMt8FhZLz3qpb5HwS1YYXGnlhgmO239u";
  const sampleDocuments = [
    {
      title: "Machine Learning Applications in Diagnostic Radiology",
      question: "Discuss the role of machine learning algorithms in improving diagnostic accuracy in medical imaging, including specific case studies and current limitations.",
      answer: "Machine learning has significantly enhanced diagnostic radiology through deep learning models capable of detecting anomalies in X-rays, MRIs, and CT scans with accuracy comparable to senior radiologists. Convolutional neural networks trained on thousands of annotated images can identify early-stage tumors, fractures, and vascular abnormalities within seconds. However, challenges remain in dataset bias, model interpretability, and regulatory approval, limiting widespread clinical adoption.",
      status: "READY" as const,
      cost: 5000,
      docTypeId: "coursework",
    },
    {
      title: "Climate Resilience Strategies for East African Agriculture",
      question: "Analyze the impact of climate change on agricultural productivity in East Africa and evaluate existing adaptation strategies.",
      answer: "East Africa's agricultural sector faces mounting threats from shifting rainfall patterns, rising temperatures, and increased frequency of extreme weather events. Smallholder farmers have adopted strategies such as drought-resistant crop varieties, improved water harvesting techniques, and agroforestry practices. Policy interventions including index-based insurance and early warning systems show promise, but scalability remains limited by infrastructure gaps and limited access to financing.",
      status: "READY" as const,
      cost: 10000,
      docTypeId: "research",
    },
    {
      title: "Zero Trust Architecture: A Case Study in Enterprise Security",
      question: "Evaluate the implementation of zero trust architecture in a large enterprise environment, covering challenges, outcomes, and best practices.",
      answer: "Zero trust architecture shifts security from perimeter-based defense to a model that verifies every access request regardless of origin. This case study examines a financial institution's transition to zero trust, implementing micro-segmentation, continuous authentication, and least-privilege access controls. The deployment reduced lateral movement in breach scenarios by 78% and simplified compliance reporting, though initial rollout required significant network restructuring and user training.",
      status: "READY" as const,
      cost: 6500,
      docTypeId: "case_study",
    },
    {
      title: "Quantum Computing: Current State and Future Directions",
      question: "Conduct a comprehensive literature review on quantum computing, covering theoretical foundations, current hardware capabilities, and projected applications.",
      answer: null,
      status: "GENERATING" as const,
      cost: 8000,
      docTypeId: "literature_review",
    },
    {
      title: "Sustainable Urban Development Framework for Kampala",
      question: "Propose a comprehensive framework for sustainable urban development tailored to rapidly growing cities in Sub-Saharan Africa, using Kampala as a case study.",
      answer: "This proposal outlines a multi-stakeholder framework integrating green infrastructure, transit-oriented development, and community-led planning for Kampala's urban expansion. Key components include decentralized waste-to-energy systems, mixed-use zoning to reduce commute distances, and participatory budgeting mechanisms. The framework projects a 30% reduction in carbon emissions and improved access to basic services for informal settlement residents within a decade of implementation.",
      status: "READY" as const,
      cost: 6000,
      docTypeId: "proposal",
    },
    {
      title: "The Role of Microfinance in Women's Economic Empowerment",
      question: "Examine how microfinance institutions contribute to women's economic empowerment in developing economies, including both successes and critiques.",
      answer: "Microfinance has enabled millions of women in developing economies to start small businesses, build savings, and gain financial independence. Group lending models leverage social capital to reduce default rates while fostering peer support networks. Critics argue that high interest rates and aggressive repayment schedules can trap borrowers in debt cycles, and that microfinance alone cannot address structural barriers such as property rights and educational disparities.",
      status: "READY" as const,
      cost: 7500,
      docTypeId: "fieldwork",
    },
  ];

  for (const doc of sampleDocuments) {
    const existing = await prisma.document.findFirst({
      where: { title: doc.title, userId },
    });
    if (!existing) {
      await prisma.document.create({
        data: {
          ...doc,
          userId,
        },
      });
    }
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
