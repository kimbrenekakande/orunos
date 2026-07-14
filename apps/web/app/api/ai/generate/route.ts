import { NextRequest, NextResponse } from "next/server";
import { doCreator } from "@/lib/ai/agents";
import { createPartFromUri, createUserContent, GoogleGenAI } from '@google/genai';
// import { writeCachedTool } from "@/lib/ai/tools"
import { DocProps } from "@/lib/types"

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = body.id;
  const documentType = body.paperType;
  const questions = body.prompt;
  const references = body.references;

  if (!id) return NextResponse.json({ error: 'Document ID is required', status: 400 });
  if (!questions) return NextResponse.json({ error: 'Prompt is required', status: 400 });

  
  const docProps: DocProps = {
    documentId: id,
    questions: questions,
  }

  
  if (references && Array.isArray(references) && references.length > 0) {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const referencedocuments = createUserContent(
      references.map((doc: { uri: string; mimeType: string }) => createPartFromUri(doc.uri, doc.mimeType))
    )

    const cache = await ai.caches.create({
      model: 'gemini-3-flash-preview',
      config: {
        contents: referencedocuments,
        systemInstruction: `
          You are an agent part of an academic document creation workflow,
          Your role is to generate detailed content on the provided section.
          Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
          your output should start with a subheading from your input.
          rules :
          -Do not use h1 or its equivalent(#)
          -The out put format should markdown
          -Dont add any dividers or conclusions.
        `,
        ttl: '86400s',
      },
    });

    const cachedName = cache.name
    if (cachedName) docProps.cachedName = cachedName;

  }

  const maker = await doCreator(docProps)
  console.log('Agent result:',"\n", maker)
  return NextResponse.json({status : 'document created successfully'});
}
