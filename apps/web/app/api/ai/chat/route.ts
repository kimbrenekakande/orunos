import type { NextRequest } from "next/server";

import { convertToModelMessages, streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";

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

	const hasSelection = Boolean(clientCtx?.text?.trim());

	const system = hasSelection
		? `You are an AI assistant inside a document editor. The user has selected the following text, wrapped in <Selection> tags:

<Selection>${clientCtx.text}</Selection>

Answer the user's questions about this selection directly and concisely. Do not modify the document unless the user explicitly asks for an edit.`
		: "You are an AI assistant inside a document editor. Answer the user's questions directly and concisely.";

	try {
		const result = streamText({
			model: groq(model),
			system,
			messages: await convertToModelMessages(messages),
			temperature: 0.1,
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
					error instanceof Error ? error.message : "Failed to process AI request",
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
