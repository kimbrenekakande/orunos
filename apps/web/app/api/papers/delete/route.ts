import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
