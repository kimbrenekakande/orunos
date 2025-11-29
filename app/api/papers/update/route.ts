import { PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";

const prisma = new PrismaClient

export async function POST (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const paperID = searchParams.get('id')
  const res = await request.json()
  const newData = res.body


  await prisma.coursework.update({
    where : { id : paperID || ""},
    data : {answer : newData}
  })
  return NextResponse.json({status : true})
}