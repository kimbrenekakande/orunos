import { tool,generateText } from "./braintrust"
import { groq } from '@ai-sdk/groq'
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


export const searchTool = tool({
  description: "Searches the web for information on a given topic using Serper.dev API",
  inputSchema: z.object({
    query: z.string().describe("The search query to use"),
  }),
  execute: async(query) => {
    const data = JSON.stringify({
      "q": {query}
    });
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://google.serper.dev/search',
      headers: { 
        'X-API-KEY': process.env.SERPER_API, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
      }
      catch (error) {
        console.log(error);
      }
    }
    
    return await makeRequest();
  }
})
