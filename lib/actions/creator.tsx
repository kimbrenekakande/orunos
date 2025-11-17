import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function addShit(formData : FormData) {
  await prisma.coursework.create({
    data: {
      question: formData.get("qn") as string,
      answer: formData.get("ans") as string,
    },
  });
  redirect('dashboard/editor')
}
