# Inline Editing Guide - Plate.js in Orunos

This comprehensive guide explains how inline editing works in this Next.js project using **Plate.js** (a rich text editor framework built on Slate.js). You'll learn the complete architecture, how to customize every aspect, and how to configure AI prompts for intelligent editing features.

**Version:** Plate.js v51.1.3 | **Next.js:** 16 | **React:** 19

---

## Table of Contents

1. [Overview](#overview)
2. [Core Architecture](#core-architecture)
3. [How Inline Editing Works](#how-inline-editing-works)
4. [Key Components](#key-components)
5. [Customization Guide](#customization-guide)
6. [AI Features & Prompt Customization](#ai-features--prompt-customization)
7. [Common Use Cases](#common-use-cases)
8. [API Reference](#api-reference)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Plate.js?

**Plate.js** is a plugin-based rich text editor framework built on top of **Slate.js**. It provides:
- A modular plugin system for adding features
- Pre-built components (tables, lists, code blocks, media, equations, etc.)
- Full TypeScript support
- React hooks for editor state management
- AI-powered editing capabilities
- Markdown serialization/deserialization

### Tech Stack

```
Plate.js (v51) → Slate.js (underlying editor) → React 19 → Next.js 16
                      ↓
              AI Integration (Groq, OpenAI, Google AI)
```

### Project Structure

```
apps/web/
├── components/
│   ├── editor/                    # Main editor configuration
│   │   ├── plate-editor.tsx       # Entry point - renders the editor
│   │   ├── editor-kit.tsx         # Plugin registry (all active plugins)
│   │   ├── editor-base-kit.tsx    # Base plugin configurations
│   │   ├── transforms.ts          # Custom editor operations
│   │   ├── use-chat.ts            # AI chat hook configuration
│   │   ├── doc.tsx                # PDF document template
│   │   └── plugins/               # Plugin configurations
│   │       ├── ai-kit.tsx         # AI chat & suggestions
│   │       ├── copilot-kit.tsx    # AI text completion (ghost text)
│   │       ├── markdown-kit.tsx   # Markdown support
│   │       ├── list-kit.tsx       # List functionality
│   │       ├── table-kit.tsx      # Tables
│   │       └── ...                # 50+ other plugins
│   └── platejs/                   # UI components for editor
│       ├── editor.tsx             # Editor container & content styles
│       ├── ai-menu.tsx            # AI command menu UI
│       ├── ai-node.tsx            # AI suggestion rendering
│       ├── block-draggable.tsx    # Draggable block wrapper
│       ├── table-node.tsx         # Table element component
│       ├── code-block-node.tsx    # Code block component
│       └── ...                    # 100+ other components
├── app/
│   └── api/
│       └── ai/
│           ├── command/           # AI command endpoint (edit, generate, comment)
│           │   ├── route.ts       # Main AI handler
│           │   └── prompts.ts     # AI prompt templates
│           ├── copilot/           # Ghost text completion endpoint
│           │   └── route.ts
│           ├── generate/          # Content generation endpoint
│           └── stylometry/        # Writing style analysis
├── lib/
│   ├── base-url.ts                # Base URL configuration
│   ├── types.ts                   # TypeScript type definitions
│   └── markdown-joiner-transform.ts  # Markdown streaming transformer
```

### Available Features

| Feature | Description | Plugin |
|---------|-------------|--------|
| **Rich Text** | Bold, italic, underline, strikethrough, highlight | BasicMarksKit |
| **Headings** | H1-H6 with auto-numbering options | BasicBlocksKit |
| **Lists** | Bullet, numbered, check lists | ListKit |
| **Tables** | Full table editing with row/column operations | TableKit |
| **Code** | Syntax-highlighted code blocks | CodeBlockKit |
| **Math** | LaTeX equations (inline & block) | MathKit |
| **Media** | Images, videos, audio, files | MediaKit |
| **Links** | Internal/external links with previews | LinkKit |
| **Mentions** | @mentions for users/items | MentionKit |
| **Comments** | Inline comments and discussions | CommentKit |
| **Suggestions** | Track changes with suggestions | SuggestionKit |
| **AI Chat** | Ask AI to edit, generate, or explain | AIKit |
| **Copilot** | Ghost text completions as you type | CopilotKit |
| **Slash Command** | `/` menu for quick insertions | SlashKit |
| **Drag & Drop** | Drag blocks to reorder | DndKit |
| **Export** | PDF, DOCX, Markdown export | DocxKit, MarkdownKit |

---

## Core Architecture

### 1. Plugin System

The editor is built using a **modular plugin architecture**. Each feature (lists, tables, markdown, AI, etc.) is a separate plugin that can be enabled, configured, or disabled independently.

**Editor Kit** (`components/editor/editor-kit.tsx`):
```typescript
export const EditorKit = [
  // AI Features
  ...CopilotKit,    // Ghost text completions
  ...AIKit,         // AI chat & suggestions

  // Content Elements
  ...BasicBlocksKit,  // Paragraphs, headings
  ...TableKit,        // Tables
  ...ToggleKit,       // Collapsible sections
  ...TocKit,          // Table of contents
  ...MediaKit,        // Images, videos, audio
  ...CalloutKit,      // Callout boxes
  ...ColumnKit,       // Multi-column layouts
  ...MathKit,         // LaTeX equations
  ...DateKit,         // Date pickers
  ...LinkKit,         // Hyperlinks
  ...MentionKit,      // @mentions

  // Text Formatting
  ...BasicMarksKit,   // Bold, italic, etc.
  ...FontKit,         // Font size, color

  // Block Styles
  ...ListKit,         // Bullet, numbered lists
  ...AlignKit,        // Text alignment
  ...LineHeightKit,   // Line spacing

  // Collaboration
  ...DiscussionKit,   // Threaded discussions
  ...CommentKit,      // Inline comments
  ...SuggestionKit,   // Track changes

  // Editing Tools
  ...SlashKit,        // Slash command menu
  ...AutoformatKit,   // Markdown-style formatting
  ...CursorOverlayKit,// Multi-cursor support
  ...BlockMenuKit,    // Block drag handles
  ...EmojiKit,        // Emoji picker
  ...ExitBreakKit,    // Quick navigation

  // Parsers
  ...DocxKit,         // Word import/export
  ...MarkdownKit,     // Markdown support

  // UI Components
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,

  // Always keep trailing block for cursor
  TrailingBlockPlugin,
];
```

**How Plugins Work:**

Each plugin can define:
- **`key`**: Unique identifier
- **`options`**: Configuration settings
- **`render`**: Custom React components
- **`shortcuts`**: Keyboard shortcuts
- **`useHooks`**: React hooks for state management
- **`transforms`**: Content transformation functions

Example plugin configuration:
```typescript
export const MyPlugin = createPlugin({
  key: 'my-plugin',
  options: {
    // Configuration here
  },
  render: {
    node: MyComponent,  // Component to render
  },
  shortcuts: {
    trigger: { keys: 'mod+shift+m' }
  }
});
```

### 2. Editor Initialization

**`plate-editor.tsx`** - Main entry point:
```typescript
export function PlateEditor({ md }: { md: Mdprops }) {
  const router = useRouter();
  const { id, title, content } = md;

  // Create editor instance with plugins
  const editor = usePlateEditor({
    plugins: EditorKit,
    // Deserialize Markdown from database to editor state
    value: (editor) => 
      editor.getApi(MarkdownPlugin).markdown.deserialize(content),
  });

  // Serialize editor state back to Markdown
  const newData = editor.api.markdown.serialize();

  async function SaveEditorText() {
    const changes = editor.api.markdown.serialize();
    await fetch(`${baseUrl}/api/papers/update?id=${id}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ update: changes })
    });
    router.push('/dashboard');
  }

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="default" />
        {/* Toolbar buttons, save button, etc. */}
      </EditorContainer>
    </Plate>
  );
}
```

**Key Concepts:**

| Term | Description |
|------|-------------|
| `usePlateEditor` | Hook that creates the editor instance |
| `plugins` | Array of active plugins |
| `value` | Initial content (deserialized from Markdown) |
| `<Plate>` | Context provider making editor available to children |
| `<Editor>` | The actual editable content area (contentEditable) |
| `editor.api` | Access to plugin APIs (serialize, deserialize, etc.) |
| `editor.tf` | Transform functions (insert, delete, update content) |

### 3. State Management

Editor state is managed by **Slate.js** under the hood:

```
User Input → PlateContent (contentEditable div)
           → Slate.js handles the change
           → Plugins transform/format content
           → Editor state updates
           → React re-renders affected components
```

State is stored as a **JSON tree**:
```json
{
  "children": [
    {
      "type": "h1",
      "children": [{ "text": "My Document" }]
    },
    {
      "type": "p",
      "children": [
        { "text": "This is " },
        { "text": "bold", "bold": true },
        { "text": " text." }
      ]
    }
  ]
}
```

---

## How Inline Editing Works

### The ContentEditable Layer

The actual editing happens in the **`PlateContent`** component (wrapped by our `<Editor>`):

```tsx
// components/platejs/editor.tsx
<PlateContent
  className={cn(editorVariants({ variant }))}
  disabled={disabled}
  disableDefaultStyles  // Important: disables browser default styling
/>
```

This renders a `contentEditable` div where users can type and format text.

### Editing Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                          │
│                    (typing, clicking, etc.)                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  PlateContent Component                      │
│              (contentEditable="true" div)                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Slate.js Core                             │
│  - Handles DOM events                                        │
│  - Manages selection/cursor                                  │
│  - Updates editor state (JSON tree)                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Plugin System                             │
│  - Transforms content (autoformat, etc.)                     │
│  - Applies formatting (marks, nodes)                         │
│  - Triggers UI updates (tooltips, menus)                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  React Re-render                             │
│  - Updates affected components                               │
│  - Maintains cursor position                                 │
└─────────────────────────────────────────────────────────────┘
```

### Content Storage

Content is stored as **Markdown** in the database:

```typescript
// Loading content (Markdown → Editor State)
value: (editor) => 
  editor.getApi(MarkdownPlugin).markdown.deserialize(content)

// Saving content (Editor State → Markdown)
const markdown = editor.api.markdown.serialize();
await fetch('/api/papers/update', {
  method: 'POST',
  body: JSON.stringify({ update: markdown })
});
```

**Why Markdown?**
- Human-readable plain text format
- Version control friendly (git diffs)
- Easy to export to other formats (PDF, DOCX, HTML)
- Backwards compatible

### Keyboard Input Handling

When you type, here's what happens:

```typescript
// 1. Key press detected
onKeyDown={(e) => {
  // 2. Check for plugin shortcuts
  if (hotkeys['mod+b'](e)) {
    e.preventDefault();
    editor.tf.toggleMark({ key: 'bold' });  // Toggle bold
  }
  
  // 3. Check for special keys (Enter, Tab, Escape)
  if (e.key === 'Enter') {
    // Create new block
    editor.tf.insertNodes({ type: 'p', children: [{ text: '' }] });
  }
}}

// 4. Content changes
onChange={(value) => {
  // Update React state
  setValue(value);
}}
```

### Block vs Inline Elements

**Block Elements** (create new blocks):
- Paragraphs, headings, lists
- Tables, code blocks
- Images, videos
- Callouts, toggles

```typescript
// Insert a block element
editor.tf.insertNodes({
  type: 'callout',
  children: [{ text: 'This is a callout' }]
});
```

**Inline Elements** (exist within text):
- Bold, italic, underline (marks)
- Links, mentions
- Inline equations, dates

```typescript
// Apply an inline mark
editor.tf.setNodes({ bold: true });

// Insert inline element
editor.tf.insertNodes({
  type: 'mention',
  children: [{ text: '@John' }]
});
```

### Selection Handling

```typescript
// Get current selection
const selection = editor.selection;

// Check if text is selected
const isSelecting = editor.api.isExpanded();

// Get selected content as Markdown
const selectedMd = editor.api.markdown.serialize({
  at: editor.selection
});

// Check if at block start/end
const atStart = editor.api.isAt({ start: true });
const atEnd = editor.api.isAt({ end: true });
```

---

## Key Components

### 1. PlateContent (The Editable Area)

**Location:** `components/platejs/editor.tsx`

```typescript
const editorVariants = cva(
  'group/editor relative w-full cursor-text overflow-x-hidden break-words',
  {
    variants: {
      variant: {
        default: 'size-full px-3 pt-4 pb-10 text-base',
        demo: 'size-full px-16 pt-4 pb-72 text-base',
        ai: 'w-full px-0 text-base md:text-sm',
        comment: 'rounded-none border-none bg-transparent text-sm',
        fullWidth: 'size-full px-16 pt-4 pb-72 text-base sm:px-24',
      }
    }
  }
);

export const Editor = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <PlateContent
      ref={ref}
      className={cn(editorVariants({ variant }), className)}
      disabled={disabled}
      disableDefaultStyles  // Removes browser default styles
    />
  );
});
```

**Customization Points:**
- **Padding:** `px-3 pt-4 pb-10` - Change editor padding
- **Font size:** `text-base` - Change to `text-lg`, `text-sm`, etc.
- **Max width:** Add `max-w-4xl` to constrain width
- **Line height:** Add `leading-relaxed` for more spacing

### 2. EditorContainer

**Location:** `components/platejs/editor.tsx`

```typescript
const editorContainerVariants = cva(
  'relative w-full cursor-text overflow-y-auto caret-primary select-text',
  {
    variants: {
      variant: {
        default: 'h-full',
        demo: 'h-[650px]',
        select: 'rounded-md border border-input',
        comment: 'rounded-md border-[1.5px] border-transparent',
      }
    }
  }
);
```

**Selection Styling:**
```typescript
'[&_.slate-selection-area]:bg-brand/25'  // Selection highlight color
'[&_.slate-selection-area]:border-brand/25'  // Selection border
```

### 3. Node Components

Each content type has its own React component.

#### Paragraph Node
```tsx
// components/platejs/paragraph-node.tsx
export const Paragraph = withHOC(({ children, className }) => (
  <p className={cn('mb-1 min-h-[1.5em]', className)}>
    {children}
  </p>
));
```

#### Heading Node
```tsx
// components/platejs/heading-node.tsx
export const Heading = withHOC(({ element, children, className }) => {
  const Tag = `h${element.level}`;
  return (
    <Tag className={cn(
      'font-bold text-gray-900',
      element.level === 1 ? 'text-4xl mt-8 mb-4' : '',
      element.level === 2 ? 'text-2xl mt-6 mb-3' : '',
      className
    )}>
      {children}
    </Tag>
  );
});
```

#### Code Block Node
```tsx
// components/platejs/code-block-node.tsx
export const CodeBlock = withHOC(({ children, element }) => {
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-md bg-muted px-4 py-3">
        <code>{children}</code>
      </pre>
    </div>
  );
});
```

#### Table Node (Complex Example)
```tsx
// components/platejs/table-node.tsx
export const Table = withHOC(({ element, children }) => {
  return (
    <figure className="overflow-x-auto my-4">
      <table className="w-full border-collapse">
        <tbody>{children}</tbody>
      </table>
    </figure>
  );
});

export const TableRow = ({ children }) => (
  <tr className="border-b">{children}</tr>
);

export const TableCell = ({ element, children }) => {
  const isHeader = element.type === 'th';
  return (
    <td 
      className="border p-2 min-w-[100px]"
      contentEditable={true}  // Editable cell
    >
      {children}
    </td>
  );
};

export const TableCellControl = ({ children }) => (
  <td 
    className="w-2 select-none"
    contentEditable={false}  // Non-editable (for controls)
  >
    {children}
  </td>
);
```

### 4. Toolbar Components

#### Fixed Toolbar
```tsx
// components/platejs/fixed-toolbar.tsx
export function FixedToolbar() {
  return (
    <Toolbar variant="fixed" className="sticky top-0 z-50 border-b">
      <BoldButton />
      <ItalicButton />
      <UnderlineButton />
      <Separator />
      <ListButton />
      <TableButton />
      {/* More buttons */}
    </Toolbar>
  );
}
```

#### Floating Toolbar
```tsx
// components/platejs/floating-toolbar.tsx
export function FloatingToolbar() {
  const editorId = useEditorId();
  
  return (
    <Toolbar
      variant="floating"
      editorId={editorId}
      className="shadow-lg rounded-md"
    >
      <BoldButton />
      <ItalicButton />
      <LinkButton />
      <CommentButton />
    </Toolbar>
  );
}
```

### 5. AI Components

#### AI Menu (Command Palette)
```tsx
// components/platejs/ai-menu.tsx
export function AIMenu() {
  const { api, editor } = useEditorPlugin(AIChatPlugin);
  const mode = usePluginOption(AIChatPlugin, 'mode');
  const [input, setInput] = React.useState('');

  return (
    <Popover open={open}>
      <Command>
        {/* Input field */}
        <CommandPrimitive.Input
          placeholder="Ask AI anything..."
          value={input}
          onValueChange={setInput}
        />
        
        {/* Menu items */}
        <CommandList>
          <CommandGroup>
            <CommandItem value="improveWriting">
              <Wand /> Improve writing
            </CommandItem>
            <CommandItem value="fixSpelling">
              <Check /> Fix spelling & grammar
            </CommandItem>
            {/* More items */}
          </CommandGroup>
        </CommandList>
      </Command>
    </Popover>
  );
}
```

#### AI Loading Bar
```tsx
// components/platejs/ai-menu.tsx
export function AILoadingBar() {
  const status = usePluginOption(AIChatPlugin, 'chat.status');
  const isLoading = status === 'streaming' || status === 'submitted';

  if (isLoading) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <span className="animate-spin">🔄</span>
        <span>Thinking...</span>
        <Button onClick={() => api.aiChat.stop()}>
          <PauseIcon /> Stop
        </Button>
      </div>
    );
  }
}
```

#### Ghost Text (Copilot)
```tsx
// components/platejs/ghost-text.tsx
export function GhostText({ children }) {
  return (
    <span 
      className="text-muted-foreground pointer-events-none"
      contentEditable={false}
    >
      {children}
    </span>
  );
}
```

---

## AI Features & Prompt Customization

This project includes powerful AI-powered editing features. You can customize how the AI behaves by modifying the prompts.

### Overview of AI Features

| Feature | Trigger | Description |
|---------|---------|-------------|
| **Copilot** | Type normally | Ghost text completions as you type |
| **AI Chat** | `Cmd+J` or select text | Chat with AI to edit, generate, explain |
| **AI Menu** | Select text → AI icon | Quick actions (improve, fix, summarize) |

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  CopilotKit  │  │   AIKit      │  │  AI Menu     │       │
│  │  (ghost)     │  │  (chat)      │  │  (actions)   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  API Routes (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  /api/ai/    │  │  /api/ai/    │  │  /api/ai/    │       │
│  │  copilot     │  │  command     │  │  generate    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   AI Gateway (Groq)                          │
│              moonshotai/kimi-k2-instruct-0905                │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Copilot (Ghost Text Completions)

**Location:** `components/editor/plugins/copilot-kit.tsx`

Copilot shows ghost text suggestions as you type, similar to GitHub Copilot.

### Configuration

```typescript
export const CopilotKit = [
  CopilotPlugin.configure(({ api }) => ({
    options: {
      completeOptions: {
        api: '/api/ai/copilot',
        body: {
          // SYSTEM PROMPT - Customize AI behavior here
          system: `You are an advanced AI writing assistant, similar to VSCode Copilot but for general text. Your task is to predict and generate the next part of the text based on the given context.

Rules:
- Continue the text naturally up to the next punctuation mark (., ,, ;, :, ?, or !).
- Maintain style and tone. Don't repeat given text.
- For unclear context, provide the most likely continuation.
- Handle code snippets, lists, or structured text if needed.
- Don't include """ in your response.
- CRITICAL: Always end with a punctuation mark.
- CRITICAL: Avoid starting a new block. Do not use block formatting like >, #, 1., 2., -, etc.
- If no context is provided or you can't generate a continuation, return "0" without explanation.`,
        },
        
        onFinish: (_, completion) => {
          if (completion === '0') return;
          api.copilot.setBlockSuggestion({
            text: stripMarkdown(completion),
          });
        },
      },
      debounceDelay: 500,  // Wait 500ms after typing before requesting completion
      renderGhostText: GhostText,  // Component to render ghost text
      
      // Prompt sent to AI
      getPrompt: ({ editor }) => {
        const contextEntry = editor.api.block({ highest: true });
        if (!contextEntry) return '';
        
        const prompt = serializeMd(editor, {
          value: [contextEntry[0]],
        });
        
        return `Continue the text up to the next punctuation mark:
"""
${prompt}
"""`;
      },
    },
    shortcuts: {
      accept: { keys: 'tab' },           // Accept full suggestion
      acceptNextWord: { keys: 'mod+right' }, // Accept next word
      reject: { keys: 'escape' },         // Reject suggestion
      triggerSuggestion: { keys: 'ctrl+space' }, // Manually trigger
    },
  })),
];
```

### Customizing the System Prompt

**To change how Copilot behaves, edit the `system` string:**

**Example: Make it more creative**
```typescript
system: `You are a creative writing assistant. Your task is to provide imaginative and engaging text continuations.

Rules:
- Use vivid language and metaphors
- Vary sentence structure for rhythm
- Match the genre/tone of the context
- Always complete thoughts elegantly
- Return "0" if you can't continue`
```

**Example: Make it more technical**
```typescript
system: `You are a technical documentation assistant. Provide precise, accurate continuations for technical content.

Rules:
- Use proper technical terminology
- Maintain consistency with existing documentation
- Prefer clarity over creativity
- Include code examples when relevant
- Return "0" if uncertain`
```

### Adjusting Sensitivity

```typescript
// Wait longer before showing suggestions (less aggressive)
debounceDelay: 1000,  // 1 second

// Wait shorter (more aggressive)
debounceDelay: 200,   // 200ms

// Disable entirely
debounceDelay: 0,     // Not recommended
```

---

## 2. AI Chat & Commands

**Location:** `app/api/ai/command/route.ts` and `app/api/ai/command/prompts.ts`

The AI Chat feature allows users to:
- **Generate** new content from scratch
- **Edit** existing content
- **Comment** on content with feedback

### AI Command Flow

```
User selects text → Presses Cmd+J → Types request → API processes → Streams response
```

### Prompt Structure

All prompts use a structured format:

```typescript
buildStructuredPrompt({
  task: 'What the AI should do',
  rules: 'Rules and constraints',
  backgroundData: 'Context/content to work with',
  examples: ['Example input → Example output'],
  history: 'Previous conversation history',
  outputFormatting: 'markdown | plain | json',
  prefilledResponse: 'Text to pre-fill (for edit-in-place)',
});
```

---

## 3. Customizing AI Prompts

### Prompt File Structure

**Location:** `app/api/ai/command/prompts.ts`

```typescript
import type { ChatMessage } from '@/components/editor/use-chat';
import type { SlateEditor } from 'platejs';
import { getMarkdown } from '@platejs/ai';
import dedent from 'dedent';

export function getChooseToolPrompt({ messages }: { messages: ChatMessage[] }) {
  return buildStructuredPrompt({
    // ... prompt configuration
  });
}

export function getGeneratePrompt(editor, { messages }) {
  return buildStructuredPrompt({
    // ... prompt configuration
  });
}

export function getEditPrompt(editor, { isSelecting, messages }) {
  return buildStructuredPrompt({
    // ... prompt configuration
  });
}

export function getCommentPrompt(editor, { messages }) {
  return buildStructuredPrompt({
    // ... prompt configuration
  });
}
```

---

### A. Tool Selection Prompt

**Purpose:** Determines whether to generate, edit, or comment based on user input.

**Location:** `prompts.ts` → `getChooseToolPrompt()`

```typescript
export function getChooseToolPrompt({ messages }: { messages: ChatMessage[] }) {
  return buildStructuredPrompt({
    examples: [
      // GENERATE examples
      'User: "Write a paragraph about AI ethics" → Good: "generate" | Bad: "edit"',
      'User: "Create a short poem about spring" → Good: "generate" | Bad: "comment"',

      // EDIT examples
      'User: "Please fix grammar." → Good: "edit" | Bad: "generate"',
      'User: "Translate this paragraph into French" → Good: "edit" | Bad: "generate"',

      // COMMENT examples
      'User: "Can you review this text and give me feedback?" → Good: "comment"',
      'User: "Add inline comments to explain this code" → Good: "comment"',
    ],
    history: formatTextFromMessages(messages),
    rules: dedent`
      - Default is "generate". Any open question or creation request → "generate".
      - Only return "edit" if user provides text AND asks to change it.
      - Only return "comment" if user explicitly asks for feedback or review.
      - Return only one enum value with no explanation.
    `,
    task: `You are a strict classifier. Classify the user's last request as "generate", "edit", or "comment".`,
  });
}
```

**To Customize:**
- Add more examples for your use cases
- Adjust the rules to match your workflow
- Add new tool types if needed

---

### B. Generate Prompt

**Purpose:** Generates new content based on user instructions.

**Location:** `prompts.ts` → `getGeneratePrompt()`

```typescript
export function getGeneratePrompt(
  editor: SlateEditor,
  { messages }: { messages: ChatMessage[] }
) {
  !isMultiBlocks(editor) && addSelection(editor);
  const selectingMarkdown = getMarkdownWithSelection(editor);

  return buildStructuredPrompt({
    backgroundData: selectingMarkdown,
    
    examples: [
      // Summarize
      'User: Summarize the following text.\nBackground: AI has transformed healthcare...\nOutput: AI improves healthcare efficiency.',

      // Generate title
      'User: Generate a catchy title.\nBackground: This section explains ML training...\nOutput: Training Machines to Recognize Patterns',

      // Generate table
      'User: Create a comparison table.\nBackground: Tool A is free, Tool B is paid...\nOutput: | Tool | Price |\n|------|-------|\n| A | Free |',
      
      // Generate questions
      'User: Generate 3 reflection questions.\nBackground: Article discusses creativity...\nOutput: 1. How can creativity be encouraged?',
    ],
    
    history: formatTextFromMessages(messages),
    
    rules: dedent`
      - <Selection> is the text highlighted by the user.
      - backgroundData represents the user's current Markdown context.
      - CRITICAL: DO NOT remove custom MDX tags (<u>, <callout>, <kbd>, etc.).
      - CRITICAL: Do NOT wrap output in code fences.
      - Preserve indentation and line breaks.
    `,
    
    task: dedent`
      You are an advanced content generation assistant.
      Generate content based on the user's instructions.
      Do not ask for additional content.
    `,
  });
}
```

**To Customize Generate Behavior:**

1. **Change tone/style:**
```typescript
rules: dedent`
  - Write in a professional, academic tone
  - Use clear, concise language
  - Avoid jargon unless necessary
  - Cite sources when making claims
`
```

2. **Add domain-specific knowledge:**
```typescript
backgroundData: `
Context: This is a medical research document.
Terminology: Use standard medical terminology.
Audience: Healthcare professionals.
${selectingMarkdown}
`
```

3. **Change output format:**
```typescript
outputFormatting: 'markdown',  // or 'json', 'plain'
```

---

### C. Edit Prompt

**Purpose:** Edits selected text based on user instructions.

**Location:** `prompts.ts` → `getEditPrompt()`

```typescript
export function getEditPrompt(
  editor: SlateEditor,
  { isSelecting, messages }: { isSelecting: boolean; messages: ChatMessage[] }
) {
  if (!isSelecting)
    throw new Error('Edit tool is only available when selecting');
    
  if (isMultiBlocks(editor)) {
    // Multi-block editing
    const selectingMarkdown = getMarkdownWithSelection(editor);
    return buildStructuredPrompt({
      backgroundData: selectingMarkdown,
      examples: [
        'User: Fix grammar.\nBackground: This guide explain how...\nOutput: This guide explains how...',
        'User: Make more formal.\nBackground: Hey, here\'s how...\nOutput: This section describes...',
      ],
      rules: dedent`
        - Maintain overall structure and formatting.
        - Provide only the replacement content.
        - Do not add additional blocks unless requested.
      `,
      task: `Modify the background data according to the user's instruction.`,
    });
  }

  // Single-block editing with selection
  addSelection(editor);
  const selectingMarkdown = getMarkdownWithSelection(editor);
  const endIndex = selectingMarkdown.indexOf('<Selection>');
  const prefilledResponse = selectingMarkdown.slice(0, endIndex);

  return buildStructuredPrompt({
    backgroundData: selectingMarkdown,
    examples: [
      'User: Improve word choice.\nBackground: This is a <Selection>nice</Selection> person.\nOutput: great',
      'User: Fix grammar.\nBackground: He <Selection>go</Selection> to school.\nOutput: goes',
      'User: Make more polite.\nBackground: <Selection>Give me</Selection> the report.\nOutput: Please provide',
    ],
    prefilledResponse,  // Text before selection (for streaming)
    rules: dedent`
      - <Selection> contains the editable text segment.
      - Your response replaces only the <Selection> content.
      - Ensure the replacement reads naturally.
      - Do not include the <Selection> tags in output.
    `,
    task: dedent`
      You must only modify the text inside <Selection>.
      Your output is directly concatenated with prefilledResponse.
    `,
  });
}
```

**To Customize Edit Behavior:**

1. **Change editing style:**
```typescript
rules: dedent`
  - Make minimal changes unless explicitly requested.
  - Preserve the author's voice and style.
  - Only fix actual errors, don't "improve" unnecessarily.
  - Keep technical terminology unchanged.
`
```

2. **Add style guidelines:**
```typescript
rules: dedent`
  - Follow APA style guidelines.
  - Use American English spelling.
  - Prefer active voice over passive.
  - Keep sentences under 25 words.
`
```

---

### D. Comment Prompt

**Purpose:** Generates feedback/comments on selected content.

**Location:** `prompts.ts` → `getCommentPrompt()`

```typescript
export function getCommentPrompt(
  editor: SlateEditor,
  { messages }: { messages: ChatMessage[] }
) {
  const selectingMarkdown = getMarkdown(editor, { type: 'blockWithBlockId' });

  return buildStructuredPrompt({
    backgroundData: selectingMarkdown,
    
    examples: [
      // Single block comment
      `User: Review this paragraph.
      Background: <block id="1">AI systems are transforming workplaces...</block>
      Output: [{"blockId": "1", "content": "AI systems...", "comments": "Clarify what types of systems."}]`,

      // Multiple comments
      `User: Add comments for this section.
      Background: <block id="2">AI models can automate support. However, they may misinterpret...</block>
      Output: [
        {"blockId": "2", "content": "AI models can automate support.", "comments": "Mention limitations."},
        {"blockId": "2", "content": "they may misinterpret...", "comments": "Expand on bias detection."}
      ]`,

      // With selection
      `User: Give feedback on highlighted phrase.
      Background: <block id="5">AI can <Selection>replace human creativity</Selection> in design.</block>
      Output: [{"blockId": "5", "content": "replace human creativity", "comments": "Overstated—suggest 'assist'."}]`,
    ],
    
    rules: dedent`
      - Use the id of the FIRST block for multi-block comments.
      - Content field must be the original content (no block tags).
      - Content can span multiple blocks (separate with \\n\\n).
      - At least one comment must be provided.
      - If <Selection> exists, comments should focus on it.
    `,
    
    task: dedent`
      You are a document review assistant.
      Read the content and provide thoughtful comments.
      Generate JSON objects with blockId, content, and comments.
    `,
  });
}
```

**To Customize Comment Behavior:**

1. **Change feedback style:**
```typescript
rules: dedent`
  - Be constructive and specific.
  - Point out both strengths and areas for improvement.
  - Suggest concrete alternatives.
  - Keep comments concise (under 50 words each).
`
```

2. **Add domain-specific review:**
```typescript
task: dedent`
  You are a technical reviewer for software documentation.
  Look for:
  - Accuracy of technical claims
  - Completeness of explanations
  - Clarity for the target audience (developers)
  - Consistency with existing documentation
`
```

---

## 4. AI Menu Actions

**Location:** `components/platejs/ai-menu.tsx`

The AI menu provides quick actions when text is selected.

### Available Actions

```typescript
const aiChatItems = {
  improveWriting: {
    icon: <Wand />,
    label: 'Improve writing',
    onSelect: ({ editor, input }) => {
      editor.getApi(AIChatPlugin).aiChat.submit(input, {
        prompt: 'Improve the writing',
        toolName: 'edit',
      });
    },
  },
  fixSpelling: {
    icon: <Check />,
    label: 'Fix spelling & grammar',
    onSelect: ({ editor, input }) => {
      editor.getApi(AIChatPlugin).aiChat.submit(input, {
        prompt: 'Fix spelling and grammar',
        toolName: 'edit',
      });
    },
  },
  makeLonger: {
    icon: <ListPlus />,
    label: 'Make longer',
    onSelect: ({ editor, input }) => {
      editor.getApi(AIChatPlugin).aiChat.submit(input, {
        prompt: 'Make longer',
        toolName: 'edit',
      });
    },
  },
  makeShorter: {
    icon: <ListMinus />,
    label: 'Make shorter',
    onSelect: ({ editor, input }) => {
      editor.getApi(AIChatPlugin).aiChat.submit(input, {
        prompt: 'Make shorter',
        toolName: 'edit',
      });
    },
  },
  simplifyLanguage: {
    icon: <Feather />,
    label: 'Simplify language',
    onSelect: ({ editor, input }) => {
      editor.getApi(AIChatPlugin).aiChat.submit(input, {
        prompt: 'Simplify the language',
        toolName: 'edit',
      });
    },
  },
  explain: {
    icon: <BadgeHelp />,
    label: 'Explain',
    onSelect: ({ editor, input }) => {
      editor.getApi(AIChatPlugin).aiChat.submit(input, {
        prompt: {
          default: 'Explain {editor}',
          selecting: 'Explain',
        },
        toolName: 'generate',
      });
    },
  },
  summarize: {
    icon: <Album />,
    label: 'Add a summary',
    onSelect: ({ editor, input }) => {
      editor.getApi(AIChatPlugin).aiChat.submit(input, {
        mode: 'insert',
        prompt: {
          default: 'Summarize {editor}',
          selecting: 'Summarize',
        },
        toolName: 'generate',
      });
    },
  },
  // ... more actions
};
```

### Adding Custom Actions

```typescript
// 1. Add new action to aiChatItems
translateToSpanish: {
  icon: <Globe />,
  label: 'Translate to Spanish',
  onSelect: ({ editor, input }) => {
    editor.getApi(AIChatPlugin).aiChat.submit(input, {
      prompt: 'Translate the following text to Spanish. Maintain the original meaning and tone.',
      toolName: 'edit',
    });
  },
},

// 2. Add to menu groups
const menuStateItems = {
  selectionCommand: [
    {
      items: [
        aiChatItems.improveWriting,
        aiChatItems.translateToSpanish,  // Add here
        // ...
      ],
    },
  ],
};
```

---

## 5. API Configuration

### Model Selection

**Location:** `app/api/ai/command/route.ts`

```typescript
const model = groq('moonshotai/kimi-k2-instruct-0905');

// Change model:
const model = groq('openai/gpt-4o');
const model = groq('google/gemini-2.0-flash');
const model = groq('anthropic/claude-3.5-sonnet');
```

### Temperature & Tokens

**Location:** `app/api/ai/copilot/route.ts`

```typescript
const result = await generateText({
  model: groq('moonshotai/kimi-k2-instruct-0905'),
  prompt: prompt,
  system: system,
  temperature: 0.7,      // Higher = more creative (0.0-2.0)
  maxOutputTokens: 50,   // Max tokens for copilot
});
```

**Temperature Guide:**
- `0.0-0.3`: Very focused, deterministic
- `0.4-0.7`: Balanced (recommended)
- `0.8-1.0`: More creative, varied outputs
- `1.0-2.0`: Highly creative, may be incoherent

### API Keys

**Location:** `.env.local`

```env
AI_GATEWAY_API_KEY=your_api_key_here
```

---

## 6. Custom AI Features

### Example: Add "Change Tone" Feature

**Step 1:** Add to AI menu (`components/platejs/ai-menu.tsx`):

```typescript
changeTone: {
  icon: <Sliders />,
  label: 'Change tone',
  value: 'changeTone',
  items: [
    { label: 'Formal', value: 'formal' },
    { label: 'Casual', value: 'casual' },
    { label: 'Professional', value: 'professional' },
    { label: 'Friendly', value: 'friendly' },
  ],
  onSelect: ({ editor, input, value }) => {
    const tonePrompts = {
      formal: 'Rewrite this in a formal, academic tone.',
      casual: 'Rewrite this in a casual, conversational tone.',
      professional: 'Rewrite this in a professional business tone.',
      friendly: 'Rewrite this in a warm, friendly tone.',
    };
    
    editor.getApi(AIChatPlugin).aiChat.submit(input, {
      prompt: tonePrompts[value as keyof typeof tonePrompts],
      toolName: 'edit',
    });
  },
},
```

### Example: Add Custom Prompt Template

**Step 1:** Create new prompt function (`app/api/ai/command/prompts.ts`):

```typescript
export function getTranslatePrompt(
  editor: SlateEditor,
  { targetLanguage, messages }: { targetLanguage: string; messages: ChatMessage[] }
) {
  const selectingMarkdown = getMarkdownWithSelection(editor);

  return buildStructuredPrompt({
    backgroundData: selectingMarkdown,
    examples: [
      `User: Translate to Spanish.\nBackground: Hello, how are you?\nOutput: Hola, ¿cómo estás?`,
      `User: Translate to French.\nBackground: Good morning!\nOutput: Bonjour!`,
    ],
    history: formatTextFromMessages(messages),
    rules: dedent`
      - Translate the entire backgroundData.
      - Maintain the original formatting.
      - Preserve any MDX tags.
      - Do not add explanations.
    `,
    task: `Translate the following text to ${targetLanguage}. Maintain the original meaning and tone.`,
  });
}
```

**Step 2:** Add API handler (`app/api/ai/translate/route.ts`):

```typescript
export async function POST(req: NextRequest) {
  const { ctx, targetLanguage } = await req.json();
  
  const stream = streamText({
    model: groq('moonshotai/kimi-k2-instruct-0905'),
    prompt: getTranslatePrompt(editor, { targetLanguage, messages }),
  });
  
  return StreamingTextResponse(stream);
}
```

---

## Customization Guide

### 1. Changing Editor Appearance

**File:** `components/platejs/editor.tsx`

#### Change Editor Size and Layout

```typescript
const editorVariants = cva(
  'group/editor',
  {
    variants: {
      variant: {
        // Change from:
        default: 'size-full px-3 pt-4 pb-10 text-base',
        
        // To (wider padding, larger text):
        default: 'min-h-[600px] px-8 py-8 text-lg leading-relaxed',
        
        // Or constrained width:
        default: 'max-w-4xl mx-auto px-4 py-8 text-base',
      }
    }
  }
);
```

#### Change Selection Color

```typescript
const editorContainerVariants = cva(
  // Current:
  '[&_.slate-selection-area]:bg-brand/25',
  
  // Change to blue:
  '[&_.slate-selection-area]:bg-blue-500/20',
  
  // Or green:
  '[&_.slate-selection-area]:bg-green-500/20',
);
```

#### Change Cursor Color

```typescript
// Current:
'caret-primary'

// Change to:
'caret-blue-500'
'caret-red-500'
'caret-green-500'
```

#### Add Custom CSS Classes

```typescript
<PlateContent
  className={cn(
    editorVariants({ variant }),
    'my-custom-class',  // Add your own classes
    className
  )}
/>
```

### 2. Adding Custom Plugins

**Step 1:** Create plugin configuration

`components/editor/plugins/my-custom-plugin.tsx`:
```typescript
import { createPlugin } from 'platejs';

export const MyCustomPlugin = createPlugin({
  key: 'my-custom-plugin',
  options: {
    // Configuration options
    myOption: 'default value',
  },
  render: {
    node: MyCustomComponent,
  },
  shortcuts: {
    trigger: { keys: 'mod+shift+m' }
  }
});

export const MyCustomKit = [
  MyCustomPlugin.configure({ 
    options: { myOption: 'custom value' }
  })
];
```

**Step 2:** Add to EditorKit

`components/editor/editor-kit.tsx`:
```typescript
import { MyCustomKit } from './plugins/my-custom-plugin';

export const EditorKit = [
  ...EditorKit,
  ...MyCustomKit,  // Add here
];
```

### 3. Customizing Node Rendering

#### Example: Change How Headings Look

`components/platejs/heading-node.tsx`:
```tsx
export const Heading = withHOC(({ element, children, className }) => {
  const Tag = `h${element.level}`;
  
  return (
    <Tag className={cn(
      'font-bold',
      // Change colors:
      'text-gray-900 dark:text-gray-100',
      
      // Add bottom border:
      'border-b border-gray-200',
      
      // Change spacing:
      'mt-8 mb-4',
      
      // Add hover effect:
      'hover:text-blue-600 transition-colors',
      
      className
    )}>
      {children}
    </Tag>
  );
});
```

#### Example: Custom Callout Styles

`components/platejs/callout-node.tsx`:
```tsx
export const Callout = ({ element, children, className }) => {
  const variants = {
    info: 'bg-blue-50 border-blue-500',
    warning: 'bg-yellow-50 border-yellow-500',
    error: 'bg-red-50 border-red-500',
    success: 'bg-green-50 border-green-500',
  };
  
  return (
    <div className={cn(
      'p-4 rounded-md border-l-4',
      variants[element.variant as keyof typeof variants] || variants.info,
      className
    )}>
      {children}
    </div>
  );
});
```

### 4. Changing Keyboard Shortcuts

**File:** `components/editor/plugins/*/index.tsx`

```typescript
export const MyPlugin = createPlugin({
  key: 'my-plugin',
  shortcuts: {
    // Change shortcut:
    trigger: { 
      keys: 'mod+shift+m',  // Was: 'mod+m'
      preventDefault: true,
    },
    
    // Add multiple shortcuts:
    alternate: {
      keys: 'ctrl+space',
    },
  },
});
```

### 5. Custom Toolbar Buttons

**Example:** Create a custom button

`components/platejs/my-custom-button.tsx`:
```tsx
import { useEditorRef } from 'platejs/react';
import { Button } from './button';
import { Icons } from 'lucide-react';

export function MyCustomButton() {
  const editor = useEditorRef();
  
  const handleClick = () => {
    // Custom action
    editor.insertText('Custom text');
    
    // Or insert element:
    editor.insertNodes({
      type: 'paragraph',
      children: [{ text: '' }]
    });
  };
  
  return (
    <Button 
      onClick={handleClick}
      variant="ghost"
      size="sm"
    >
      <Icons.MyIcon className="h-4 w-4" />
      <span>Custom Action</span>
    </Button>
  );
}
```

Then add to toolbar in `fixed-toolbar-buttons.tsx`:
```typescript
import { MyCustomButton } from './my-custom-button';

export function FixedToolbarButtons() {
  return (
    <>
      <BoldButton />
      <MyCustomButton />  {/* Add here */}
    </>
  );
}
```

### 6. Changing Markdown Behavior

**File:** `components/editor/plugins/markdown-kit.tsx`

```typescript
import { MarkdownPlugin, remarkMdx, remarkMention } from '@platejs/markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const MarkdownKit = [
  MarkdownPlugin.configure({
    options: {
      plainMarks: [KEYS.suggestion, KEYS.comment],
      remarkPlugins: [
        remarkMath, 
        remarkGfm, 
        remarkMdx, 
        remarkMention,
        // Add custom remark plugins:
        // myCustomRemarkPlugin,
      ],
      // Custom serialization options:
      serializeOptions: {
        // Configure how content is serialized
      },
    },
  }),
];
```

### 7. Content Validation

Add validation before saving:

```typescript
async function SaveEditorText() {
  const changes = editor.api.markdown.serialize();
  
  // Validate content
  if (changes.length < 10) {
    toast.error('Content too short');
    return;
  }
  
  // Check for empty blocks
  const hasEmptyBlocks = editor.api.blocks().some(
    block => block.children.length === 0
  );
  
  if (hasEmptyBlocks) {
    toast.warning('Document has empty sections');
  }
  
  await fetch('/api/papers/update', {
    method: 'POST',
    body: JSON.stringify({ update: changes })
  });
}
```

### 8. Custom Placeholder Text

```typescript
<PlateContent
  placeholder="Start writing your document... Use '/' for commands"
  // ... other props
/>
```

Or customize per node type:
```typescript
export const Paragraph = ({ children }) => (
  <p data-placeholder="Type '/' for commands...">
    {children}
  </p>
);
```

#### Change Editor Size
```typescript
variant: {
  default: 'size-full px-3 pt-4 pb-10 text-base',
  // Change to:
  default: 'min-h-[500px] px-8 py-6 text-lg',
}
```

#### Change Selection Color
```typescript
const editorContainerVariants = cva(
  // Change selection color:
  '[&_.slate-selection-area]:bg-brand/15',
  // To:
  '[&_.slate-selection-area]:bg-blue-500/20',
);
```

#### Change Cursor Color
```typescript
'caret-primary'  // Change to 'caret-blue-500' or any color
```

### 2. Adding Custom Plugins

**Step 1:** Create plugin configuration

`components/editor/plugins/my-custom-plugin.tsx`:
```typescript
import { createPlugin } from 'platejs';

export const MyCustomPlugin = createPlugin({
  key: 'my-custom-plugin',
  // Plugin options here
});

export const MyCustomKit = [
  MyCustomPlugin.configure({ /* options */ })
];
```

**Step 2:** Add to EditorKit

`components/editor/editor-kit.tsx`:
```typescript
import { MyCustomKit } from './plugins/my-custom-plugin';

export const EditorKit = [
  ...EditorKit,
  ...MyCustomKit,  // Add here
];
```

### 3. Customizing Node Rendering

**Example:** Change how headings look

`components/platejs/heading-node.tsx`:
```tsx
export const Heading = withHOC(({ element, children, className }) => {
  const Tag = `h${element.level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={cn(
      'font-bold text-gray-900',  // Add your styles
      'my-4',
      className
    )}>
      {children}
    </Tag>
  );
});
```

### 4. Changing Keyboard Shortcuts

**File:** `components/editor/transforms.ts`

```typescript
export const insertInlineElement = (editor: PlateEditor, type: string) => {
  // Custom keyboard shortcut logic
  if (type === 'inlineEquation') {
    insertInlineEquation(editor, '', { select: true });
  }
};
```

### 5. Custom Toolbar Buttons

**Example:** Create a custom button

`components/platejs/my-custom-button.tsx`:
```tsx
import { useEditorRef } from 'platejs/react';
import { Button } from './button';

export function MyCustomButton() {
  const editor = useEditorRef();
  
  const handleClick = () => {
    // Custom action
    editor.insertText('Custom text');
  };
  
  return (
    <Button onClick={handleClick}>
      Custom Action
    </Button>
  );
}
```

Then add to toolbar in `fixed-toolbar-buttons.tsx`.

### 6. Changing Markdown Behavior

**File:** `components/editor/plugins/markdown-kit.tsx`

```typescript
export const MarkdownKit = [
  MarkdownPlugin.configure({
    options: {
      plainMarks: [KEYS.suggestion, KEYS.comment],
      remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention],
      // Add custom remark plugins:
      // myCustomRemarkPlugin,
    },
  }),
];
```

### 7. Content Validation

Add validation before saving:

```typescript
async function SaveEditorText() {
  const changes = editor.api.markdown.serialize();
  
  // Validate content
  if (changes.length < 10) {
    toast.error('Content too short');
    return;
  }
  
  await fetch('/api/papers/update', {
    method: 'POST',
    body: JSON.stringify({ update: changes })
  });
}
```

---

## Common Use Cases

### Use Case 1: Read-Only Mode

```typescript
// Disable editing
<Editor variant="default" disabled={true} />

// Or check in component
const readOnly = useEditorReadOnly();
```

### Use Case 2: Auto-Save

```typescript
import { useEffect } from 'react';
import { useEditorRef } from 'platejs/react';

function AutoSave({ documentId }: { documentId: string }) {
  const editor = useEditorRef();
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      const content = editor.api.markdown.serialize();
      
      await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
    }, 1000); // Save after 1 second of inactivity
    
    return () => clearTimeout(timer);
  }, [editorValue, documentId]);
  
  return null;
}
```

### Use Case 3: Character/Word Count

```typescript
function CharacterCount() {
  const editor = useEditorRef();
  const content = editor.api.markdown.serialize();
  const count = content.length;
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  
  return (
    <div className="text-sm text-muted-foreground">
      {count} characters · {wordCount} words
    </div>
  );
}
```

### Use Case 4: Export to Different Formats

```typescript
// Export to PDF
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDoc } from './doc';

<PDFDownloadLink
  document={<MyDoc title={title} content={content} />}
  fileName={`${title}.pdf`}
>
  Download PDF
</PDFDownloadLink>

// Export to HTML
const html = editor.api.html.serialize();

// Export to DOCX
const docx = await editor.api.docx.serialize();
```

### Use Case 5: Word Limit Enforcement

```typescript
function WordLimitChecker({ limit }: { limit: number }) {
  const editor = useEditorRef();
  const content = editor.api.markdown.serialize();
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  
  const isOverLimit = wordCount > limit;
  const remaining = limit - wordCount;
  
  return (
    <div className={isOverLimit ? 'text-red-600' : 'text-green-600'}>
      {remaining > 0 ? `${remaining} words remaining` : `${Math.abs(remaining)} words over limit`}
    </div>
  );
}
```

---

## API Reference

### Important Hooks

```typescript
import { 
  useEditorRef,        // Get editor reference
  useEditorReadOnly,   // Check if editor is read-only
  useEditorSelector,   // Select editor state
  useEditorMounted,    // Check if editor is mounted
  usePlateEditor,      // Create editor instance
  usePlateState,       // Get plate state
  usePluginOption,     // Get plugin options
  useEditorPlugin,     // Get plugin API and transforms
  useHotkeys,          // Register keyboard shortcuts
} from 'platejs/react';
```

### Important APIs

```typescript
// Get editor reference
const editor = useEditorRef();

// Serialize to markdown
const markdown = editor.api.markdown.serialize();

// Deserialize from markdown
const nodes = editor.api.markdown.deserialize(markdownString);

// Insert text at cursor
editor.insertText('Hello');

// Insert element at cursor
editor.insertNodes({ 
  type: 'paragraph', 
  children: [{ text: '' }] 
});

// Get current block
const [block, path] = editor.api.block();

// Get all blocks
const blocks = editor.api.blocks();

// Get selection
const selection = editor.selection;

// Check if text is selected
const isSelecting = editor.api.isExpanded();

// Check if at start/end of block
const atStart = editor.api.isAt({ start: true });
const atEnd = editor.api.isAt({ end: true });

// Toggle mark (bold, italic, etc.)
editor.tf.toggleMark({ key: 'bold' });

// Set nodes
editor.tf.setNodes({ bold: true });

// Transform operations
editor.tf.withoutSaving(() => {
  // Changes here won't be saved to history
});

editor.tf.withMerging(() => {
  // Changes here will be merged into single undo step
});
```

### Plugin APIs

```typescript
// Get plugin API
const { api, tf, editor } = useEditorPlugin(AIChatPlugin);

// Get plugin option
const mode = usePluginOption(AIChatPlugin, 'mode');

// Set plugin option
editor.setOption(AIChatPlugin, 'mode', 'insert');
```

### Common File Locations

| Purpose | File |
|---------|------|
| Editor entry point | `components/editor/plate-editor.tsx` |
| Plugin registry | `components/editor/editor-kit.tsx` |
| Editor styles | `components/platejs/editor.tsx` |
| Node components | `components/platejs/*-node.tsx` |
| Toolbar buttons | `components/platejs/*-button.tsx` |
| AI prompts | `app/api/ai/command/prompts.ts` |
| API routes | `app/api/ai/*/route.ts` |

---

## Troubleshooting

### Issue: Editor Not Rendering

**Check:**
1. EditorKit is properly imported in `plate-editor.tsx`
2. `<Plate editor={editor}>` wraps all editor components
3. No TypeScript errors in plugin configuration

```typescript
// Debug
console.log('Editor:', editor);
console.log('Plugins:', editor.plugins);
```

### Issue: Content Not Saving

**Check:**
1. `editor.api.markdown.serialize()` returns content
2. API endpoint is correct
3. Content-Type header is `application/json`

```typescript
const content = editor.api.markdown.serialize();
console.log('Serialized content:', content);
```

### Issue: Styling Not Applying

**Check:**
1. `disableDefaultStyles` prop on PlateContent
2. Tailwind classes are properly merged with `cn()`
3. CSS specificity isn't overriding your styles

### Issue: Plugin Not Working

**Check:**
1. Plugin is added to EditorKit array
2. Plugin is properly configured with `.configure()`
3. No conflicts with other plugins

### Issue: Keyboard Shortcuts Not Working

**Check:**
1. Editor has focus
2. No other shortcuts are conflicting
3. Plugin handling the shortcut is active

### Issue: AI Features Not Working

**Check:**
1. API key is set in `.env.local`
2. API route is returning valid response
3. Model name is correct

```typescript
// Debug AI request
const response = await fetch('/api/ai/command', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* ... */ })
});

if (!response.ok) {
  console.error('AI API error:', await response.text());
}
```

### Issue: Copilot Not Showing Suggestions

**Check:**
1. CopilotKit is in EditorKit
2. Debounce delay is not too long
3. API route `/api/ai/copilot` is working

---

## Quick Reference Card

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+B` | Toggle bold |
| `Cmd+I` | Toggle italic |
| `Cmd+U` | Toggle underline |
| `Cmd+K` | Insert link |
| `Cmd+J` | Open AI menu |
| `Cmd+/` | Open slash command |
| `Tab` | Accept Copilot suggestion |
| `Escape` | Reject Copilot suggestion |
| `Ctrl+Space` | Trigger Copilot manually |

### Editor Variants

```typescript
<Editor variant="default" />   {/* Standard editor */}
<Editor variant="demo" />      {/* Demo with more padding */}
<Editor variant="ai" />        {/* AI chat input */}
<Editor variant="comment" />   {/* Comment input */}
<Editor variant="fullWidth" /> {/* Full width */}
```

---

## Resources

- [Plate.js Documentation](https://platejs.org/)
- [Plate.js Components](https://platejs.org/docs/components)
- [Slate.js Documentation](https://docs.slatejs.org/)
- [AI SDK Documentation](https://sdk.vercel.ai/)

---

**Last Updated:** March 27, 2026  
**Plate.js Version:** 51.1.3  
**Next.js Version:** 16.0.10  
**React Version:** 19.2.3
