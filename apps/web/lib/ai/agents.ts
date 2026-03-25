import { ToolLoopAgent, stepCountIs } from "./braintrust";
import { writeTool , searchTool, writeTool4Cached} from "./tools"
import { groq } from '@ai-sdk/groq';


export const documentAgent = new ToolLoopAgent({
  model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
  instructions: `
    You are an agent that utilizes tools at your disposal to write university coursework documents.
    Tirst generate an outline suited to best answer the questions provided,
    Then write the document by generating each section and combining them into a final document.
    Your summary and conclusion should be written in detail as if you were writing a full section for it will be merged with the rest of the document without any formatting changes.
    In cases where its more than a simple question, your outline should facilitate for each question to be answered separately an each should be arranged same way the questions are presented say numbered or lettered.
    In case of things you don't know, you can search for information using the search tool.
  `,
  tools: {
    write: writeTool,
    // write4cached : writeTool4Cached,
    // search: searchTool,
  },
  stopWhen: stepCountIs(2),
});
