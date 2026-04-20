import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");

    if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
      const { NodeSDK } = await import("@opentelemetry/sdk-node");
      const { resourceFromAttributes } = await import("@opentelemetry/resources");
      const { PostHogSpanProcessor } = await import("@posthog/ai/otel");

      const sdk = new NodeSDK({
        resource: resourceFromAttributes({ "service.name": "orunos-web" }),
        spanProcessors: [
          new PostHogSpanProcessor({
            apiKey: process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
            host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          }),
        ],
      });
      sdk.start();
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
