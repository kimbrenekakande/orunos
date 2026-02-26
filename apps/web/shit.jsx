import { ToolLoopAgent, tool, stepCountIs, generateText } from "@lib/ai/braintrust"
import { groq } from '@ai-sdk/groq';
import { z } from "zod"
import {outlineSchema} from "@lib/types"


const planTool = tool({
  description: "",
  inputSchema: outlineSchema,
  outputSchema: outlineSchema,
  execute: async(questionnaire) => {
    const outline = await generateText({
      model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
      system: `
        You are part of a team of experts in creating ${doctype} documents based on the questions provided.
        Your particular role is to generate an outline based suited to the ${doctype} document based on the questions provided.
        rules : ${rules}
      `,
      output: output.object({ schema : outlineSchema }),
      prompt: questionnaire,
    });
    return outline
  }
})

const writeTool = tool({
  description: "Write detailed content based on the output",
  inputSchema: outlineSchema,
  execute: async ({ outline }) => {
    const sections = await outline.sections
    const content = sections.map(async sec => {
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
          ${rules | ""}
        `,
        prompt: `write a deep dive on ${sec['title'], sec['content']}`,
      });
      return text
    });
    
    //Document Appending
    let document = '';
    document += `\n # ${outline['title']} \n`;  //should be a space btn the markdown annotation and the text to render properly
    document += `\n ## Summary \n ${outline['summary']} \n`;
    
    const x = await Promise.all(content)
    for (const item of x) document += `\n ${item} \n`;
    document += `\n ## Conclusion \n ${output['conclusion']} \n`;
    
    return { status: "done" }
  },
});

const searchTool = ""

const maker = new ToolLoopAgent({
  model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
  instructions: "You are a university academic documents writter",
  tools: {
    plan: planTool,
    write: writeTool,
    search: searchTool
  },
  output: {
    schema: z.object({
      status: z.enum(['created', 'failed']),
      wordcount : z.number
    })
  },
  stopWhen: stepCountIs(4),
});

const response = await maker.generate({
  prompt: "what time is it"
});
console.log(response)