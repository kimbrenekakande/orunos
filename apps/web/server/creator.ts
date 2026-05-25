"use server";

import prisma from "@/lib/prisma";
import baseUrl from "@/lib/base-url";
import { redirect } from "next/navigation";
import { serverSession } from "@/lib/server-session";

export async function startCreation(formData: FormData) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) throw new Error("User not authenticated");


  const doctype = formData.get("doctype") as string;
  const question = formData.get("qnz") as string;
  if (!doctype) throw new Error("Document type is required");
  if (!question) throw new Error("Question and answer are required");

  const docType = await prisma.docType.findFirst({
    where: {
      type: doctype,
    },
  });

  if (!docType) {
    throw new Error(`Invalid document type: "${doctype}"`);
  }

  // create a placer document
  const newDoc = await prisma.document.create({
    data: {
      title: "",
      question: question,
      answer: "",
      cost: docType.price,
      status: "GENERATING",
      userId: user.id,
      docTypeId: docType.type,
    },
  });

  // kickoff agentic workflow
  fetch(`${baseUrl}/api/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: newDoc.id,
      paperType: docType.type,
      prompt: question,
      references: []
    }),
  }).catch(console.error);

  redirect(`/dashboard/${docType.type}/editor/${newDoc.id}?source=form`);
}
