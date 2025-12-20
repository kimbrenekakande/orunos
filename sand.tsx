import { groq } from '@ai-sdk/groq';
import {generateObject, generateText } from 'ai';
import { z } from 'zod';

const outlineSchema = z.object({
  title : z.string(),
  summary : z.string(),
  sections : z.array(z.object({title : z.string(),content : z.string()})),
  conclusion : z.string()
});


let x = '';

const results = await generateObject({
    model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
    system: "you are a standard course work for university students",
    prompt: "Private Equity rollup",
    schema : outlineSchema
  });

const output = results.object;
const sections = output['sections'];
x += `\n\n${output['title']}\n\n`
x += output['summary']


const santa = sections.map(async sec => {
  const { text } = await generateText({
    model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
    system: "you are a standard course work for university students",
    prompt: `write a deep dive on ${sec['title'], sec['content']}`,
  });
  return text;
})

const y = await Promise.all(santa)

x += y.join('')
x += output['conclusion']

// console.log(results.object);
// console.log(x);
// console.log(body);
console.log(x);
