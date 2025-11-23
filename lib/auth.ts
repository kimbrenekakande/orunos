import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma-client"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
      provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword : {
    enabled : true
  },
  
});