import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const paperID = searchParams.get("id");
  const { update } = await request.json()
	
	await prisma.document.update({
		where: { id: paperID || "" },
		data: { answer: update },
	});
	return NextResponse.json({ status: true });
}
