import { PrismaClient } from "@prisma/client"

export async function fuck () {
  const prisma = new PrismaClient
  const work = await prisma.coursework.findUnique({
    where : {
      id : 'cmhz4g8cf0003oce9qkazgpx2'
    }
  })
  console.log(work)
}

fuck()