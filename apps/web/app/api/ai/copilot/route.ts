import type { NextRequest } from 'next/server';

import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { createGroq } from '@ai-sdk/groq';

export async function POST(req: NextRequest) {
  const {
    apiKey: key,
    prompt,
    system,
  } = await req.json();

  const groq = createGroq({
    apiKey: key || process.env.GROQ_API_KEY,
  });

  if (!key && !process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'Missing API key.' },
      { status: 401 }
    );
  }

  try {
    const result = await generateText({
      abortSignal: req.signal,
      maxOutputTokens: 50,
      model: groq('llama-3.3-70b-versatile'),
      prompt,
      system,
      temperature: 0.1,
      experimental_telemetry: {
        isEnabled: true,
        functionId: "copilot",
        metadata: {},
      },
    });

    const text = result.steps?.flatMap(s => s.content?.filter(c => c.type === 'text').map(c => c.text)).join('') || '';

    return NextResponse.json({ text });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(null, { status: 408 });
    }
    console.error('Copilot AI error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
