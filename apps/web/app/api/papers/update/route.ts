import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const paperID = searchParams.get("id");
	const res = await request.json();
	const newData = res.body;

	await prisma.document.update({
		where: { id: paperID || "" },
		data: { answer: newData },
	});
	return NextResponse.json({ status: true });
}
