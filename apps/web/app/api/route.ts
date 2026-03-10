import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const docTypes = await prisma.docType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(docTypes);
  } catch (error) {
    console.error("Failed to fetch document types:", error);
    return NextResponse.json({ error: "Failed to fetch document types" }, { status: 500 });
  }
}
