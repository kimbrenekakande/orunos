import { NextRequest, NextResponse } from "next/server";
import { doCreator } from "@/lib/ai/agents";
// import { createPartFromUri, createUserContent, GoogleGenAI } from '@google/genai';
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
  const id = body.id;
  const documentType = body.paperType;
  const questions = body.prompt;
  const references = body.references;

  if (!id) return NextResponse.json({ error: 'Document ID is required', status: 400 });
  if (!questions) return NextResponse.json({ error: 'Prompt is required', status: 400 });

  // Fetch Document docTypeId
  const type = await prisma.docType.findUnique({
    where: {
      type : documentType
    }
  })

  // Create a document
  const doc = await prisma.document.create({
    data: {
      question: questions,
      status: "GENERATING",
      cost: Number(type?.price),
      docTypeId: documentType,
      userId: user.id
    }
  })

  // Call agents microservices
  try {
    const res = await fetch(`${agentsURL}/fast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        docType: doc.docTypeId,
        question: questions
      })
    })

    if (!res.ok) throw new Error(`Agents responded with ${res.status}`)

    const data = await res.json()
    const sections = data.sections.join("/n")

    // Update the doc with data from agents microservice
    await prisma.document.update({
      where: { id : doc.id},
      data: {
        title: data.title,
        answer: sections
      }
    })
  } catch (error) {
    console.error(error)
  }

  // Handle Cached Content
  // if (references && Array.isArray(references) && references.length > 0) {
  //   const ai = new GoogleGenAI({
  //     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  //   });

  //   const referencedocuments = createUserContent(
  //     references.map((doc: { uri: string; mimeType: string }) => createPartFromUri(doc.uri, doc.mimeType))
  //   )

  //   const cache = await ai.caches.create({
  //     model: 'gemini-3-flash-preview',
  //     config: {
  //       contents: referencedocuments,
  //       systemInstruction: `
  //         You are an agent part of an academic document creation workflow,
  //         Your role is to generate detailed content on the provided section.
  //         Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
  //         your output should start with a subheading from your input.
  //         rules :
  //         -Do not use h1 or its equivalent(#)
  //         -The out put format should markdown
  //         -Dont add any dividers or conclusions.
  //       `,
  //       ttl: '86400s',
  //     },
  //   });

  //   const cachedName = cache.name
  //   if (cachedName) docProps.cachedName = cachedName;

  // }
  return NextResponse.json({status : 'document created successfully'});
}
