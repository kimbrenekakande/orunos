// import { PrismaClient } from "@prisma/client"

// export async function fuck () {
//   const prisma = new PrismaClient
//   const work = await prisma.coursework.findUnique({
//     where : {
//       id : 'cmhz4g8cf0003oce9qkazgpx2'
//     }
//   })
//   console.log(work)
// }

// fuck()

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/works");
  const work = await response.json();
  const answer = work.answer

  console.log(answer);
}

Page();