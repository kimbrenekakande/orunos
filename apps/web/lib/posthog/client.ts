"use client";

import posthog from "posthog-js";
import { type PostHog } from "posthog-js";

/**
 * Initialize PostHog on the client.
 * Called once from PostHogProvider — never call init() more than once per page load.
 */
export function initPostHog(): PostHog | undefined {
	if (typeof window === "undefined") return undefined;

	const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
	const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

	if (!key) {
		if (process.env.NODE_ENV === "development") {
			console.warn(
				"[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set — analytics disabled",
			);
		}
		return undefined;
	}

	// Use the reverse-proxy path to avoid ad-blockers; falls back to direct host
	const apiHost = host ?? "/ingest";

	posthog.init(key, {
		api_host: apiHost,
		ui_host: host ?? "https://us.posthog.com",
		// Capture pageviews automatically — we also do manual pageview in PostHogPageView
		capture_pageview: false,
		// Don't capture in development
		loaded: (ph) => {
			if (process.env.NODE_ENV === "development") ph.debug(false);
		},
		// Session recording — enable on production
		disable_session_recording: process.env.NODE_ENV !== "production",
		// Persistence: cookie-based for cross-subdomain
		persistence: "cookie",
		// Opt-out cookie handling for GDPR
		opt_out_capturing_by_default: false,
		// Respect Do Not Track
		respect_dnt: true,
		// Capture performance metrics
		enable_heatmaps: true,
	});

	return posthog;
}

/** Access the singleton PostHog instance (only after init has been called). */
export function getPostHog(): PostHog | undefined {
	if (typeof window === "undefined") return undefined;
	return posthog;
}
