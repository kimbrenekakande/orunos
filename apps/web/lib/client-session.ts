import { authClient } from "@/lib/auth-client"

export const { data: session, isPending: status } = authClient.useSession()
