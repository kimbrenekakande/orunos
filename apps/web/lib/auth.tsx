import { betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./resend";
import ConfirmEmail from "@/components/emails/emailConfirmation";
import  prisma  from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";

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
    // requireEmailVerification: true,
  },
  
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },
  
  session: {
    cookieCache: {
      enabled: true,
      maxAge : 60 * 5,
    }
    
	},
  emailVerification: {
    sendOnSignUp: true, 
    autoSignInAfterVerification : true,
    sendVerificationEmail: async({ user, url}) => {
      await sendEmail({
        to: user.email,
        subject: "Please Verify Your Email Address",
        react: <ConfirmEmail validationCode={url} />,
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
	
  plugins: [
    nextCookies(),
  ]
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
