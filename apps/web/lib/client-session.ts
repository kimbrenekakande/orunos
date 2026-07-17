import { authClient } from "@/lib/auth-client"

const { data: session } = await authClient.getSession()

const clientSession = session

export default clientSession
