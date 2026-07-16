import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { serverSession } from "@/lib/server-session";
import { flw } from "@/lib/flutterwave";

export async function POST(request: NextRequest) {
  const session = await serverSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { paymentDetails } = await request.json();
  console.log("paymentDetails:", paymentDetails);
  if (!paymentDetails?.id) {
    return NextResponse.json({ error: "paymentDetails is required" }, { status: 400 });
  }

  try {
    const response = await flw.Transaction.verify({ id: paymentDetails.id });

    if (response.data.status === "successful") {
      await prisma.transaction.create({
        data: {
          transactionId: String(paymentDetails.id),
          txRef: paymentDetails.txRef,
          orderRef: paymentDetails.orderRef ?? "",
          flwRef: paymentDetails.flwRef ?? "",
          amount: paymentDetails.amount,
          chargedAmount: paymentDetails.chargedAmount,
          appfee: String(paymentDetails.appfee ?? ""),
          status: paymentDetails.status,
          authModelUsed: paymentDetails.authModelUsed ?? "",
          currency: paymentDetails.currency,
          paymentType: paymentDetails.paymentType ?? "",
          type: "DEPOSIT",
          phoneNumber: paymentDetails.phoneNumber ?? "",
          description: paymentDetails.description ?? "",
          userId: session.user.id,
        },
      });

      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          balance: { increment: paymentDetails.amount }
        },
      });

      return NextResponse.json({ status: 201 });
    } else {
      return NextResponse.json({ error: "Transaction not successful" }, { status: 402 });
    }
  } catch (error) {
    console.error("Transaction verification error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Verification failed" }, { status: 500 });
  }
}
