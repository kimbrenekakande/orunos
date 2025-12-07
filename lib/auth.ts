import { betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import  prisma  from "@/lib/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
	}),
  
  trustedOrigins: [
    "http://localhost:3000",
    "https://orunos.netlify.app",
    "https://69355b53f3e91a000869b941--orunos.netlify.app" // Your Netlify preview URL
  ],

	emailAndPassword: {
		enabled: true,
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
