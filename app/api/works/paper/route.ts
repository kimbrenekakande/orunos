import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET () {
  const prisma = new PrismaClient
  const work = await prisma.coursework.findUnique({
    where : {
      id : 'cmi3fb55e000foctaw2d96f3d'
    }
  })
  return NextResponse.json(work)
}