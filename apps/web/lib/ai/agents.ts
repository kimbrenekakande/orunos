import { generateText } from "./braintrust";
import { groq } from '@ai-sdk/groq';
import { agentProps } from "../types";
import { outliner, expander, merger } from "./tools";
import { stepCountIs } from "ai";


export async function documentAgent({ doctype, questionnaire }: agentProps) {
  const results = await generateText({
    model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
    system: `
      You are a standard ${doctype} document creator agent for university students.
      Your task is to generate a ${doctype} based on the provided questionnaire.
      create an outline of the document. and generate the document based off of it.
      
      rules:
        Avoid using overly complex language.
        Avoid using mdashes.
        Be concise and clear.
        Follow the formatting guidelines provided.
    `,
    prompt: questionnaire,
    stopWhen : stepCountIs(10),
    tools: {
      DocOutliner: outliner,
      DocExpander: expander,
      DocMerger: merger,
    },
  });
  return results.text;
}
