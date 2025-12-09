'use server'

import  prisma  from "@/lib/prisma";
import { redirect } from "next/navigation";
import { serverSession } from "@/lib/server-session";

export async function startCreation(formData: {doctype: string, qnz: string}) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) throw new Error("User not authenticated");


  const question = formData.qnz as string;
  if (!question) throw new Error("Question and answer are required");
  const docType = formData.doctype as string;
  if (!docType) throw new Error("Document type is required");

  // create a placer document
  const newDoc = await prisma.document.create({
    data: {
      cost: 0,
      question : question,
      answer : '',
      userId: user.id,
      docTypeId: docType
    },
  });
  
  redirect(`/dashboard/${docType}/editor/${newDoc.id}`);
}