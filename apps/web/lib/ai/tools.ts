import { tool,generateText } from "./braintrust"
import { groq } from '@ai-sdk/groq'
import {z} from "zod"
import {outlineSchema} from "../types"
import { Output } from "ai"
import prisma from '@/lib/prisma';


export const planTool = tool({
  description: "Plan the layout of the information of the document ",
  inputSchema: z.object({
    questions : z.string
  }),
  execute: async(questions) => {
    const outline = await generateText({
      model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
      system: `
        You are part of a team of experts in creating documents based on the questions provided.
        Your particular role is to generate an outline based suited to the document based on the questions provided.
        rules :
      `,
      output: Output.object({
        schema: outlineSchema
      }),
      prompt: `${questions}`,
    });
    
    return {docPlan : outline} 
  }
})

export const writeTool = tool({
  description: "Write detailed content based on the output",
  inputSchema: outlineSchema,
  execute: async (docPlan) => {
    const sections = docPlan.sections
    const content = sections.map(async (sec) => {
      const { text } = await generateText({
        model: groq('moonshotai/kimi-k2-instruct-0905'),
        system: `
          You are an agent part of an academic document creation workflow,
          Your role is to generate detailed content on the provided section.
          Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
          your output should start with a subheading from your input.
          rules :
          -Do not use h1 or its equivalent(#)
          -The out put format should markdown
          -Dont add any dividers or conclusions. 
          -Rules :
        `,
        prompt: `write a deep dive on ${sec['title'], sec['content']}`,
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
      where : { id : id},
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
  description: "Write detailed content based on the output",
  inputSchema: outlineSchema,
  execute: async() => {
    const x = "mod"
  }
})