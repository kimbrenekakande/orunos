import type { NextRequest } from "next/server";

import { convertToModelMessages, streamText, tool } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";

const slatePointSchema = z.object({
	path: z.array(z.number()),
	offset: z.number(),
});

const slateRangeSchema = z.object({
	anchor: slatePointSchema,
	focus: slatePointSchema,
});

const slateTextSchema = z.object({ text: z.string() }).catchall(z.unknown());

const slateElementSchema: z.ZodType = z.lazy(() =>
	z
		.object({
			type: z.string(),
			children: z.array(z.union([slateTextSchema, slateElementSchema])),
		})
		.catchall(z.unknown()),
);

const slateValueSchema = z.array(slateElementSchema).nullable();

const ctxSchema = z.object({
	children: slateValueSchema,
	selection: slateRangeSchema.nullable(),
	toolName: z.enum(["comment", "edit", "generate"]).nullable(),
});

export async function POST(req: NextRequest) {
	const {
		messages,
		model = "llama-3.3-70b-versatile",
		ctx: clientCtx,
	} = await req.json();
	const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

	if (!process.env.GROQ_API_KEY) {
		return new Response(JSON.stringify({ error: "Missing GROQ API key" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const result = streamText({
			model: groq(model),
			system:
				"You are an AI assistant inside a document editor. You have an `edit` tool that applies changes to the user's document. Call it only when the user explicitly requests a document change (e.g. 'do this', 'rewrite this', 'fix grammar', 'make it shorter', 'add a summary'). For questions or general conversation, answer directly and do not call the tool.",
			messages: await convertToModelMessages(messages),
			temperature: 0.1,
			tools: {
				// Custom tool to call api/ai/command to have editing control
				edit: tool({
					description:
						"Apply an edit or change to the user's document. Use only when the user asks to modify document content (e.g. rewrite, fix, shorten, summarize into the document).",
					inputSchema: z.object({
						ctx: ctxSchema,
					}),
					execute: async ({ ctx: modelCtx }) => {
						// Forward the real editor state (from the client) plus the
						// toolName chosen by the model to the command route.
						await fetch(`${req.nextUrl.origin}/api/ai/command`, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								ctx: {
									children: clientCtx?.children ?? modelCtx.children,
									selection: clientCtx?.selection ?? modelCtx.selection,
									toolName: modelCtx.toolName,
								},
								messages,
							}),
						});
					},
				}),
			},
			experimental_telemetry: {
				isEnabled: true,
				functionId: "chat",
				metadata: {},
			},
		});

		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error(
			"Chat AI error:",
			error instanceof Error ? error.message : error,
		);
		return new Response(
			JSON.stringify({
				error:
					error instanceof Error
						? error.message
						: "Failed to process AI request",
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
