import { PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";

const prisma = new PrismaClient

export async function POST (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  const {answer} = await req.json();

  const work = await prisma.coursework.update()
  return NextResponse.json(work)
}