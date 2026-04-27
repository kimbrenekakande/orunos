import { NextRequest, NextResponse } from "next/server";
import { doCreator } from "@/lib/ai/agents";
import { createPartFromUri, createUserContent, GoogleGenAI } from '@google/genai';
import { getPostHogClient } from "@/lib/posthog-server";
import { serverSession } from "@/lib/server-session";


export async function POST(request: NextRequest) {
  const session = await serverSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized', status: 401 });
  const style = session.user.style || ''
  const user = session.user;

  console.log(user);

  const body = await request.json();
  const id = await body.id;
  const documentType = await body.paperType
  const questions = await body.prompt;
  const references = await body.references

  if (!id) return NextResponse.json({ error: 'Document ID is required', status: 400 });
  if (!questions) return NextResponse.json({ error: 'Prompt is required', status: 400 });


  const promptParts = [
    `Document ID : ${id}`,
    `questions : ${questions}`
  ]


  if (references != 0) {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const referencedocuments = createUserContent(
      references.map((doc: { uri: string; mimeType: string }) => createPartFromUri(doc.uri, doc.mimeType))
    )

    const cache = await ai.caches.create({
      model: 'gemini-1.5-flash-001',
      config: {
        'contents': referencedocuments,
        'systemInstruction': 'You are an analytics expert.',
        'ttl': '86400s',
      }
    });

    const cachedName = cache.name
    if (cachedName) promptParts.push(`cachedContent : ${cachedName}`)
  }

  const promptQnz = `${promptParts.join("\n")}`

  const maker = await doCreator(id, documentType, style, promptQnz)

  console.log('Agent result:',"\n", maker)

  const distinctId = request.headers.get("x-posthog-distinct-id") ?? "anonymous";
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: "document_generated",
    properties: {
      document_id: id,
      document_type: documentType,
      has_references: references != 0,
    },
  });

  return NextResponse.json({status : 'document created successfully'});
}
