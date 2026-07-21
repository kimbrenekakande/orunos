import { tool,generateText } from "./braintrust"
import { createGroq } from '@ai-sdk/groq'
import { deepseek } from '@ai-sdk/deepseek';
import { google, type GoogleLanguageModelOptions } from '@ai-sdk/google';
import {z} from "zod"
import { outlineSchema, SectionLog } from "../types"
import { serverSession } from "../server-session";
import prisma from '@/lib/prisma';
import baseUrl from "../base-url";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const outlineTool = tool({
  description: "Generates an outline for the document based on the document type and provided questions to best answer the questions provided",
  inputSchema: z.object({
    documentType: z.string("The type of document to generate an outline for"),
    questions: z.string("The questions to generate an outline for"),
    instructions: z.string("Any additional instructions for the agent to follow else return empty"),
  }),
  
  execute: async ({ documentType, questions }) => {
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: `
        You are an agent, part of a ${documentType} academic document creation workflow,
        Your role is to generate an outline for the provided questions to best answer the questions provided.
        The output should be aligned with official guidelines for the ${documentType} document type.
        Each section is to be generated separately so make sure each of each section is conhesive and has enough context to make the document come cross as one. 
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
  description: "Default tool. Use when no cachedName is available. Generates each section separately, applies user stylometry, and assembles the final document with citations.",
  inputSchema: outlineSchema,
  execute: async (docPlan) => {
    const session = await serverSession()
    const user = session?.user
    const sections = docPlan.sections
    
    const sectionStatusLog: SectionLog[] = []
    let content : any

    if (docPlan.hasRefs) {
      content = sections.map(async (sec) => {
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
            
            Your output should follow this stylometry analysis below :
            ${user?.style ? `${user.style}` : ""}
          `,
          prompt: `write a deep dive on ${sec['content']}`,
        });
        
        if (!text) sectionStatusLog.push({ title: sec['title'], success: false })
        sectionStatusLog.push({ title: sec['title'], success: true })
        
        console.log(`SECTION LOGS ${sectionStatusLog}`);
        return text
      });
    } else {
      content = sections.map(async (sec) => {
        const { text } = await generateText({
          model: google('gemini-2.5-pro'),
          providerOptions: {
            google: {
              cachedContent: docPlan.cachedName, // prolly will use a context manager here
            } satisfies GoogleLanguageModelOptions,
          },
          prompt: `write a deep dive on ${sec['content']}`,
        });
        return text
      });
    }
    
    //Document Appending
    let document = `# ${docPlan['title']} \n`;  //should be a space btn the markdown annotation and the text to render properly

    const x = await Promise.all(content)
    for (const item of x) document += `\n\n\n ${item} \n `;

    if (x) {
      const citations = docPlan.references
      if (citations.length > 0) {
        document += `\n\n## Citations\n`;
        for (const citation of citations) {
          document += `\n- ${citation}`;
        }
      }
    }

    const saveDocument = await prisma.document.update({
      where : { id : docPlan.id},
      data : {
        title : docPlan.title,
        answer : document,
        status : "READY",
      }
    })

    const getType = await prisma.docType.findUnique({
      where : {type : saveDocument.docTypeId}
    })

    if (!getType) throw new Error("Failed to fetch Document Type")
    

    const saveTransaction = await fetch(`${baseUrl}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentDetails: {
          amount: getType.price,
          chargedAmount: getType.price,
          status: "successful",
          currency: "UGX",
          paymentType: "wallet",
          phoneNumber: user?.phoneNumber,
          description: DocumentType,
        },
      }),
    })

    if (!saveDocument) return { status: "failure", message: "Document creation failed" }
    if (!saveTransaction) throw new Error("Transaction not saved")
    
    return { status: "success", message: "Document created successfully" }
  },
});












// export const searchTool = tool({
//   description: "Searches the web for i nformation on a given topic using Serper.dev API",
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
