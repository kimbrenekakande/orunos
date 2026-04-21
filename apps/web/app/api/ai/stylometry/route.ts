import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai/braintrust";
import { google } from '@ai-sdk/google';
import { serverSession } from "@/lib/server-session";
import prisma from "@/lib/prisma";


export async function POST(request: NextRequest) {
  console.log("stylometry: request received");
  const session = await serverSession();
  const user = session?.user;
  
  console.log("stylometry: session=", !!session, "user=", !!user, "userId=", user?.id);
  
  if (!user?.id) {
    console.log("stylometry: not authenticated");
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
  
  console.log("stylometry: calling AI...");
  
  const { text } = await generateText({
    model: google('gemini-2.5-pro'),
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stylometry-analysis",
      metadata: { posthog_distinct_id: user.email ?? user.id },
    },
    messages: [
      {
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: `You are a stylometry expert. Analyze the writing style of the provided documents with precision.
          
          Your goal is to extract a replicable style fingerprint — enough for another agent to generate new content that is stylistically indistinguishable from the author.
          
          Focus on:
          - Vocabulary: word complexity, preferred diction, recurring phrases, jargon, contractions, formality level
          - Sentence structure: average length, rhythm, use of fragments, run-ons, parallelism, clause patterns
          - Punctuation habits: comma usage, dashes, ellipses, semicolons, unconventional choices
          - Tone & voice: authoritative, conversational, sardonic, detached — and how it shifts
          - Paragraph behavior: length, how ideas are introduced and closed, transitions
          - Distinctive quirks: rhetorical devices, hedging language, how the author opens and closes thoughts
          - Grammar patterns: any intentional rule-breaking, tense preferences, passive vs active voice ratio
          
          Output a compact but dense style guide in plain text. No markdown. No topic analysis. No document summary.
          Write it as direct instructions a generative agent can follow.
          Include 2-4 short verbatim samples that best exemplify the style — label them as SAMPLE.
          End with a one-paragraph "Voice Essence" that captures the overall feel in plain language.`
          },
          ...fileContents.map((fc) => ({ type: 'file' as const, ...fc })),
        ],
      },
],
   });
   
   console.log("stylometry: AI completed, text length=", text.length);
   console.log("stylometry: userId=", user.id);
  
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { style: text },
    });
    console.log("stylometry: style saved successfully");
  } catch (err) {
    console.error("stylometry: failed to save style:", err);
    return NextResponse.json({ error: 'Failed to save style' }, { status: 500 });
  }
  
  return NextResponse.json({ style: text }, { status: 200 });
}