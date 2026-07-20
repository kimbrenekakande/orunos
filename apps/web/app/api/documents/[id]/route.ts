import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const work = await prisma.document.findUnique({
    where: { id },
  });
  return NextResponse.json(work);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { update } = await request.json()

  await prisma.document.update({
    where: { id },
    data: { answer: update },
  });
  return NextResponse.json({ status: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.document.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Document Deleted" });
}
