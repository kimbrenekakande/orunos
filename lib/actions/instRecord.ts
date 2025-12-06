'use server'
import { prisma } from "@/lib/prisma-client";

export async function institutionRecord(value : string) {
  const inst = await prisma.institution.findUnique({
    where : {
      name : value
    },

    select : {
      id : true
    }
    
  })
  console.log(`GOT THE FUCKIN ${inst?.id}`)
  return inst?.id
}
