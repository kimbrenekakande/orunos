import { ToolLoopAgent, stepCountIs } from "./braintrust";
import { writeTool , searchTool} from "./tools"
import { groq } from '@ai-sdk/groq';

export const documentAgent = new ToolLoopAgent({
  model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
  instructions: `
    You are an agent that writes university coursework documents. 
    Tirst generate an outline suited to best answer the questions provided,
    Then write the document by generating each section and combining them into a final document.
    Your summary and conclusion should be written in detail as if you were writing a full section for it will be merged with the rest of the document without any formatting changes.
    In cases where its more than a simple question, your outline should facilitate for each question to be answered separately an each should be arranged same way the questions are presented say numbered or lettered.
    In case of things you don't know, you can search for information using the search tool.
  `,
  tools: {
    write: writeTool,
    search: searchTool,
  },
  stopWhen: stepCountIs(4),
});
