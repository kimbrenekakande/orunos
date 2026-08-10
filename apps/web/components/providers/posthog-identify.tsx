"use client";

import { useEffect } from "react";
import { getPostHog } from "@/lib/posthog/client";
import { authClient } from "@/lib/auth-client";

/**
 * PostHogIdentify — listens for better-auth session changes and identifies
 * the user in PostHog.
 *
 * Place this inside PostHogProvider in layouts that have authenticated users.
 */
export function PostHogIdentify() {
	const { data: session } = authClient.useSession();

	useEffect(() => {
		const ph = getPostHog();
		if (!ph) return;

		if (session?.user) {
			ph.identify(session.user.id, {
				email: session.user.email,
				name: session.user.name,
			});
		} else {
			// User logged out — reset to anonymous
			ph.reset();
		}
	}, [session?.user?.id]);

	return null;
}
