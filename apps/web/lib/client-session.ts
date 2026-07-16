import { authClient } from "@/lib/auth-client"

export function useClientSession() {
  return authClient.useSession()
}
