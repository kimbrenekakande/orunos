import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { serverSession } from "@/lib/server-session";
import { flw } from "@/lib/flutterwave";

export async function POST(request: NextRequest) {
  const session = await serverSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body) return NextResponse.json({ error: "transaction details are required" }, { status: 400 });
  const payment = body.paymentDetails;


  await flw.Transaction.verify({ id: payment.id })
    .then( async (response: { data: { status: string; amount: number; currency: string } }) => {
      if (
        response.data.status === "successful"
        && response.data.amount === payment.chargedAmount
        && response.data.currency === payment.currency
      ) {
        try {
          await prisma.transaction.create({
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
        } catch(error){ return NextResponse.json({ error: error}, { status: 500 });};

        try {
          await prisma.user.update({
            where: { id: session.user.id },
            data: { balance: session.user.balance + payment.amount }
          })
          return NextResponse.json({ status: 201 });
        } catch(error){ return NextResponse.json({ error: error }, { status: 500 });};
      } else {
        return NextResponse.json({ error: "Transaction not successful" }, { status: 402 });
      }
    });
  return NextResponse.json({ message: "Transaction verified successfully" }, { status: 201 });
}