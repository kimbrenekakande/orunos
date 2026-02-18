'use server';

// import { streamText } from 'ai';
// import { groq } from "@ai-sdk/groq";
// // import { createStreamableValue } from "ai/rsc";

// export async function generate(input: string) {
//   // const stream = createStreamableValue('');

//   (async () => {
//     const { textStream } = streamText({
//       model: groq("moonshotai/kimi-k2-instruct"),
// 		  prompt: input,
//     });

//     stream.done();
//   })();

//   return { output: textStream};
// }