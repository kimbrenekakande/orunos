"use client";
import * as React from "react";
import { withAIBatch } from "@platejs/ai";
import {
  AIChatPlugin,
  AIPlugin,
  applyAISuggestions,
  streamInsertChunk,
  useChatChunk,
} from "@platejs/ai/react";
import { getPluginType, KEYS, PathApi } from "platejs";
import { usePluginOption } from "platejs/react";
import { AILoadingBar, AIMenu } from "@/components/platejs/ai-menu";
import { AIAnchorElement, AILeaf } from "@/components/platejs/ai-node";
import { useChat } from "../use-chat";
import { CursorOverlayKit } from "./cursor-overlay-kit";
import { MarkdownKit } from "./markdown-kit";

export const aiChatPlugin = AIChatPlugin.extend({
  options: {
    chatOptions: {
      api: "/api/ai/command",
      body: {},
    },
  },
  render: {
    afterContainer: AILoadingBar,
    afterEditable: AIMenu,
    node: AIAnchorElement,
  },
  shortcuts: { show: { keys: "mod+j" } },
  useHooks: ({ editor, getOption }) => {
    useChat();
    const mode = usePluginOption(AIChatPlugin, "mode");
    const toolName = usePluginOption(AIChatPlugin, "toolName");
    const chunkProcessingRef = React.useRef(false);

    // ✅ Stable refs so queueMicrotask closure always has latest values
    const modeRef = React.useRef(mode);
    const toolNameRef = React.useRef(toolName);
    React.useEffect(() => {
      modeRef.current = mode;
    }, [mode]);
    React.useEffect(() => {
      toolNameRef.current = toolName;
    }, [toolName]);

    useChatChunk({
      onChunk: ({ chunk, isFirst, nodes }) => {
        if (chunkProcessingRef.current) return;
        chunkProcessingRef.current = true;

        // ✅ Defer all editor mutations out of React's render/update cycle
        queueMicrotask(() => {
          try {
            const currentMode = modeRef.current;

            if (isFirst && currentMode === "insert") {
              editor.tf.withoutSaving(() => {
                editor.tf.insertNodes(
                  {
                    children: [{ text: "" }],
                    type: getPluginType(editor, KEYS.aiChat),
                  },
                  {
                    at: PathApi.next(editor.selection!.focus.path.slice(0, 1)),
                  },
                );
              });
              editor.setOption(AIChatPlugin, "streaming", true);
            }

            if (currentMode === "insert" && nodes.length > 0) {
              withAIBatch(
                editor,
                () => {
                  if (!getOption("streaming")) return;
                  editor.tf.withScrolling(() => {
                    streamInsertChunk(editor, chunk, {
                      textProps: {
                        [getPluginType(editor, KEYS.ai)]: true,
                      },
                    });
                  });
                },
                { split: isFirst },
              );
            }
          } finally {
            chunkProcessingRef.current = false; // ✅ resets after work, not before
          }
        });
      },

      onFinish: ({ content }) => {
        // ✅ Defer setOption calls too — they also trigger state updates
        queueMicrotask(() => {
          const currentToolName = toolNameRef.current;
          const currentMode = modeRef.current;

          // Apply edits once with the full replacement text (instead of per-chunk),
          // which keeps the suggestion diff aligned and avoids garbled text.
          if (currentToolName === "edit" && currentMode === "chat" && content) {
            const chatSelection = editor.getOption(
              AIChatPlugin,
              "chatSelection",
            );
            if (chatSelection) {
              editor.tf.setSelection(chatSelection);
            }
            applyAISuggestions(editor, content);
          }

          editor.setOption(AIChatPlugin, "streaming", false);
          editor.setOption(AIChatPlugin, "_blockChunks", "");
          editor.setOption(AIChatPlugin, "_blockPath", null);
          editor.setOption(AIChatPlugin, "_mdxName", null);
        });
      },
    });
  },
});

export const AIKit = [
  ...CursorOverlayKit,
  ...MarkdownKit,
  AIPlugin.withComponent(AILeaf),
  aiChatPlugin,
];
