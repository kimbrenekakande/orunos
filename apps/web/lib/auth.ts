import { betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./email";
import  prisma  from "@/lib/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
	}),

  trustedOrigins: [
    "http://localhost:3000",
    "https://orunos.netlify.app",
  ],

	emailAndPassword: { 
		enabled: true,
  },
	
  emailVerification: {
    sendOnSignUp: true, 
    autoSignInAfterVerification : true,
    sendVerificationEmail: async({ user, url}) => {
      await sendEmail({
        to: user.email,
        subject: "Please Verify Your Email Address",
        text: `Click here to verify your email ${url}`,
      })
    } 
  },

	user: {
		additionalFields: {
			institutionId: {
				type: "number",
				input: true,
				required: false,
			},
			wallet: {
				type: "number",
				input: false,
			},
		},
	},
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
