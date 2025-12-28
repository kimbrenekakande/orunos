import prisma from '@/lib/prisma';

import { NextRequest, NextResponse } from "next/server";
import { groq } from '@ai-sdk/groq';
import { generateText, generateObject } from 'ai';
import { outlineSchema} from '@/lib/types';

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

  let content = '';
  const results = await generateObject({
    model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
    system: "you are a standard course work for university students",
    prompt: questions,
    schema : outlineSchema
  });

  const output = results.object;
  const sections = output['sections'];
  content += `\n\n${output['title']}\n\n`
  content += output['summary']


  const santa = sections.map(async sec => {
    const { text } = await generateText({
      model: groq('moonshotai/kimi-k2-instruct-0905'),
      system: "you are a standard course work for university students",
      prompt: `write a deep dive on ${sec['title'], sec['content']}`,
    });
    return text;
  })

  const y = await Promise.all(santa)

  content += y.join('')
  content += output['conclusion']

  await prisma.document.update({
    where : { id : id},
    data : {
      title : output.title,
      answer : content,
      status : "READY",
    }
  })

  return NextResponse.json({status : 'document created successfully'});
}