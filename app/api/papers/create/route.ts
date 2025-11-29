import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(req : Request) {
  const { question, answer } = await req.json();
	const prisma = new PrismaClient();
	const work = await prisma.coursework.create({
		data: {
			question: question,
			answer: answer,
		},
	});
	return NextResponse.json(work);
}
