import { ToolLoopAgent, stepCountIs } from "./braintrust";
import {planTool, writeTool } from "./tools"
import { groq } from '@ai-sdk/groq';

export const documentAgent = new ToolLoopAgent({
  model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
  instructions: "You are a university academic documents writer. When calling the write tool, you MUST include the document ID that was provided in the prompt.",
  tools: {
    plan: planTool,
    write: writeTool,
  },
  stopWhen: stepCountIs(4),
});
