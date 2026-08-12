"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, getPostHog } from "@/lib/posthog/client";

/**
 * PostHogPageView — tracks page views on navigation.
 * Must be a child of PostHogProvider (i.e. rendered after initPostHog has run).
 */
function PostHogPageView(): null {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lastPathRef = useRef<string | null>(null);

	useEffect(() => {
		const ph = getPostHog();
		if (!ph || !pathname) return;

		const url = searchParams?.size
			? `${pathname}?${searchParams.toString()}`
			: pathname;

		// Avoid double-firing on strict-mode re-mounts
		if (lastPathRef.current === url) return;
		lastPathRef.current = url;

		ph.capture("$pageview", { $current_url: url });
	}, [pathname, searchParams]);

	return null;
}

/**
 * PostHogProvider — initializes PostHog once and renders the page-view tracker.
 * Wrap this around your app (or dashboard layout) as a Client Component boundary.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!initializedRef.current) {
			initializedRef.current = true;
			initPostHog();
		}
	}, []);

	return (
		<>
			<Suspense fallback={null}>
				<PostHogPageView />
			</Suspense>
			{children}
		</>
	);
}
