
import prisma from "./lib/prisma";

async function fuck(){
  const x = await prisma.document.findMany()
  console.log(x)
}

fuck()