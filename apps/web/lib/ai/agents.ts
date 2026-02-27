import { ToolLoopAgent, stepCountIs } from "./braintrust";
import {planTool, writeTool, searchTool } from "./tools"
import { groq } from '@ai-sdk/groq';
import { z } from "zod"
import { Output } from "ai"

export const documentAgent = new ToolLoopAgent({
  model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
  instructions: "You are a university academic documents writer",
  tools: {
    plan: planTool,
    write: writeTool,
    search: searchTool,
  },
  output: Output.object({
    schema: z.object({
      status: z.enum(['created', 'failed']),
      wordcount: z.number(),
    })
  }),
  stopWhen: stepCountIs(4),
});



