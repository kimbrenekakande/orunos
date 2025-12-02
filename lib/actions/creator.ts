"use server";

import { prisma } from "@/lib/prisma-client";
import { redirect } from "next/navigation";

export async function addShit(formData: FormData) {
	const doctype = formData.get("doctype") as string;
	const newPaper = await prisma.document.create({
		data: {
			question: formData.get("qn") as string,
			answer: formData.get("ans") as string,
		},
	});
	redirect(`/dashboard/${doctype}/editor/${newPaper.id}`);
}
