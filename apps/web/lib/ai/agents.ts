import { generateText, generateObject } from "./braintrust";
import { groq } from '@ai-sdk/groq';
import { agentProps, outlineSchema } from "../types";
import { rules } from "./rules";

export async function documentAgent({ doctype, questionnaire }: agentProps) {
  
  const outliner = await generateObject({
    model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
    system: `
      You are part of a team of experts in creating ${doctype} documents based on the questions provided.
      Your particular role is to generate an outline based suited to the ${doctype} document based on the questions provided.
      rules : ${rules}
    `,
    prompt: questionnaire,
    schema : outlineSchema
  });
  
  const output = outliner.object;
  const sections = output['sections'];

  const santa = sections.map(async sec => {
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
        ${rules}
      `,
      prompt: `write a deep dive on ${sec['title'], sec['content']}`,
    });
    return text;
  })
  
  
  //Document Appending
  let document = '';
  document += `\n # ${output['title']} \n`;  //should be a space btn the markdown annotation and the text to render properly
  document += `\n ## Summary \n ${output['summary']} \n`;
  
  const x = await Promise.all(santa)
  for (const item of x) {
    document += `\n ${item} \n`;
  }

  document += `\n ## Conclusion \n ${output['conclusion']} \n`;
  
  return {
    title: output['title'],
    body: document
  };
}
