import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const documentSchema = z.object({
  title: z.string(),
  summary: z.string(),
  sections: z.array(z.object({
    title: z.string(),
    content: z.string(),
  })),
  conclusion: z.string(),
});

const expandedSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
  deepDive: z.string(),
  examples: z.array(z.string()),
  keyTakeaways: z.array(z.string()),
});

async function expandDocumentParallel(topic: string) {
  // First agent
  const { object: initialDoc } = await generateObject({
    model: openai('gpt-4'),
    schema: documentSchema,
    prompt: `Create a comprehensive document about "${topic}".`,
  });

  // Second agent - process all sections in parallel
  const expandedSections = await Promise.all(
    initialDoc.sections.map(async (section) => {
      const { object } = await generateObject({
        model: openai('gpt-4'),
        schema: expandedSectionSchema,
        prompt: `
          Document: "${initialDoc.title}"
          Summary: ${initialDoc.summary}
          
          Expand this section:
          Title: ${section.title}
          Content: ${section.content}
          
          Provide deeper analysis, examples, and key takeaways.
        `,
      });
      return object;
    })
  );

  return {
    ...initialDoc,
    sections: expandedSections,
  };
}

// Usage
const result = await expandDocumentParallel('Private Equity Rollup Strategy');
console.log(result);