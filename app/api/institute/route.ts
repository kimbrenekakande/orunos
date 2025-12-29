import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");
	const inst = await prisma.institution.findUnique({
		where: {
			id: Number(id)
		},
	});
	return NextResponse.json(inst);
}
