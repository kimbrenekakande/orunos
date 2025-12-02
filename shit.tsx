import { generateText } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const { text } = await generateText({
  model: deepseek('deepseek-chat'),
  system: 'You are a super bright college student and you are going to return the outline for a coursework question',
  prompt: 'Define Africa\'s future if it used cultural identity in its technology development?',
});

console.log(text);
