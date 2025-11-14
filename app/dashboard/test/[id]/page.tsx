import { PrismaClient } from "@prisma/client"
const prisma =  new PrismaClient()

async function page({params} : {params : Promise<{id : string}>} ) {
  const {id} = await params
  const work = await prisma.coursework.findUnique({
    where : {
      id : id,
    }
  })
  return (
    <div>
      <h1 className="text-white text-9xl">{work.question}</h1>
      <p>{work.answer}</p>
    </div>
  )
}

export default page