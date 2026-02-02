import prisma from "../prisma"

const institution = await prisma.institution.findFirst({
  where: {
    id: 1,
  },
});

console.log(institution);

// import baseUrl from "../base-url"

// const fuckery = async function somero(id) {
//   const res = await fetch(`${baseUrl}/api/institute/fetch?id=${id}`)
//   return res.json()
// }

// const fuck = "1"
// const x = await fuckery(fuck)
// console.log(x)