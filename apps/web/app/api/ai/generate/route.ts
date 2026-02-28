import { NextRequest, NextResponse } from "next/server";
import {documentAgent} from "@/lib/ai/agents";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = await body.id;
  const documentType = await body.paperType
  const questions = await body.prompt;

  console.log('=== AI GENERATION REQUEST ===')
  console.log('Document ID:', id)
  console.log('Document Type:', documentType)
  console.log('Questions/Prompt:', questions)
  console.log('=============================')

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

  const maker = await documentAgent.generate({
    prompt: `
    Create an academic Document
    Document ID : ${id}
    Document Type :  ${documentType}
    questions : ${questions}
    `
  })

  console.log('Agent result:', maker)

  return NextResponse.json({status : 'document created successfully'});
}
