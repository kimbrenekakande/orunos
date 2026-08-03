import { inngest } from "./client";
import { prisma } from "../prisma-client";

const agentsURL = "http://127.0.0.1:8000/api/v1"; //agents-service url

export const docGeneration = inngest.createFunction(
	{ id: "doc-gen", triggers: { event: "app/doc.created" } },

	async ({ event, step }) => {
		// Kick off agents microservice (don't block the response)
		const result = await step.run("call-agents", async () => {
			const { id, type, qns } = event.data;

			const agents = await fetch(`${agentsURL}/fast`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					docID: id,
					docType: type,
					question: qns,
				}),
			});

			if (!agents.ok) throw new Error(`Agents responded with ${agents.status}`);
			const data = await agents.json();
			const sections = (data.sections as { content: string }[])
				.map((s) => s.content)
				.join("\n\n");

			//update the output into answer
			const updated = await prisma.document.update({
				where: { id: id },
				data: {
					title: data.title,
					answer: sections,
					status: "READY",
				},
			});

			return { processed: true, id, updated };
		});

		await step.sleep("pause", "1s");

		return {
			message: `${event.data.type} Document first draft creation complete`,
			updated: result.updated,
		};
	},
);
