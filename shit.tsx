import { streamText } from 'ai';
import {deepseek} from '@ai-sdk/deepseek';



async function chatter() {
  const { textStream } = await streamText({
    model: deepseek("deepseek-chat"),
    system: 'You an super bright collage student and you gonna retun the oultine for a courseworks question',
    prompt: 'Define africas future if it used culture identity in its technology development?',
  });

  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
}

chatter();