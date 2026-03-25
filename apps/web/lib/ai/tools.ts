import { tool,generateText } from "./braintrust"
import { groq } from '@ai-sdk/groq'
import { google, type GoogleLanguageModelOptions } from '@ai-sdk/google';
import {z} from "zod"
import {outlineSchema} from "../types"
import prisma from '@/lib/prisma';

export const writeTool = tool({
  description: "Expand on the outline to generate detailed content for each section and combine it with the summary and conclusion into a final document",
  inputSchema: outlineSchema.extend({
    id: z.string("The unique identifier for the document"),
    instructions: z.string("Any additional instructions for the agent to follow else return empty"),
  }),
  execute: async (docPlan) => {
    const sections = docPlan.sections
    const content = sections.map(async (sec) => {
      const { text } = await generateText({
        model: groq('openai/gpt-oss-120b'),
        system: `
          You are an agent part of an academic document creation workflow,
          Your role is to generate detailed content on the provided section.
          Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
          your output should start with a subheading from your input.
          rules :
          -Do not use h1 or its equivalent(#)
          -The out put format should markdown
          -Dont add any dividers or conclusions.
          ${docPlan.instructions || ""}
        `,
        prompt: `write a deep dive on ${sec['content']}`,
      });
      return text
    });

    //Document Appending
    let document = '';
    document += `\n # ${docPlan['title']} \n`;  //should be a space btn the markdown annotation and the text to render properly
    document += `\n ## Summary \n ${docPlan['summary']} \n`;

    const x = await Promise.all(content)
    for (const item of x) document += `\n ${item} \n`;
    document += `\n ## Conclusion \n ${docPlan['conclusion']} \n`;


    await prisma.document.update({
      where : { id : docPlan.id},
      data : {
        title : docPlan.title,
        answer : document,
        status : "READY",
      }
    })

    return { status: "done" }
  },
});


export const writeTool4Cached = tool({
  description: "Expand on the outline to generate detailed content for each section and combine it with the summary and conclusion into a final document specifically for prompts with cached content",
  inputSchema: outlineSchema.extend({
    id: z.string("The unique identifier for the document"),
    cachedName : z.string("The name of the cached content to be referred to by the tool calls")
    // instructions: z.string("Any additional instructions for the agent to follow else return empty"),
  }),
  execute: async (docPlan) => {
    const sections = docPlan.sections
    const content = sections.map(async (sec) => {
      const { text } = await generateText({
        model: google('gemini-2.5-pro'),
        system: `
          You are an agent part of an academic document creation workflow,
          Your role is to generate detailed content on the provided section.
          Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
          your output should start with a subheading from your input.
          rules :
          -Do not use h1 or its equivalent(#)
          -The out put format should markdown
          -Dont add any dividers or conclusions.
        `,
        providerOptions: {
          google: {
            cachedContent: docPlan.cachedName,
          } satisfies GoogleLanguageModelOptions,
        },
        prompt: `write a deep dive on ${sec['content']}`,
      });
      return text
    });

    //Document Appending
    let document = '';
    document += `\n # ${docPlan['title']} \n`;  //should be a space btn the markdown annotation and the text to render properly
    document += `\n ## Summary \n ${docPlan['summary']} \n`;

    const x = await Promise.all(content)
    for (const item of x) document += `\n ${item} \n`;
    document += `\n ## Conclusion \n ${docPlan['conclusion']} \n`;


    await prisma.document.update({
      where : { id : docPlan.id},
      data : {
        title : docPlan.title,
        answer : document,
        status : "READY",
      }
    })

    return { status: "done" }
  },
});


export const searchTool = tool({
  description: "Searches the web for information on a given topic using Serper.dev API",
  inputSchema: z.object({
    // The model sometimes calls this tool with `{ search: "...", type: "search" }`
    // instead of `{ query: "..." }`. Support both to avoid tool_use_failed.
    query: z.string().optional().describe("The search query to use"),
    search: z.string().optional().describe("Alias for `query`"),
    type: z.string().optional(),
  }).refine((v) => Boolean(v.query || v.search), {
    message: "Either `query` or `search` must be provided",
  }),
  execute: async (input) => {
    const query = input.query ?? input.search
    if (!query) return null
    try {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': process.env.SERPER_API ?? '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: query })
      });

      const data = await response.json();
      console.log(JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
})
