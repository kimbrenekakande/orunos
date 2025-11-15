import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET () {
  const prisma = new PrismaClient
  const work = await prisma.coursework.findUnique({
    where : {
      id : 'cmhzzyk160000occmezjk1u5g'
    }
  })
  return NextResponse.json(work)
}