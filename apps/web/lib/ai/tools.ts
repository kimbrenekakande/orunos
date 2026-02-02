import { z } from "zod";
import { tool } from "ai";
import { generateText, generateObject } from './braintrust';
import { groq } from '@ai-sdk/groq';
import { outlineSchema } from "../types";



export const outliner = tool({
  name: "DocOutliner",
  description: "Understand the structure of a question/s and generate an outline of the {doctype} document.",
  inputSchema: z.object({
    text: z.string().min(10),
  }),
  outputSchema: outlineSchema,
  
  execute: async ({ text }) => {
    const outline = await generateObject({
      model: groq('moonshotai/kimi-k2-instruct-0905'),
      system: "you are a standard course work for university students",
      prompt: `outline a doctype document based on the following text: text`,
    });
    return outline;
  },
});



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



export const merger = tool({
  name: "DocMerger",
  description: "Merge the content of multiple documents into a single coherent and complete document.",
  // inputSchema: outlineSchema,
  outputSchema: z.object({
    Title: z.string().min(10),
    text: z.string().min(10),
  }),
  
  
  execute: async () => {
    const output = results.object;
    const sections = output['sections'];
    content += `\n\n${output['title']}\n\n`
    content += output['summary']
  },
});

