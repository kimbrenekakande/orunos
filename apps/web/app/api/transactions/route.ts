import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { serverSession } from "@/lib/server-session";

export async function POST(request: NextRequest) {
  const session = await serverSession();
  const body = await request.json();
  
  if (body.transaction && session) {
    const payment = body.paymentDetails
    try {
      prisma.transaction.create({
        data: {
          transactionId: payment.id,
          txRef: payment.txRef,
          orderRef: payment.orderRef,
          flwRef: payment.flwRef,
          amount: payment.amount,
          chargedAmount: payment.chargedAmount,
          appfee: payment.appfee,
          status: payment.status,
          authModelUsed: payment.authModelUsed,
          currency: payment.currency,
          paymentType: payment.paymentType,
          type: "DEPOSIT",
          phoneNumber: payment.phoneNumber,
          description: payment.description,
          userId: session.user.id
        }
      })
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 501 })
    }

    return NextResponse.json({ status: 201 })
  }
}