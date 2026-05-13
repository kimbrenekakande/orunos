# PlateJS AI Features — Architecture & Customization Guide

## Architecture Overview

The AI features are built on **PlateJS v51** plugins backed by the **Vercel AI SDK** (`ai` v6) with **Groq** as the primary LLM provider. The system has three layered AI features:

| Feature | Purpose | Plugin | Backend Route |
|---------|---------|--------|---------------|
| **Copilot** | Inline ghost-text completions as you type | `CopilotPlugin` | `POST /api/ai/copilot` |
| **AI Chat** | Commands: edit, generate, comment, improve, etc. | `AIChatPlugin` | `POST /api/ai/command` |
| **Suggestions** | Track-changes (diff-style accept/reject) | `BaseSuggestionPlugin` | (client-side, applied by AI Chat) |

---

## 1. Copilot (Inline Ghost Text)

### Flow

```
User types → CopilotPlugin debounce (500ms)
  → getPrompt() serializes current block to markdown
  → POST /api/ai/copilot { prompt, system }
  → Groq generates continuation (max 50 tokens, low temp)
  → onFinish: api.copilot.setBlockSuggestion({ text })
  → GhostText component renders muted text
  → User presses Tab to accept, Escape to reject
```

### Customization Points

| Point | File | What to Change |
|-------|------|----------------|
| **System prompt** | `copilot-kit.tsx:48` | The `system` field in `completeOptions.body` |
| **Debounce delay** | `copilot-kit.tsx:46` | `debounceDelay` (default 500ms) |
| **API endpoint** | `copilot-kit.tsx:45` | `completeOptions.api` (default `/api/ai/copilot`) |
| **Context builder** | `copilot-kit.tsx:53` | `getPrompt` function (serializes current block) |
| **Ghost text rendering** | `ghost-text.tsx` | Replace `GhostText` component |
| **Keyboard shortcuts** | `copilot-kit.tsx:62-65` | `accept`, `reject`, `invoke`, `acceptWord` |
| **Max tokens / temp** | `copilot/route.ts:17-18` | `maxTokens` (50), `temperature` (0.1) |
| **LLM model** | `copilot/route.ts:16` | `groovy('kimi-k2')` — swap provider/model |

---

## 2. AI Chat (Commands)

### Available Commands

Defined in `ai-menu.tsx` via the `aiChatItems` record. Each item has a `value`, `label`, `icon`, and `onSelect` handler. Commands are organized into menu states:

- **`cursorCommand`** — shown when cursor is in text (no selection)
- **`cursorSuggestion`** — shown when cursor is on a suggestion
- **`selectionCommand`** — shown when text is selected
- **`selectionSuggestion`** — shown when selection has an active suggestion

| Command | `toolName` | `mode` | Description |
|---------|------------|-------|-------------|
| `comment` | `comment` | *auto* | AI reviews content, creates discussions |
| `continueWrite` | `generate` | `insert` | Generates continuation text below |
| `emojify` | `edit` | *auto* | Adds emojis to selected text |
| `explain` | `generate` | *auto* | Explains selected content |
| `fixSpelling` | `edit` | *auto* | Fixes grammar/spelling |
| `generateMarkdownSample` | `generate` | `insert` | Generates markdown sample |
| `generateMdxSample` | `generate` | `insert` | Generates MDX sample |
| `improveWriting` | `edit` | *auto* | Rewrites for quality |
| `makeLonger` | `edit` | *auto* | Expands text |
| `makeShorter` | `edit` | *auto* | Condenses text |
| `simplifyLanguage` | `edit` | *auto* | Simplifies wording |
| `summarize` | `generate` | `insert` | Adds a summary |
| `insertBelow` | `generate` | `insert` | Inserts AI output below |
| `replace` | `edit` | `chat` | Replaces selection |

> `*auto*` = mode is determined by `submitAIChat` based on whether text is selected: `chat` if expanded, `insert` if collapsed.

### Flow

```
User triggers AI (mod+j, toolbar button, slash command, or block context menu)
  → AIMenu popover opens (triggered via afterEditable in AIChatPlugin)
  → User selects a command
  → Command calls editor.getApi(AIChatPlugin).aiChat.submit(input, { prompt, toolName, mode })
  → useChat() (Vercel AI SDK) sends POST /api/ai/command with body: { ctx (editor state), messages, model, toolName }
  → Backend routes to the appropriate prompt+tool
  → Stream chunks flow back through useChatChunk handler in ai-kit.tsx
  → Mode 'insert': streamInsertChunk → AILeaf (purple bg streaming text)
  → Mode 'edit': applyAISuggestions → SuggestionLeaf (green insert / red delete)
  → AILoadingBar shows "Thinking..." / "Writing..." during streaming
  → User accepts/rejects/discards
```

### Command Execution Chain (Concrete Example: "Make longer")

Every inline editor command follows the same 5-layer chain. Here is the full trace for `makeLonger`:

```
Layer 1 — Client Command (ai-menu.tsx:421-430)
┌─────────────────────────────────────────────────────────────┐
│ makeLonger: {                                               │
│   onSelect: ({ editor, input }) => {                        │
│     editor.getApi(AIChatPlugin).aiChat.submit(input, {      │
│       prompt: 'Make longer',     ◄── the actual instruction │
│       toolName: 'edit',          ◄── skips classifier       │
│     });                                                     │
│   },                                                        │
│ }                                                            │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
Layer 2 — Chat Transport (use-chat.ts:52-56)
┌─────────────────────────────────────────────────────────────┐
│ POST /api/ai/command                                        │
│ Body: {                                                     │
│   ctx: { children, selection, toolName: 'edit' },           │
│   messages: [{ role: 'user', content: 'Make longer' }],     │
│   model: (user-selected or default),                        │
│   apiKey: (user-provided or env)                            │
│ }                                                            │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
Layer 3 — Server Router (command/route.ts:48-50)
┌─────────────────────────────────────────────────────────────┐
│ toolName = 'edit' (already set by client)                   │
│   → SKIPS getChooseToolPrompt() classifier                  │
│   → Calls getEditPrompt(editor, { isSelecting, messages })  │
│     where messages[0].content = "Make longer"               │
│                                                             │
│ Prepares streamText() with:                                 │
│   messages: [{ role: 'user', content: editPrompt }]         │
│   model: groq('llama-3.3-70b-versatile')                   │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
Layer 4 — Prompt Builder (prompts.ts:222-308)
┌─────────────────────────────────────────────────────────────┐
│ getEditPrompt():                                            │
│   1. addSelection(editor) → wraps user's selected text      │
│      in <Selection>...</Selection> tags                     │
│   2. getMarkdownWithSelection(editor) → serializes editor   │
│      e.g. "The results were <Selection>not very good</Selec.│
│   3. Calculates prefilledResponse = text before <Selection> │
│   4. buildStructuredPrompt() assembles:                     │
│                                                             │
│   <context>                                                  │
│   <backgroundData>                                           │
│     [markdown with <Selection> tags]                         │
│   </backgroundData>                                          │
│                                                             │
│   Rules: only modify <Selection>, output replaces it, etc.  │
│                                                             │
│   Examples: 8 few-shot (improve word choice, fix grammar,   │
│             expand description, translate, etc.)            │
│                                                             │
│   <history>                                                  │
│     USER: Make longer                                       │
│   </history>                                                 │
│   </context>                                                 │
│                                                             │
│   [task: modify text inside <Selection>]                     │
│   <outputFormatting>markdown</outputFormatting>              │
│   <prefilledResponse>[text before <Selection>]</prefilledResp│
└─────────────────────────────────────────────────────────────┘
        │
        ▼
Layer 5 — Template Engine (utils.ts:92-156)
┌─────────────────────────────────────────────────────────────┐
│ buildStructuredPrompt() joins all non-null sections:        │
│   taskContext? + tone? + backgroundData + rules + examples  │
│   + history + question → wrapped in <context>               │
│ Then appends: task + thinking? + outputFormatting?          │
│   + prefilledResponse?                                      │
│                                                             │
│ Final output: a single string sent as                       │
│   { role: 'user', content: [assembled prompt] }             │
│ to groq('llama-3.3-70b-versatile') via streamText()         │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
Layer 6 — Streaming Back to Client
┌─────────────────────────────────────────────────────────────┐
│ Model responds with edited <Selection> replacement text     │
│   → streamText() streams chunks                             │
│   → useChatChunk() in ai-kit.tsx:39-92 receives each chunk  │
│   → toolName === 'edit' → applyAISuggestions(editor, text)  │
│   → SuggestionPlugin creates diff nodes (green/red marks)   │
│   → User sees track-changes in editor                       │
│   → User presses Accept/Reject/Try Again                    │
└─────────────────────────────────────────────────────────────┘
```

### Prompt Construction Details

The prompt builder (`buildStructuredPrompt` in `utils.ts:92-156`) accepts these sections:

| Section | Source | Purpose |
|---------|--------|---------|
| `taskContext` | caller | Role/identity (e.g. "You are a text editor") |
| `tone` | caller | Desired tone (formal, friendly, etc.) |
| `backgroundData` | `getMarkdownWithSelection()` | The editor content with `<Selection>` markers |
| `rules` | prompt function | Constraints (only edit `<Selection>`, no code fences, etc.) |
| `examples` | prompt function | Few-shot demonstrations |
| `history` | `formatTextFromMessages()` | Conversation history as `ROLE: text` |
| `question` | caller | Direct question to the model |
| `task` | caller | The actual instruction |
| `thinking` | caller | Chain-of-thought prompt |
| `outputFormatting` | caller | Expected format (markdown, plain text, etc.) |
| `prefilledResponse` | text before `<Selection>` | Prefix for the model to continue from |

Only non-null/defined sections are included. Each section is wrapped in relevant XML-like tags (`<context>`, `<backgroundData>`, `<history>`, `<example>`, etc.).

### Customization Points

| Point | File | What to Change |
|-------|------|----------------|
| **Command items** | `ai-menu.tsx:270-505` | Add/remove entries in `aiChatItems` |
| **Command prompt text** | `ai-menu.tsx` (each item's `prompt`) | The instruction sent to the model (e.g. `'Make longer'`) |
| **Command tool name** | `ai-menu.tsx` (each item's `toolName`) | Routes to `edit`, `generate`, or `comment` prompt builder |
| **Menu states** | `ai-menu.tsx:507-554` | `menuStateItems` — which items appear per cursor state |
| **AI menu rendering** | `ai-menu.tsx` | Replace the Popover/cmdk layout |
| **Chat hook** | `use-chat.ts` | Customize `useChat` options, tool routing |
| **Chunk handlers** | `ai-kit.tsx:42-92` | `useChatChunk` — process stream chunks |
| **AI leaf rendering** | `ai-node.tsx` | `AILeaf` — streaming text appearance |
| **Loading bar** | `ai-kit.tsx` | `AILoadingBar` — status messages |
| **Plugin options** | `ai-kit.tsx` | Extend `AIChatPlugin.extend({...})` |
| **Edit prompt** | `command/prompts.ts:222-308` | `getEditPrompt` — text editing instructions |
| **Generate prompt** | `command/prompts.ts:169-220` | `getGeneratePrompt` — content generation instructions |
| **Comment prompt** | `command/prompts.ts:43-167` | `getCommentPrompt` — review/comment instructions |
| **Tool classifier** | `command/prompts.ts:15-41` | `getChooseToolPrompt` — intent classification |
| **Prompt template** | `command/utils.ts:92-156` | `buildStructuredPrompt` — section assembly |
| **Selection markers** | `command/utils.ts:188-206` | `addSelection` / `removeEscapeSelection` — `<Selection>` tag handling |
| **API endpoint** | `command/route.ts` | Model, provider, streaming config, error handling |
| **Settings UI** | `settings-dialog.tsx` | Model picker, API key input (injects into both plugins) |

---

## 3. Suggestions (Track Changes)

### Flow

```
AI edit or user edit with suggestion mode on
  → SuggestionPlugin wraps changes with { suggestion: { id, type, userId } }
  → SuggestionLeaf renders green (insert) or red (delete + strikethrough)
  → SuggestionLineBreak shows corner-down-left icon for newlines
  → BlockSuggestionCard shows suggestion details
  → User clicks Accept → acceptSuggestion()
  → User clicks Reject → rejectSuggestion()
```

### Customization Points

| Point | File | What to Change |
|-------|------|----------------|
| **Plugin config** | `suggestion-kit.tsx` | Extend `BaseSuggestionPlugin` options |
| **Leaf renderer** | `suggestion-node.tsx` | `SuggestionLeaf`, `SuggestionLineBreak` |
| **Static renderer** | `suggestion-node-static.tsx` | Read-only suggestion rendering |
| **Suggestion card** | `block-suggestion.tsx` | Accept/reject UI, comment display |
| **Toolbar button** | `suggestion-toolbar-button.tsx` | Toggle suggestion mode |
| **Base config** | `suggestion-base-kit.tsx` | Server-side suggestion plugin |

---

## 4. AI Comments

### Flow

```
User selects text → "Comment" command
  → api.aiChat.submit(input, { toolName: 'comment' })
  → Backend uses tool-call with streamObject to generate structured comments
  → Each comment: { blockId, content, comment }
  → Client receives data-comment events in use-chat.ts
  → Creates discussion + comment nodes in DiscussionPlugin
  → Applies comment marks to editor text
```

### Customization Points

| Point | File | What to Change |
|-------|------|----------------|
| **Comment prompt** | `command/prompts.ts` | `getCommentPrompt` |
| **Comment processing** | `use-chat.ts:75-125` | Tool call result → discussion/comment creation |
| **Discussion plugin** | `discussion-kit.tsx` | Discussion storage config |

---

## 5. Provider Configuration

### LLM Providers

| Provider | Package | Usage |
|----------|---------|-------|
| **Groq** | `@ai-sdk/groq` | Primary provider — all AI routes |
| **DeepSeek** | `@ai-sdk/deepseek` | Document generation (`writeTool`) |
| **Google (Gemini)** | `@ai-sdk/google`, `@google/genai` | Stylometry analysis, reference caching |
| **Braintrust** | `braintrust` | LLM observability wrapper |

### API Keys (from `.env`)

```
GROQ_API_KEY
AI_GATEWAY_API_KEY
DEEPSEEK_API_KEY
GOOGLE_GENERATIVE_AI_API_KEY
BRAINTRUST_API_KEY
```

### Model Selection

The **Settings Dialog** (`settings-dialog.tsx`) provides a searchable picker with 200+ models across: OpenAI, Google, Anthropic, Meta, Mistral, DeepSeek, xAI (Grok), Cohere, Alibaba (Qwen), Perplexity, Amazon (Nova). The selected model is injected into both `AIChatPlugin` and `CopilotPlugin` options at runtime.

---

## 6. Key Files Reference

```
apps/web/
├── app/api/ai/
│   ├── command/route.ts          # Main AI chat endpoint (streamText)
│   ├── command/prompts.ts        # Prompt builders (generate/edit/comment)
│   ├── command/utils.ts          # Selection markers, markdown extraction
│   ├── copilot/route.ts          # Ghost text completion endpoint
│   ├── generate/route.ts         # Document generation (ToolLoopAgent)
│   └── stylometry/route.ts       # Writing style analysis
├── components/editor/
│   ├── plate-editor.tsx          # Main editor component
│   ├── editor-kit.tsx            # Master plugin registry
│   ├── editor-base-kit.tsx       # Server-side plugin registry
│   ├── use-chat.ts               # Custom AI chat hook
│   ├── settings-dialog.tsx       # Model/API key settings UI
│   └── plugins/
│       ├── ai-kit.tsx            # AIChatPlugin config
│       ├── copilot-kit.tsx       # CopilotPlugin config
│       ├── suggestion-kit.tsx    # SuggestionPlugin config (client)
│       ├── suggestion-base-kit.tsx # SuggestionPlugin config (server)
│       ├── block-selection-kit.tsx # Block selection + AI shortcut
│       ├── discussion-kit.tsx    # Discussion plugin (AI comments)
│       └── comment-kit.tsx       # Comment plugin
├── components/platejs/
│   ├── ai-menu.tsx               # AI command palette (Popover + cmdk)
│   ├── ai-chat-editor.tsx        # AI response preview editor
│   ├── ai-node.tsx               # AILeaf + AIAnchorElement renderers
│   ├── ai-toolbar-button.tsx     # Toolbar wand button
│   ├── ghost-text.tsx            # Copilot ghost text renderer
│   ├── suggestion-node.tsx       # Suggestion leaf/break renderers
│   ├── suggestion-node-static.tsx # Static suggestion renderer
│   ├── suggestion-toolbar-button.tsx # Suggestion toggle button
│   ├── block-suggestion.tsx      # Suggestion accept/reject card
│   ├── block-context-menu.tsx    # Right-click → "Ask AI"
│   ├── cursor-overlay.tsx        # Hides cursors during AI streaming
│   └── slash-node.tsx            # Slash command → AI entry
└── lib/ai/
    ├── agents.ts                 # ToolLoopAgent (document generation)
    ├── tools.ts                  # outlineTool, writeTool
    ├── rules.ts                  # Writing style rules
    └── braintrust.ts             # AI observability wrapper
```
