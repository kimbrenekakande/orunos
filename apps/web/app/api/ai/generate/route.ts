import { NextRequest, NextResponse } from "next/server";
import { serverSession } from "@/lib/server-session";
import { prisma } from "@/lib/prisma-client";


export const maxDuration = 120;
const agentsURL = "http://127.0.0.1:8000/api/v1"

export async function POST(request: NextRequest) {
  const session = await serverSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 })
  }
  const user = session.user

  const body = await request.json();
  const documentType = body.paperType;
  const questions = body.prompt;

  if (!documentType) return NextResponse.json({ error: 'Document type is required', status: 400 });
  if (!questions) return NextResponse.json({ error: 'Prompt is required', status: 400 });

  // Validate doc type exists
  const type = await prisma.docType.findUnique({
    where: { type: documentType },
  });

  if (!type) {
    return NextResponse.json({ error: `Invalid document type: "${documentType}"`, status: 400 });
  }

  // Create placeholder document
  const doc = await prisma.document.create({
    data: {
      title: "",
      question: questions,
      answer: "",
      cost: type.price,
      status: "GENERATING",
      userId: user.id,
      docTypeId: type.type,
    },
  });

  // Kick off agents microservice (don't block the response)
  fetch(`${agentsURL}/fast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      docID : doc.id,
      docType: doc.docTypeId,
      question: questions,
    }),
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`Agents responded with ${res.status}`);
      const data = await res.json();
      const sections = data.sections.join("/n");

      await prisma.document.update({
        where: { id: doc.id },
        data: {
          title: data.title,
          answer: sections,
        },
      });
    })
    .catch(console.error);
  return NextResponse.json({ docTypeId: doc.docTypeId, docId: doc.id });
}
