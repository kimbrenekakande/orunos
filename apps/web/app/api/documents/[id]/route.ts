import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");
	const work = await prisma.document.findUnique({
		where: {
			id: id || "",
		},
	});
	return NextResponse.json(work);
}

export async function UPDATE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const paperID = searchParams.get("id");
  const { update } = await request.json()
	
	await prisma.document.update({
		where: { id: paperID || "" },
		data: { answer: update },
	});
	return NextResponse.json({ status: true });
}


export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");
  await prisma.document.delete({
		where: {
			id: id || "",
		},
	});
  return NextResponse.json({ message : "Document Deleted"});
}
