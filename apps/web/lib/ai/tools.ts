import { z } from "zod";
import { tool } from "ai";
import { generateText, generateObject } from './braintrust';
import { groq } from '@ai-sdk/groq';
import { outlineSchema } from "../types";


export const expander = tool({
  name: "DocExpander",
  description: "Expand the outline of a ${doctype} document based on the provided outline. by generating the content for each section.",
  inputSchema: outlineSchema,
  outputSchema: z.array(z.object({
    Title: z.string().min(10),
    text: z.string().min(10),
  })),
  
  execute : async (sections) => {
    const expandedSections = await Promise.all(sections.map(async sec => {
      const { text } = await generateText({
        model: groq('moonshotai/kimi-k2-instruct-0905'),
        system: "you are a standard course work for university students",
        prompt: `write a deep dive on ${sec['title'], sec['content']}, dont add any dividers or conclusions.`,
      });
      return { ...sec, text };
    }));
    return expandedSections;
  },
});