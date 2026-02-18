import { PrismaClient } from "../prisma/generated/prisma/index.js"; //key : fix this to include index.js
import { PrismaLibSql } from "@prisma/adapter-libsql";


const prod = process.env.PROD === 'true'
let prisma : PrismaClient;

if (prod) {
  
  const adapter = new PrismaLibSql({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  prisma = new PrismaClient({ adapter });  
} else {
  
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
  });
  prisma = new PrismaClient({ adapter });
}

export default prisma;