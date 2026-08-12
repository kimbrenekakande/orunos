import { PostHog } from "posthog-node";

/**
 * Server-side PostHog client.
 * Use this in Server Components, Route Handlers, and Server Actions.
 *
 * Returns undefined when the key is not configured (e.g. in CI / local dev)
 * so callers can safely no-op without crashing.
 */
export function createServerPostHog(): PostHog | undefined {
	const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
	const host =
		process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

	if (!key) return undefined;

	return new PostHog(key, {
		host,
		// Flush eagerly in serverless — each invocation should send before the function ends
		flushAt: 1,
		flushInterval: 0,
	});
}

/**
 * Identify a user server-side.
 * Call this after sign-up / login inside Server Components or Server Actions.
 */
export async function serverIdentify(args: {
	distinctId: string;
	email?: string;
	name?: string;
	properties?: Record<string, unknown>;
}) {
	const client = createServerPostHog();
	if (!client) return;

	client.identify({
		distinctId: args.distinctId,
		properties: {
			email: args.email,
			name: args.name,
			...args.properties,
		},
	});

	await client.shutdown();
}

/**
 * Capture a server-side event.
 */
export async function serverCapture(args: {
	distinctId: string;
	event: string;
	properties?: Record<string, unknown>;
}) {
	const client = createServerPostHog();
	if (!client) return;

	client.capture({
		distinctId: args.distinctId,
		event: args.event,
		properties: args.properties,
	});

	await client.shutdown();
}

/**
 * Evaluate a feature flag server-side.
 * Returns the string value or the default.
 */
export async function serverGetFeatureFlag(
	distinctId: string,
	flagKey: string,
	defaultValue: string | boolean = false,
): Promise<string | boolean> {
	const client = createServerPostHog();
	if (!client) return defaultValue;

	const value = await client.getFeatureFlag(flagKey, distinctId);
	await client.shutdown();

	return value ?? defaultValue;
}
