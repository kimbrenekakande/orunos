import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET () {
  const prisma = new PrismaClient
  const work = await prisma.coursework.findUnique({
    where : {
      id : 'cmhz4g8cf0003oce9qkazgpx2'
    }
  })
  return NextResponse.json(work)
}