import { NextRequest, NextResponse } from "next/server";
import { documentAgent } from "@/lib/ai/agents";
import { createPartFromUri, createUserContent, GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = await body.id;
  const documentType = await body.paperType
  const questions = await body.prompt;
  const references = await body.references

  if (!id) return NextResponse.json({ error: 'Document ID is required', status: 400 });
  if (!questions) return NextResponse.json({ error: 'Prompt is required', status: 400 });


  const promptParts = [
    `Document ID : ${id}`,
    `Document Type :  ${documentType}`,
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

  const maker = await documentAgent.generate({
    prompt:`${promptParts.join("/n")}`
  })

  console.log('Agent result:', maker)

  return NextResponse.json({status : 'document created successfully'});
}
