import { NextRequest, NextResponse } from "next/server";
import { serverSession } from "@/lib/server-session";
import { prisma } from "@/lib/prisma-client";
import { inngest } from "@/lib/inngest/client";

export const maxDuration = 120;

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

  // trigger inngest function to make a call to the agents microservice
  await inngest.send(
    {
      name: "app/doc.created",
      data: {
        id: doc.id,
        type: doc.docTypeId,
        qns : doc.question
      },
    }
  );
  
  return NextResponse.json({ docTypeId: doc.docTypeId, docId: doc.id });
}
