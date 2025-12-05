import { betterAuth, number } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma-client"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
      provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),

  emailAndPassword : {
    enabled : true
  },

  user : {
    additionalFields : {
      institution : { 
        type : 'string', 
        input : true 
      },
      wallet : {
        type : 'number' , 
        input : false
      }

    }
  }
  
});


export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user