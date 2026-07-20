'use server'

import  prisma  from "@/lib/prisma";
import { serverSession } from "@/lib/server-session";

export async function affordable(docType: string) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) throw new Error("User not authenticated");

  const lastTransaction = await prisma.transaction.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  const type = await prisma.docType.findUnique({
    where: { type: docType },
  });
  
  const balance = lastTransaction?.balanceAfter

  if (!lastTransaction) return false;
  if (!type) throw new Error("DocType not found");
  if (balance==null) return false;
  
  if (balance<type.price) return false;
  
  
  return true
}
