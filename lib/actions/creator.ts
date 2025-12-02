'use server'

import { prisma } from "@/lib/prisma-client";
import { redirect } from "next/navigation";
import { serverSession } from "@/lib/server-session";

export async function startCreation(formData: FormData) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) throw new Error("User not authenticated");

  
  const tempType = formData.get("doctype") as string;
  if (!tempType) throw new Error("Document type is required");

  
  const docType = await prisma.docType.findUnique({
    where: {
      type: tempType
    }
  });
  if (!docType) throw new Error("Invalid document type");

  
  const question = formData.get("qns") as string;
  const answer = formData.get("ans") as string;
  if (!question) throw new Error("Question and answer are required");
  

  const newDoc = await prisma.document.create({
    data: {
      cost: Number(docType.price),
      question,
      answer,
      userId: user.id,
      docTypeId: docType.type
    },
  });
  
  redirect(`/dashboard/${tempType}/editor/${newDoc.id}`);
}
