import prisma from '@/lib/prisma';

import { NextRequest, NextResponse } from "next/server";
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = await body.id;
  const questions = await body.prompt;

  if (!id){
    return NextResponse.json(
      { error: 'Document ID is required' },
      { status: 400 }
    );
  }
  if (!questions) {
    return NextResponse.json(
      { error: 'Prompt is required' },
      { status: 400 }
    );
  }

  const { text } = await generateText({
    model: groq('groq/compound'),
    prompt: questions,
  });

  await prisma.document.update({
    where : { id : id},
    data : {answer : text}
  })

  return NextResponse.json({status : 'document created successfully'});
}