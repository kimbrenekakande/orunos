import { authClient } from "@/lib/auth-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let clientSession: any = null;

try {
	const { data: session } = await authClient.getSession();
	clientSession = session;
} catch {
	// Session fetch unavailable during build/prerender
}

export default clientSession;
