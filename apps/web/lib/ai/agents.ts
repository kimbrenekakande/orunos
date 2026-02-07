import { generateText, generateObject } from "./braintrust";
import { groq } from '@ai-sdk/groq';
import { agentProps, outlineSchema } from "../types";
import { rules } from "./rules";

export async function documentAgent({ doctype, questionnaire }: agentProps) {
  let document = '';
  
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
  document += `\n\n${output['title']}\n\n`  
  document += output['summary']
  

  const santa = sections.map(async sec => {
    const { text } = await generateText({
      model: groq('moonshotai/kimi-k2-instruct-0905'),
      system: `
        you are a standard course work for university students
        rules : ${rules}
      `,
      prompt: `write a deep dive on ${sec['title'], sec['content']}, dont add any dividers or conclusions. the out put format should be compatible with platejs`,
    });
    return text;
  })
  
  
  const x = await Promise.all(santa)
  document += x.join('')
  document += output['conclusion']
  
  return {
    title: output['title'],
    body: document
  };
}
