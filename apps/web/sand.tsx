import prisma from "@/lib/prisma"

async function TableView() { 
  const all = await prisma.document.findMany({
    where: {
      userId : "qDbVJ4plN6jLeuZF0IbD9SkcJKFBSNfS",
    },
    orderBy : {
      createdAt : 'desc'
    }
  }) // all papers array
  
  console.log(all)
}

TableView()