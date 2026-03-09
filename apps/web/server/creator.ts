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
  const files = formData.getAll("files") as File[];

  if (!doctype) throw new Error("Document type is required");
  if (!question) throw new Error("Question and answer are required");

  // create a placer document
  const newDoc = await prisma.document.create({
    data: {
      title: "",
      question: question,
      answer: "",
      cost: 0,
      status: "GENERATING",
      userId: user.id,
      docTypeId: doctype,
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
      paperType: doctype,
      prompt: question,
      references : files || []
    }),
  }).catch(console.error);

  redirect(`/dashboard/${doctype}/editor/${newDoc.id}?source=form`);
}
