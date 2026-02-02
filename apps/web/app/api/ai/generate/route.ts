import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import {documentAgent} from "@/lib/ai/agents";

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

  const output = await documentAgent({ doctype: 'document', questionnaire: questions });
  
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