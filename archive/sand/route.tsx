import { streamText } from 'ai';
import { deepseek } from '@ai-sdk/deepseek';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { textStream } = await streamText({
      model: deepseek("deepseek-chat"),
      system: 'You are a super bright college student and you will return the outline for a coursework question',
      prompt: 'Define Africa\'s future if it used cultural identity in its technology development?',
    });

    // Create a streaming response with raw text
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const reader = textStream.getReader();
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // Send the text directly without JSON wrapping
            controller.enqueue(encoder.encode(value));
          }
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    // Return the response as plain text
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
