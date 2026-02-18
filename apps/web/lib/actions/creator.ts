'use server'

import  prisma  from "@/lib/prisma";
import { redirect } from "next/navigation";
import { serverSession } from "@/lib/server-session";

export async function startCreation(formData: FormData) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) throw new Error("User not authenticated");


  const question = formData.get("qns") as string;
  if (!question) throw new Error("Question and answer are required");
  const tempType = formData.get("doctype") as string;
  if (!tempType) throw new Error("Document type is required");


  const docType = await prisma.docType.findUnique({
    where: {
      type: tempType
    }
  });
  if (!docType) throw new Error("Invalid document type");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // kickoff agent workflow
  const kickoff = await fetch(`${baseUrl}/api/ai/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: question,
    }),
  })
  const response = await kickoff.json()
  const {text} = response


  // create document
  const newDoc = await prisma.document.create({
    data: {
      title: `Document ${new Date().toISOString()}`,
      cost: Number(docType.price),
      question : question,
      answer : text,
      status: 'GENERATING',
      userId: user.id,
      docTypeId: docType.type
    },
  });

  redirect(`/dashboard/${tempType}/editor/${newDoc.id}`);
}
