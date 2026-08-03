import { inngest } from "./client";

export const docGeneration = inngest.createFunction(
  { id: "doc-gen", triggers: { event: "app/doc.created" } },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      console.log("sent to ingest for further genrations, please hold")
      // return { processed: true, id: event.data.id };
    });

    await step.sleep("pause", "1s");

    return { message: `Task ${event.data.id} complete`, result };
  }
);