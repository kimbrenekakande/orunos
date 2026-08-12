"use client";

import { PostHogIdentify } from "@/components/providers/posthog-identify";

/**
 * DashboardProviders — client boundary that adds PostHog user identification
 * for authenticated dashboard routes.
 */
export function DashboardProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<PostHogIdentify />
			{children}
		</>
	);
}
