import { deepseek } from '@ai-sdk/deepseek';
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const { reasoningText, text } = await generateText({
  model: groq('openai/gpt-oss-20b'),
  prompt: 'Explain quantum entanglement.',
});




console.log(reasoningText, text)