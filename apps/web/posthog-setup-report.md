<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Orunos Next.js App Router project. PostHog is initialized client-side via `instrumentation-client.ts` (below the existing Sentry init) using the recommended approach for Next.js 15.3+. A server-side PostHog client (`lib/posthog-server.ts`) was created for API route event capture. The `next.config.ts` was updated with PostHog proxy rewrites to circumvent ad-blockers. Event tracking and user identification were added to 8 files across the auth, editor, billing, and settings flows. Users are identified with `posthog.identify()` on login and signup using their email as the distinct ID, which correlates client- and server-side events.

| Event | Description | File |
|---|---|---|
| `user_signed_up` | User successfully completes email/password signup form | `app/(auth)/signup/page.tsx` |
| `user_signed_in` | User successfully signs in with email/password | `app/(auth)/login/page.tsx` |
| `social_sign_in_clicked` | User clicks a social sign-in button (Google or Microsoft) | `app/(auth)/login/page.tsx` |
| `document_generation_started` | User submits the AI prompt form to generate a new document | `components/kokonutui/ai-prompt.tsx` |
| `document_generated` | AI document generation completes successfully on the server | `app/api/ai/generate/route.ts` |
| `document_deleted` | User deletes a document via the DELETE papers API | `app/api/papers/delete/route.ts` |
| `document_saved` | User saves changes to a document via the update papers API | `app/api/papers/update/route.ts` |
| `ai_command_used` | User triggers an AI command (generate, edit, or comment) in the editor | `app/api/ai/command/route.ts` |
| `profile_updated` | User saves their profile information in settings | `app/dashboard/settings/page.tsx` |
| `password_changed` | User successfully changes their account password in settings | `app/dashboard/settings/page.tsx` |
| `stylometry_analyzed` | User uploads documents and triggers writing style analysis | `app/dashboard/settings/page.tsx` |
| `add_funds_clicked` | User clicks the Add Funds Now button on the billing page | `app/dashboard/billing/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/387572/dashboard/1483169
- **New User Signups** (daily trend): https://us.posthog.com/project/387572/insights/Nily3gZd
- **Signup to Sign-in Conversion** (funnel): https://us.posthog.com/project/387572/insights/XmifpUS9
- **Document Generation Funnel** (started → generated): https://us.posthog.com/project/387572/insights/1Z8uUquh
- **AI Command Usage by Type** (breakdown by tool): https://us.posthog.com/project/387572/insights/pBGBimr7
- **Document Saves vs Deletes** (churn signal): https://us.posthog.com/project/387572/insights/ZWEwejm4

> **Important**: Run `bun install` from the monorepo root to install all new packages (`posthog-js`, `posthog-node`, `@posthog/ai`, `@opentelemetry/sdk-node`, `@opentelemetry/resources`), which have been added to `package.json`.

---

## LLM Analytics

LLM analytics was added using the **Vercel AI SDK + OpenTelemetry** approach. The `@posthog/ai` package provides a `PostHogSpanProcessor` that intercepts OpenTelemetry `gen_ai.*` spans from the Vercel AI SDK and converts them into `$ai_generation` events in PostHog automatically — capturing model name, latency, input/output tokens, and cost.

### How it works

- **`instrumentation.ts`** — The `NodeSDK` is initialized with `PostHogSpanProcessor` inside the `register()` function for the `nodejs` runtime. This runs once on server startup.
- **`experimental_telemetry`** — Added to each Vercel AI SDK call to enable span emission and link generations to the calling user via `posthog_distinct_id`.

### Instrumented AI routes

| File | Function ID | Provider |
|---|---|---|
| `app/api/ai/copilot/route.ts` | `copilot` | Groq (`moonshotai/kimi-k2-instruct-0905`) |
| `app/api/ai/command/route.ts` | `ai-command-tool-selection` | Groq — tool selection step |
| `app/api/ai/command/route.ts` | `ai-command-stream` | Groq — content streaming step |
| `app/api/ai/stylometry/route.ts` | `stylometry-analysis` | Google (`gemini-2.5-pro`) |

Each call passes `posthog_distinct_id` from the `x-posthog-distinct-id` request header (or the authenticated user's email for stylometry) to link LLM generations to known users in PostHog.

### New packages added

- `@posthog/ai` — PostHog OpenTelemetry span processor
- `@opentelemetry/sdk-node` — Node.js OpenTelemetry SDK
- `@opentelemetry/resources` — OTel resource attributes helper

View LLM generations in PostHog: https://us.posthog.com/project/387572/llm-analytics/generations

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
