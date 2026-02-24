import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const alldocs= await prisma.document.findMany();
	return NextResponse.json(alldocs);
}
