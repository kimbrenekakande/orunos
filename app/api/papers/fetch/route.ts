import prisma from "@/lib/prisma"
import { NextRequest,NextResponse } from "next/server";


export async function GET (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  const work = await prisma.coursework.findUnique({
    where : {
      id : id || ""
    }
  })
  return NextResponse.json(work)
}