import { ToolLoopAgent, stepCountIs } from "./braintrust";
import { writeTool, outlineTool } from "./tools"
import { createGroq } from '@ai-sdk/groq';
import { serverSession } from "@/lib/server-session";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function doCreator(documentType: string, docQnz: string) {
  
  const session = await serverSession();
  const user = session?.user;
  if (!user) console.log("user not found");
  const style = user?.style;
  
  const documentAgent = new ToolLoopAgent({
    model: groq('llama-3.3-70b-versatile'),
    instructions: `
      You are an agent that specializes in writing university ${documentType} academic documents.
      Generate an outline suited to best answer the questions provided,
      Use the tools at your disposal to generate the documents.
      When using a tool, you MUST NOT provide any introductory text,explanations, or conversational filler. 
      Output ONLY the tool call in the required format.
      when calling the writer tool make sure the title you pass to in the sections matches the title you want used as a subheading in the document creation.
      In cases where its more than a simple question, your outline should facilitate for each question to be answered separately and each should be arranged same way the questions are presented say numbered or lettered.
      In case of things you don't know, you can search for information using the search tool if you have it available.
      Always make sure you include t
      ${style ? `You should write in the stylometry below :  ${style} ` : ''}
    `,
    tools: {
      write: writeTool,
      outline: outlineTool,
    },
    stopWhen: stepCountIs(3),
  });
  
  const flow = await documentAgent.generate({
    prompt: docQnz,
  });
  
  return flow;
};


