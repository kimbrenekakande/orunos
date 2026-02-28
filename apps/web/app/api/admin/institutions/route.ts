import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const institutions = await prisma.institution.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(institutions);
  } catch (error) {
    console.error("Failed to fetch institutions:", error);
    return NextResponse.json({ error: "Failed to fetch institutions" }, { status: 500 });
  }
}
