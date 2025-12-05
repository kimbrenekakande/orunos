import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";


export async function POST(req : Request) {
  const { question, answer } = await req.json();
	const work = await prisma.document.create({
		data: {
			question: question,
			answer: answer,
		},
	});
	return NextResponse.json(work);
}
