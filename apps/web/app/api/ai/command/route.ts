import type { ChatMessage,ToolName } from '@/components/editor/use-chat';
import type { NextRequest } from 'next/server';
import { createGroq } from '@ai-sdk/groq';

import {
  type LanguageModel,
  type UIMessageStreamWriter,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateObject,
  streamObject,
  streamText,
  tool,
} from 'ai';
import { NextResponse } from 'next/server';
import { type SlateEditor, createSlateEditor, nanoid } from 'platejs';
import { z } from 'zod';

import { BaseEditorKit } from '@/components/editor/editor-base-kit';
import { markdownJoinerTransform } from '@/lib/markdown-joiner-transform';

import { getChooseToolPrompt, getCommentPrompt, getEditPrompt, getGeneratePrompt } from './prompts';

export async function POST(req: NextRequest) {
  const { apiKey: key, ctx, messages: messagesRaw = [], model } = await req.json();
  const { children, selection, toolName: toolNameParam } = ctx;

  const editor = createSlateEditor({
    plugins: BaseEditorKit,
    selection,
    value: children,
  });

  const groq = createGroq({
    apiKey: key || process.env.GROQ_API_KEY,
  });

  if (!key && !process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'Missing API key.' },
      { status: 401 }
    );
  }

  const isSelecting = editor.api.isExpanded();

  try {
    const stream = createUIMessageStream<ChatMessage>({
      execute: async ({ writer }) => {
        let toolName = toolNameParam;

        if (!toolName) {
          const { object: AIToolName } = await generateObject({
            enum: isSelecting
              ? ['generate', 'edit', 'comment']
              : ['generate', 'comment'],
            model: groq(model || 'llama-3.3-70b-versatile'),
            output: 'enum',
            prompt: getChooseToolPrompt(messagesRaw),
            experimental_telemetry: {
              isEnabled: true,
              functionId: "ai-command-tool-selection",
              metadata: {},
            },
          });

          writer.write({
            data: AIToolName as ToolName,
            type: 'data-toolName',
          });

          toolName = AIToolName;
        }

        const stream = streamText({
          experimental_transform: markdownJoinerTransform(),
          model: groq(model || 'llama-3.3-70b-versatile'),
          // Not used
          prompt: '',
          experimental_telemetry: {
            isEnabled: true,
            functionId: "ai-command-stream",
            metadata: {},
          },
          tools: {
            comment: getCommentTool(editor, {
              messagesRaw,
              model: groq(model || 'llama-3.3-70b-versatile'),
              writer,
            }),
          },
          prepareStep: async (step) => {
            if (toolName === 'comment') {
              return {
                ...step,
                toolChoice: { toolName: 'comment', type: 'tool' },
              };
            }

            if (toolName === 'edit') {
              const editPrompt = getEditPrompt(editor, {
                isSelecting,
                messages: messagesRaw,
              });

              return {
                ...step,
                activeTools: [],
                messages: [
                  {
                    content: editPrompt,
                    role: 'user',
                  },
                ],
              };
            }

            if (toolName === 'generate') {
              const generatePrompt = getGeneratePrompt(editor, {
                messages: messagesRaw,
              });

              return {
                ...step,
                activeTools: [],
                messages: [
                  {
                    content: generatePrompt,
                    role: 'user',
                  },
                ],
                model: groq(model || 'llama-3.3-70b-versatile'),
              };
            }
          },
        });

        writer.merge(stream.toUIMessageStream({ sendFinish: false }));
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (err) {
    console.error('AI command error:', err instanceof Error ? err.message : err);
    const message =
      err instanceof Error ? err.message : 'Failed to process AI request';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const getCommentTool = (
  editor: SlateEditor,
  {
    messagesRaw,
    model,
    writer,
  }: {
    messagesRaw: ChatMessage[];
    model: LanguageModel;
    writer: UIMessageStreamWriter<ChatMessage>;
  }
) => {
  return tool({
    description: 'Comment on the content',
    inputSchema: z.object({}),
    execute: async () => {
      const { elementStream } = streamObject({
        model,
        output: 'array',
        prompt: getCommentPrompt(editor, {
          messages: messagesRaw,
        }),
        schema: z
          .object({
            blockId: z
              .string()
              .describe(
                'The id of the starting block. If the comment spans multiple blocks, use the id of the first block.'
              ),
            comment: z
              .string()
              .describe('A brief comment or explanation for this fragment.'),
            content: z
              .string()
              .describe(
                String.raw`The original document fragment to be commented on.It can be the entire block, a small part within a block, or span multiple blocks. If spanning multiple blocks, separate them with two \n\n.`
              ),
          })
          .describe('A single comment'),
      });

      for await (const comment of elementStream) {
        const commentDataId = nanoid();

        writer.write({
          id: commentDataId,
          data: {
            comment: comment,
            status: 'streaming',
          },
          type: 'data-comment',
        });
      }

      writer.write({
        id: nanoid(),
        data: {
          comment: null,
          status: 'finished',
        },
        type: 'data-comment',
      });
    },
  });
};
