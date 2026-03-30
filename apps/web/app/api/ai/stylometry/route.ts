import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai/braintrust";
import { google } from '@ai-sdk/google';
import { serverSession } from "@/lib/server-session";
import prisma from "@/lib/prisma";


export async function POST(request: NextRequest) {
  const session = await serverSession();
  const user = session?.user;
  
  if (!user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  const formData = await request.formData();
  const refs = formData.getAll("refs") as File[];
  
  if (!refs.length) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
  }

  const fileContents = await Promise.all(
    refs.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      return {
        data: uint8Array,
        mediaType: file.type || 'application/pdf',
      };
    })
  );
  
  const { text } = await generateText({
    model: google('gemini-2.5-pro'),
    messages: [
      {
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: `Analyze in detail the stylometry writing style in these documents.
            Extract key patterns in tone, vocabulary, sentence structure, and any distinctive writing traits. 
            Provide only a summary of the writing style for another agent to use to generate content. 
            Dont provide the whole analysis, just the summary. Plain text only not markdown.
            Dont include the topic just the style . analyze it to the T.
            you can provide specific  samples you think the agent should analyze
            The output should be able to be used by another agent to generate documents sounding like the author.`
          },
          ...fileContents.map((fc) => ({ type: 'file' as const, ...fc })),
        ],
      },
    ],
  });
  
  console.log("session user id:", user.id);
  
  await prisma.user.update({
    where: { id: user.id },
    data: { style: text },
  });
  
  console.log("style saved:", text);
  console.log("the route has received refs", refs.length, "files");
  
  return NextResponse.json({ style: text }, { status: 200 });
}