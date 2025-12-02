import { prisma } from "./lib/prisma-client" 

const type =await prisma.docType.findUnique({
    where  : {
      type : 'coursework'
    },
  })

  console.log(type)