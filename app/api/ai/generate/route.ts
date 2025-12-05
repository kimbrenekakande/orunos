import { NextRequest, NextResponse } from "next/server";
// import { deepseek } from '@ai-sdk/deepseek';
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const qn = await body.prompt;


  const { text } = await generateText({
    model: groq('moonshotai/kimi-k2-instruct'),
    prompt: qn,
  });


  if (!qn) {
    return NextResponse.json(
      { error: 'Prompt is required' },
      { status: 400 }
    );
  }

  return NextResponse.json({text});
}
// the need for pan african companies if africa is to became a super power