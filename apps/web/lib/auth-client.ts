import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { auth } from "./auth"

export const authClient = createAuthClient({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL, // Make sure this is set in your .env
  plugins: [
    inferAdditionalFields<typeof auth>({
      wallet: 0, // Default value for wallet
    }),
    nextCookies()
  ]
})
