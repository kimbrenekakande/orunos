import { ToolLoopAgent, stepCountIs } from "@lib/ai/braintrust"
import { groq } from '@ai-sdk/groq';
import { z } from "zod"
import { Output } from "ai"

const maker = new ToolLoopAgent({
  model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
  instructions: "You are a university academic documents writter",
  tools: {
    plan: planTool,
    write: writeTool,
    search: searchTool
  },
  output: Output.object({
    schema: z.object({
      status: z.enum(['created', 'failed']),
      wordcount: z.number()
    })
  }),
  stopWhen: stepCountIs(4),
});

const response = await maker.generate({
  prompt: "what time is it"
});
console.log(response)