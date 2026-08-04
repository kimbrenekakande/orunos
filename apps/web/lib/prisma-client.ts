import { PrismaClient } from "@/prisma/generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prod = process.env.PROD === "true";

const adapter = new PrismaLibSql({
  url: prod
    ? process.env.TURSO_DATABASE_URL!
    : process.env.DATABASE_URL!,
  ...(prod && { authToken: process.env.TURSO_AUTH_TOKEN! }),
});

export const prisma = new PrismaClient({ adapter });
