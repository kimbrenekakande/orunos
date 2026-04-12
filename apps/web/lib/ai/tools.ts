import { tool,generateText } from "./braintrust"
import { groq } from '@ai-sdk/groq'
import { deepseek } from '@ai-sdk/deepseek';
// import { google, type GoogleLanguageModelOptions } from '@ai-sdk/google';
import {z} from "zod"
import {outlineSchema, SectionLog} from "../types"
import prisma from '@/lib/prisma';

export const outlineTool = tool({
  description: "Generates an outline for the document based on the document type and provided questions to best answer the questions provided",
  inputSchema: z.object({
    documentType: z.string("The type of document to generate an outline for"),
    questions: z.string("The questions to generate an outline for"),
    instructions: z.string("Any additional instructions for the agent to follow else return empty"),
  }),
  
  execute: async ({ documentType, questions }) => { // removed instructions from input schema
    const { text } = await generateText({
      model: groq('openai/gpt-oss-120b'),
      system: `
        You are an agent, part of a ${documentType} academic document creation workflow,
        Your role is to generate an outline for the provided questions to best answer the questions provided.
        The output should be aligned with official guidelines for the ${documentType} document type.
        rules :
        - do not include the cover page 
        - do not include any Appendices
        - the title you use should be those you want used as subheadings in the document creation so keep that into account
      `,
      prompt: `questions: ${questions}`,
    });
    
    if (!text) return { status: "error", message: "Failed to generate outline" }
    return text
  },
});



export const writeTool = tool({
  description: "Expand on the outline to generate detailed content for each section and combine it with the summary and conclusion into a final document",
  inputSchema: outlineSchema,
  execute: async (docPlan) => {
    const sections = docPlan.sections
    
    const sectionStatusLog: SectionLog[] = []
    
    const content = sections.map(async (sec) => {
      const { text } = await generateText({
        model: deepseek('deepseek-chat'),
        system: `
          You are an agent part of an academic document creation workflow,
          Your role is to generate detailed content on the provided section.
          Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
          your output should start with a subheading passed to you as the section title.
          rules :
          -Do not use h1 or its equivalent(#)
          -The out put format should markdown
          -Dont add any dividers or conclusions.
        `,
        prompt: `write a deep dive on ${sec['content']}`,
      });
      
      if (!text) sectionStatusLog.push({ title: sec['title'], success: false })
      sectionStatusLog.push({ title: sec['title'], success: true })
      
      console.log(`SECTION LOGS ${sectionStatusLog}`);
      return text
    });
    
    //Document Appending
    let document = `# ${docPlan['title']} \n`;  //should be a space btn the markdown annotation and the text to render properly

    const x = await Promise.all(content)
    for (const item of x) document += `\n\n\n ${item} \n .......\n`;

    if (x) {
      const citations = docPlan.references
      if (citations.length > 0) {
        document += `\n\n## Citations\n`;
        for (const citation of citations) {
          document += `\n- ${citation}`;
        }
      }
    }

    const saveResult = await prisma.document.update({
      where : { id : docPlan.id},
      data : {
        title : docPlan.title,
        answer : document,
        status : "READY",
      }
    })

    if (!saveResult) return { status: "failure", message: "Document creation failed" }
    return { status: "success", message: "Document created successfully" }
  },
});


// export const writeCachedTool = tool({
//   description: "Expand on the outline to generate detailed content for each section and combine it with the summary and conclusion into a final document specifically for prompts with cached content",
//   inputSchema: outlineSchema.extend({
//     id: z.string("The unique identifier for the document"),
//     cachedName : z.string("The name of the cached content to be referred to by the tool calls")
//     // instructions: z.string("Any additional instructions for the agent to follow else return empty"),
//   }),
//   execute: async (docPlan) => {
//     const sections = docPlan.sections
//     const content = sections.map(async (sec) => {
//       const { text } = await generateText({
//         model: google('gemini-2.5-pro'),
//         system: `
//           You are an agent part of an academic document creation workflow,
//           Your role is to generate detailed content on the provided section.
//           Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
//           your output should start with a subheading from your input.
//           rules :
//           -Do not use h1 or its equivalent(#)
//           -The out put format should markdown
//           -Dont add any dividers or conclusions.
//         `,
//         providerOptions: {
//           google: {
//             cachedContent: docPlan.cachedName,
//           } satisfies GoogleLanguageModelOptions,
//         },
//         prompt: `write a deep dive on ${sec['content']}`,
//       });
//       return text
//     });

//     //Document Appending
//     let document = '';
//     document += `\n # ${docPlan['title']} \n`;  //should be a space btn the markdown annotation and the text to render properly
//     document += `\n ## Summary \n ${docPlan['summary']} \n`;

//     const x = await Promise.all(content)
//     for (const item of x) document += `\n ${item} \n`;
//     document += `\n ## Conclusion \n ${docPlan['conclusion']} \n`;


//     await prisma.document.update({
//       where : { id : docPlan.id},
//       data : {
//         title : docPlan.title,
//         answer : document,
//         status : "READY",
//       }
//     })

//     return { status: "done" }
//   },
// });


// export const searchTool = tool({
//   description: "Searches the web for information on a given topic using Serper.dev API",
//   inputSchema: z.object({
//     // The model sometimes calls this tool with `{ search: "...", type: "search" }`
//     // instead of `{ query: "..." }`. Support both to avoid tool_use_failed.
//     query: z.string().optional().describe("The search query to use"),
//     search: z.string().optional().describe("Alias for `query`"),
//     type: z.string().optional(),
//   }).refine((v) => Boolean(v.query || v.search), {
//     message: "Either `query` or `search` must be provided",
//   }),
//   execute: async (input) => {
//     const query = input.query ?? input.search
//     if (!query) return null
//     try {
//       const response = await fetch('https://google.serper.dev/search', {
//         method: 'POST',
//         headers: {
//           'X-API-KEY': process.env.SERPER_API ?? '',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ q: query })
//       });

//       const data = await response.json();
//       console.log(JSON.stringify(data));
//       return data;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   }
// })
