import { betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./resend";
import { EmailVerification } from "@/emails/EmailVerification";
import  prisma  from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),

  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  },

  trustedOrigins: [
    "http://orunos.com",
    "https://orunos.com",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://orunos.netlify.app",
    "https://orunos.vercel.app",
    "orunos-mobile://" ,//gotta change this to the url of expo app
    "http://localhost:8081",
    "exp://",
    "exp://**",
    "exp://192.168.*.*:*/**"
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
        react: <EmailVerification username={user.name} verificationUrl={url} />,
      })
    }
  },

	user: {
		additionalFields: {
			balance: {
				type: "number",
				input: true,
      },
			phoneNumber: {
				type: "string",
				input: true,
			},
			style: {
				type: "string",
				input: true,
			},
			image: {
				type: "string",
				input: true,
			},
		},
  },

  plugins: [
    expo(),
    nextCookies(),
  ]
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
