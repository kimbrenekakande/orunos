import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { serverSession } from "@/lib/server-session";
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  const session = await serverSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lastTransaction = await prisma.transaction.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  

  try {
    const { paymentDetails } = await req.json();

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        transactionId: String(paymentDetails.id),
        txRef: paymentDetails.txRef,
        orderRef: paymentDetails.orderRef,
        flwRef: paymentDetails.flwRef,
        amount: Number(paymentDetails.amount),
        chargedAmount: Number(paymentDetails.chargedAmount),
        appfee: String(paymentDetails.appfee || 0),
        status: paymentDetails.status,
        authModelUsed: paymentDetails.authModelUsed,
        currency: paymentDetails.currency,
        paymentType: paymentDetails.paymentType,
        type: "DEPOSIT",
        phoneNumber: paymentDetails.phoneNumber,
        description: paymentDetails.description,
        balanceAfter: Number(lastTransaction?.balanceAfter ?? 0) + Number(paymentDetails.amount),
      },
    });

    revalidatePath('/dashboard/billing')
    return NextResponse.json({ success: true, transaction }, { status: 201 });
  } catch (error) {
    console.error("Transaction creation error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Creation failed" }, { status: 500 });
  }
}

export async function GET() {
  const session = await serverSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(transactions, { status: 200 }); 
  } catch (error) {
    console.error("Transaction verification error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Verification failed" }, { status: 500 });
  }
}