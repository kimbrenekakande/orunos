# Orunos Editor Architecture

## Overview

The Orunos editor is a sophisticated AI-powered rich text editor built on **Plate.js v51**, which itself is built on Slate.js. It provides a comprehensive document creation platform with real-time AI assistance, collaboration features, and extensive content formatting capabilities.

## Core Architecture

### Framework Foundation
- **Plate.js v51**: Plugin-based rich text editor framework
- **Slate.js**: Core editor engine providing immutable data structures
- **React 19**: UI framework with concurrent features
- **Next.js 16**: Full-stack framework for API routes and SSR
- **TypeScript**: Type safety throughout the application

### Plugin-Based Architecture
The editor follows a modular plugin system where features are organized into kits:

```typescript
// apps/web/components/editor/editor-kit.tsx:40
export const EditorKit = [
  ...CopilotKit,
  ...AIKit,
  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  // ... more plugins
];
```

## Content Flow System

### 1. Initialization Flow
```
Markdown String → Plate Editor (Slate.js) → Rich Text UI
```

**Process:**
1. Markdown content fetched from database
2. Deserialized using MarkdownPlugin: `editor.getApi(MarkdownPlugin).markdown.deserialize(content)`
3. Slate.js creates immutable document tree
4. UI renders based on plugin configuration

### 2. Real-time Editing
```
User Input → Slate Operations → Plugin Handlers → State Updates → UI Re-render
```

### 3. Persistence Flow
```
Editor State → Markdown Serialization → API POST → Database Storage
```

**Implementation:**
```typescript
// apps/web/components/editor/plate-editor.tsx:32
const changes = editor.api.markdown.serialize()
await fetch(`${baseUrl}/api/papers/update?id=${id}`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ 'update': changes })
});
```

## AI Integration Architecture

### AI Command Processing Pipeline

The AI system operates through a sophisticated multi-stage pipeline:

#### 1. **AI Command Router** (`/api/ai/command/route.ts`)
**Main processing hub** that orchestrates all AI interactions:

```typescript
export async function POST(req: NextRequest) {
  const { apiKey: key, ctx, messages: messagesRaw = [], model } = await req.json();
  const { children, selection, toolName: toolNameParam } = ctx;
  
  // Create Slate editor instance with plugin context
  const editor = createSlateEditor({
    plugins: BaseEditorKit,
    selection,
    value: children,
  });
  
  // Determine appropriate AI tool
  const isSelecting = editor.api.isExpanded();
  const { object: AIToolName } = await generateObject({
    enum: isSelecting ? ['generate', 'edit', 'comment'] : ['generate', 'comment'],
    model: gatewayProvider(model || 'google/gemini-2.5-flash'),
    output: 'enum',
    prompt: getChooseToolPrompt(messagesRaw),
  });
}
```

#### 2. **Tool Selection System**
AI automatically determines the best tool based on context:

- **Generate**: Creates new content, completes thoughts, expands on ideas
- **Edit**: Modifies existing text, improves writing, fixes grammar
- **Comment**: Provides feedback, suggestions, annotations

#### 3. **Streaming Response Handling**
The system uses sophisticated streaming for real-time feedback:

```typescript
const stream = createUIMessageStream<ChatMessage>({
  execute: async ({ writer }) => {
    // Stream processing with real-time updates
    writer.merge(stream.toUIMessageStream({ sendFinish: false }));
  },
});
```

### AI Plugin Architecture

#### 1. **AI Chat Plugin** (`components/editor/plugins/ai-kit.tsx:21`)
```typescript
export const aiChatPlugin = AIChatPlugin.extend({
  options: {
    chatOptions: {
      api: '/api/ai/command',
      body: {},
    },
  },
  render: {
    afterContainer: AILoadingBar,
    afterEditable: AIMenu,
    node: AIAnchorElement,
  },
});
```

**Key Features:**
- Real-time streaming integration
- Context-aware tool selection
- Visual feedback during processing
- Seamless content insertion

#### 2. **AI Menu Interface** (`components/platejs/ai-menu.tsx`)
**Interactive command palette** that adapts based on editor state:

**Context States:**
- `cursorCommand`: Actions available at cursor position
- `cursorSuggestion`: Review AI-generated content
- `selectionCommand`: Actions for selected text
- `selectionSuggestion`: Review AI edits to selection

**Available Commands:**
```typescript
const aiChatItems = {
  continueWrite: { /* Generate next sentence */ },
  improveWriting: { /* Enhance selected text */ },
  fixSpelling: { /* Grammar and spelling correction */ },
  summarize: { /* Add summary sections */ },
  comment: { /* Create contextual comments */ },
  // ... more commands
};
```

#### 3. **Chat State Management** (`components/editor/use-chat.ts`)
**Custom hook** that bridges AI SDK with Plate.js:

```typescript
export const useChat = () => {
  const editor = useEditorRef();
  
  const baseChat = useBaseChat<ChatMessage>({
    id: "editor",
    transport: new DefaultChatTransport({
      api: "/api/ai/command",
      fetch: async (input, init) => {
        // Custom fetch with editor context
      },
    }),
    onData: (data) => {
      // Handle AI responses and tool integration
    },
  });
};
```

## API Routes Architecture

### 1. **Primary AI Command Route** (`/api/ai/command`)
**Central AI processing endpoint**

**Capabilities:**
- Multi-model support (Gemini 2.5 Flash, GPT-4o-mini)
- Tool selection and execution
- Streaming responses
- Context-aware processing

**Request Flow:**
```typescript
POST /api/ai/command
{
  apiKey: string,
  ctx: {
    children: SlateNode[],
    selection: Range,
    toolName?: ToolName
  },
  messages: ChatMessage[],
  model: string
}
```

### 2. **Content Generation Route** (`/api/ai/generate`)
**Bulk document creation** for comprehensive content generation

**Process:**
1. Generate structured outline using schema validation
2. Create individual section content
3. Combine into complete document
4. Save to database with metadata

```typescript
const results = await generateObject({
  model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
  system: "you are a standard course work for university students",
  prompt: questions,
  schema: outlineSchema
});
```

### 3. **AI Copilot Route** (`/api/ai/copilot`)
**Quick assistance** for short-form interactions

**Features:**
- Limited token usage (50 tokens max)
- Lower temperature for consistency (0.7)
- Fast response times
- Real-time suggestions

## Plugin System Deep Dive

### Content Element Plugins

#### 1. **Basic Elements** (`BasicBlocksKit`)
- Paragraphs, headings (H1-H6)
- Blockquotes, horizontal rules
- Lists (ordered, unordered, task lists)

#### 2. **Advanced Elements**
- **Code Blocks**: Syntax highlighting with Lowlight
- **Tables**: Full table editing capabilities
- **Toggles**: Collapsible content sections
- **Callouts**: Highlighted information blocks
- **Math Equations**: LaTeX support via KaTeX

#### 3. **Media Support**
- **Images**: Upload, resize, alignment
- **Videos**: Embed from external sources
- **Audio**: Audio file embedding
- **PDFs**: Document embedding and preview

### Text Formatting Plugins

#### 1. **Basic Marks** (`BasicMarksKit`)
- Bold, italic, underline
- Strikethrough, code spans
- Subscript, superscript

#### 2. **Advanced Formatting**
- **FontKit**: Font family, size, color
- **HighlightKit**: Background colors
- **LinkKit**: Internal and external links

### Collaboration Plugins

#### 1. **Comment System** (`CommentKit`)
- Inline commenting with threads
- User attribution and timestamps
- Resolution workflow

#### 2. **Discussion System** (`DiscussionKit`)
- Structured comment threads
- Persistent storage
- User management

#### 3. **Suggestion System** (`SuggestionKit`)
- Track changes mode
- Accept/reject workflow
- Multi-user editing support

## State Management

### Global State
- **Zustand**: Application-wide state
- **Auth Session**: User authentication and permissions
- **Document State**: Current document metadata

### Editor State
- **Slate.js**: Immutable editor state
- **Plugin State**: Feature-specific configurations
- **AI State**: Chat history, tool selection, streaming status

### Collaboration State
- **Cursor Overlay**: Multi-user cursors
- **Selection Sync**: Real-time selection sharing
- **Comment Threads**: Discussion management

## Performance Optimizations

### 1. **Streaming Architecture**
- Real-time AI responses without blocking
- Progressive content loading
- Optimistic UI updates

### 2. **Batch Processing**
- AI operations use batching for efficiency
- Markdown serialization optimizations
- Plugin lazy loading

### 3. **Memory Management**
- Immutable data structures prevent mutation bugs
- Efficient diff algorithms for updates
- Component memoization for render performance

## Security Architecture

### 1. **Authentication**
- **Better Auth**: Modern authentication system
- Session management with secure cookies
- Role-based access control

### 2. **API Security**
- API key validation for AI services
- Request rate limiting
- Input sanitization and validation

### 3. **Content Security**
- XSS prevention through Slate.js
- File upload restrictions
- Content filtering capabilities

## Development Workflow

### Plugin Development
1. Create plugin in `/components/editor/plugins/`
2. Add to appropriate kit in `editor-kit.tsx`
3. Configure render options and handlers
4. Test with editor instance

### AI Feature Development
1. Define tool behavior in `/api/ai/command/prompts.ts`
2. Implement tool logic in route handler
3. Add UI controls in `ai-menu.tsx`
4. Update state management in `use-chat.ts`

### API Development
1. Create route in `/app/api/`
2. Implement request validation with Zod
3. Add error handling and logging
4. Test with integration tests

## Future Architecture Considerations

### Scalability
- Plugin lazy loading for larger codebases
- WebSocket integration for real-time collaboration
- Distributed AI processing for scale

### Performance
- Web Workers for heavy computations
- Service worker caching for offline support
- Optimized bundle splitting

### Extensibility
- Plugin marketplace architecture
- Custom AI model integration
- Third-party service integrations

---

This architecture document serves as a comprehensive guide for understanding and extending the Orunos editor system. Each component is designed to be modular, testable, and maintainable while providing a seamless user experience.