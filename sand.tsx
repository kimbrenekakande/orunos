import { groq } from '@ai-sdk/groq';
import { generateObject } from 'ai';
import { z } from 'zod';


// Conceptual example - you'll build this in Section 2
const responseSchema = z.object({
  category: z.enum(['bug', 'feature', 'praise']),
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  priority: z.enum(['low', 'medium', 'high']),
});

const { object } = await generateObject({
  model: groq('moonshotai/kimi-k2-instruct'),
  prompt: 'Analyze this feedback: "i love africa but i hate the food their"',
  schema: responseSchema,
});

const x = object

// Result: { category: 'bug', sentiment: 'negative', priority: 'high' }
// Benefit: Ready-to-use data for your application logic!

console.log(x)