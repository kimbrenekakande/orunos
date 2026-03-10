# Document Creation Workflow Analysis

## Overview

This document provides a comprehensive analysis of the `documentAgent` setup, its tools, and the entire document creation workflow in the Orunos application.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Components](#core-components)
3. [Document Agent Configuration](#document-agent-configuration)
4. [Tools Analysis](#tools-analysis)
5. [Workflow Execution Flow](#workflow-execution-flow)
6. [Data Models](#data-models)
7. [API Integration](#api-integration)
8. [Key Design Decisions](#key-design-decisions)
9. [Potential Improvements](#potential-improvements)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     API Endpoint (POST /api/ai/generate)        │
│                                                                 │
│  Input: { id, paperType, prompt }                              │
│  Output: { status: 'document created successfully' }           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      documentAgent                              │
│                                                                 │
│  Model: meta-llama/llama-4-maverick-17b-128e-instruct (Groq)   │
│  Max Steps: 4                                                   │
│  Tools: [plan, write]                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│      planTool           │     │      writeTool          │
│                         │     │                         │
│  Input: questions       │     │  Input: outlineSchema   │
│  Output: outlineSchema  │     │  Output: { status }     │
│  Model: Groq (LLaMA)    │     │  Model: Moonshot (Kimi) │
└─────────────────────────┘     └─────────────────────────┘
                                        │
                                        ▼
                              ┌─────────────────────────┐
                              │   Prisma Database       │
                              │   (SQLite)              │
                              │                         │
                              │   Document.update()     │
                              └─────────────────────────┘
```

---

## Core Components

### 1. Infrastructure Layer (`braintrust.ts`)

**Location:** `/apps/web/lib/ai/braintrust.ts`

```typescript
import * as ai from "ai";
import { initLogger, wrapAISDK } from "braintrust";

initLogger({
  projectName: "orunos",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

export const { ToolLoopAgent, tool, stepCountIs, generateText } = wrapAISDK(ai);
```

**Purpose:**
- Initializes **Braintrust** as the AI observability/logging backend
- Wraps the Vercel AI SDK to provide custom agent and tool primitives
- Exports core abstractions:
  - `ToolLoopAgent`: Agent that can call tools in a loop
  - `tool`: Helper to define tools with schemas
  - `stepCountIs`: Stopping condition based on step count
  - `generateText`: Text generation function

---

### 2. Type Definitions (`types.ts`)

**Location:** `/apps/web/lib/types.ts`

```typescript
export const outlineSchema = z.object({
  title: z.string().describe("The title of the document based on its content"),
  summary: z.string().describe("A very detailed summary of the academic document based on the outline"),
  sections: z.array(z.object({
    title: z.string().describe("The title of the section"),
    content: z.string().describe("A prompt for the next agent in the chain to generate the content for this section")
  })).describe("An array of sections that make up the document"),
  conclusion: z.string().describe("The detailed summary of the document")
});
```

**Purpose:**
- Defines the structure of document outlines using Zod schema
- Used as input/output contract between tools
- Ensures type safety across the workflow

**Schema Structure:**
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Document title |
| `summary` | string | Detailed summary (used verbatim in final doc) |
| `sections` | array | Array of section objects |
| `sections[].title` | string | Section heading |
| `sections[].content` | string | Prompt for generating section content |
| `conclusion` | string | Detailed conclusion (used verbatim in final doc) |

---

## Document Agent Configuration

**Location:** `/apps/web/lib/ai/agents.ts`

```typescript
export const documentAgent = new ToolLoopAgent({
  model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
  instructions: "You are an agent that writes university coursework documents. first generate an outline, then write the document by generating each section and combining them into a final document.",
  tools: {
    plan: planTool,
    write: writeTool,
  },
  stopWhen: stepCountIs(4),
});
```

### Configuration Breakdown

| Property | Value | Purpose |
|----------|-------|---------|
| `model` | `groq('meta-llama/llama-4-maverick-17b-128e-instruct')` | LLM for orchestrating the workflow |
| `instructions` | System prompt | Guides agent behavior and workflow |
| `tools` | `{ plan, write }` | Available tools the agent can call |
| `stopWhen` | `stepCountIs(4)` | Maximum 4 steps before termination |

### Why 4 Steps?

The step count of 4 aligns with the workflow:
1. **Step 1:** Call `planTool` to generate outline
2. **Step 2:** Call `writeTool` with outline
3. **Step 3-4:** Buffer for error handling/retries or multi-section writing

---

## Tools Analysis

### planTool

**Location:** `/apps/web/lib/ai/tools.ts` (lines 9-30)

```typescript
export const planTool = tool({
  description: "Create the outline of the document based on the questions provided.",
  inputSchema: z.object({
    questions: z.string().describe("the questions of the document to generate the outline from")
  }),
  execute: async(questions) => {
    const outline = await generateText({
      model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
      system: `
        Your role is to generate an outline based on questions provided.
        Generate the summary and conclusion in details (they will be used in the final document without alteration)
        Title should be concise and descriptive of the content it represents
      `,
      output: Output.object({
        schema: outlineSchema
      }),
      prompt: `Generate an outline needed to better write a coursework document based on the following questions: ${questions}`,
    });

    return { docPlan: outline }
  }
})
```

#### planTool Specifications

| Aspect | Details |
|--------|---------|
| **Purpose** | Generate document outline from questions |
| **Input** | `questions: string` - Coursework questions/prompt |
| **Output** | `{ docPlan: outlineSchema }` |
| **Model** | `groq('meta-llama/llama-4-maverick-17b-128e-instruct')` |
| **Output Format** | Structured JSON via `Output.object()` |

#### Key Design Points

1. **Structured Output:** Uses Zod schema to enforce consistent outline format
2. **Summary/Conclusion Emphasis:** System prompt emphasizes these will be used verbatim
3. **Title Generation:** Instructed to create concise, descriptive titles

---

### writeTool

**Location:** `/apps/web/lib/ai/tools.ts` (lines 32-79)

```typescript
export const writeTool = tool({
  description: "Expand on the outline to generate detailed content for each section and combine it with the summary and conclusion into a final document",
  inputSchema: outlineSchema.extend({
    id: z.string("The unique identifier for the document")
  }),
  execute: async (docPlan) => {
    const sections = docPlan.sections
    const content = sections.map(async (sec) => {
      const { text } = await generateText({
        model: groq('moonshotai/kimi-k2-instruct-0905'),
        system: `
          You are an agent part of an academic document creation workflow,
          Your role is to generate detailed content on the provided section.
          Keep in mind the content you are generating is part of a larger document so it shouldnt be having intros and conclusions.
          your output should start with a subheading from your input.
          rules :
          -Do not use h1 or its equivalent(#)
          -The output format should markdown
          -Dont add any dividers or conclusions.
        `,
        prompt: `write a deep dive on ${sec['content']}`,
      });
      return text
    });

    // Document Appending
    let document = '';
    document += `\n # ${docPlan['title']} \n`;
    document += `\n ## Summary \n ${docPlan['summary']} \n`;

    const x = await Promise.all(content)
    for (const item of x) document += `\n ${item} \n`;
    document += `\n ## Conclusion \n ${docPlan['conclusion']} \n`;

    await prisma.document.update({
      where: { id: docPlan.id },
      data: {
        title: docPlan.title,
        answer: document,
        status: "READY",
      }
    })

    return { status: "done" }
  },
});
```

#### writeTool Specifications

| Aspect | Details |
|--------|---------|
| **Purpose** | Generate full document content from outline |
| **Input** | `outlineSchema + { id }` |
| **Output** | `{ status: "done" }` |
| **Model** | `moonshotai/kimi-k2-instruct-0905` (different from planner!) |
| **Side Effects** | Updates Prisma `Document` table |

#### Key Design Points

1. **Parallel Section Generation:** Uses `Promise.all()` to generate all sections concurrently
2. **Different Model:** Uses Kimi-K2 (Moonshot) instead of LLaMA for content generation
3. **Markdown Formatting:** Enforces specific markdown rules (no H1, proper structure)
4. **Document Assembly:** Combines:
   - Title (H1)
   - Summary (H2) - from outline, verbatim
   - Sections (H2+) - generated content
   - Conclusion (H2) - from outline, verbatim
5. **Database Update:** Persists final document with `READY` status

#### Document Structure Generated

```markdown
# {title}

## Summary
{summary from outline}

{section 1 content}
{section 2 content}
...
{section N content}

## Conclusion
{conclusion from outline}
```

---

## Workflow Execution Flow

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────┐
│ Step 0: API Call                                                 │
│ POST /api/ai/generate                                            │
│ Body: { id, paperType, prompt }                                 │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│ Step 1: documentAgent.generate()                                 │
│ Prompt: "Create an academic Document..."                         │
│ - Document ID: {id}                                             │
│ - Document Type: {paperType}                                    │
│ - Questions: {prompt}                                           │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│ Step 2: Agent Decision - Call planTool                           │
│ Input: questions = prompt from request                          │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│ Step 3: planTool.execute()                                       │
│ 1. Call generateText() with Groq LLaMA                          │
│ 2. System: "Generate outline..."                                │
│ 3. Output: outlineSchema (structured JSON)                      │
│ 4. Return: { docPlan: outline }                                 │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│ Step 4: Agent Decision - Call writeTool                          │
│ Input: outlineSchema + { id }                                   │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│ Step 5: writeTool.execute()                                      │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 5a. Parallel Section Generation                             │ │
│ │ For each section in outline.sections:                       │ │
│ │   - Call generateText() with Kimi-K2                        │ │
│ │   - System: "Generate detailed content..."                  │ │
│ │   - Prompt: "write a deep dive on {section.content}"        │ │
│ │   - Return: markdown text                                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 5b. Document Assembly                                       │ │
│ │ document = "# {title}\n## Summary\n{summary}\n              │ │
│ │            {section1}\n{section2}...\n## Conclusion\n{concl}│ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 5c. Database Update                                         │ │
│ │ prisma.document.update({                                    │ │
│ │   where: { id },                                            │ │
│ │   data: {                                                   │ │
│ │     title: docPlan.title,                                   │ │
│ │     answer: document,                                       │ │
│ │     status: "READY"                                         │ │
│ │   }                                                         │ │
│ │ })                                                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ Return: { status: "done" }                                      │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│ Step 6: Agent Loop Complete                                      │
│ Return to API route                                              │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│ Step 7: API Response                                             │
│ { status: 'document created successfully' }                     │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Models

### Prisma Schema (`schema.prisma`)

**Location:** `/apps/web/prisma/schema.prisma`

```prisma
enum DocStatus {
  GENERATING
  READY
}

model Document {
  id        String    @id @default(cuid())
  docTypeId String
  docType   DocType   @relation(fields: [docTypeId], references: [type])
  title     String
  question  String
  answer    String?
  status    DocStatus
  cost      Int
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([userId])
}

model DocType {
  type        String     @id @unique // 'coursework', 'fieldwork', etc.
  price       Int
  name        String // Display name: "Coursework", "Field Work"
  description String? // Optional description
  documents   Document[]
  isActive    Boolean    @default(true) // Can disable document types
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([type])
}
```

### Document Lifecycle

```
┌─────────────┐
│  CREATE     │ ← Document created via creator.ts with:
│  (status:   │   - question (user prompt)
│   GENERAT-  │   - docTypeId
│   ING)      │   - userId
│             │   - cost
└─────────────┘
       │
       │ documentAgent.generate() called
       │
       ▼
┌─────────────┐
│  PROCESSING │ ← planTool generates outline
│  (implicit) │   writeTool generates content
│             │
└─────────────┘
       │
       │ writeTool completes
       │
       ▼
┌─────────────┐
│  UPDATE     │ ← prisma.document.update() sets:
│  (status:   │   - title (from outline)
│   READY)    │   - answer (full markdown document)
│             │   - status: "READY"
└─────────────┘
```

---

## API Integration

### API Route (`/api/ai/generate/route.ts`)

**Location:** `/apps/web/app/api/ai/generate/route.ts`

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = await body.id;
  const documentType = await body.paperType
  const questions = await body.prompt;

  // Validation
  if (!id) {
    return NextResponse.json(
      { error: 'Document ID is required' },
      { status: 400 }
    );
  }
  if (!questions) {
    return NextResponse.json(
      { error: 'Prompt is required' },
      { status: 400 }
    );
  }

  // Execute agent
  const maker = await documentAgent.generate({
    prompt: `
    Create an academic Document
    Document ID : ${id}
    Document Type :  ${documentType}
    questions : ${questions}
    `
  })

  console.log(maker)

  return NextResponse.json({status : 'document created successfully'});
}
```

### Request/Response Contract

**Request:**
```json
{
  "id": "doc_123",
  "paperType": "coursework",
  "prompt": "Discuss the impact of climate change on agriculture"
}
```

**Response (Success):**
```json
{
  "status": "document created successfully"
}
```

**Response (Error - 400):**
```json
{
  "error": "Document ID is required"
}
```

---

## Key Design Decisions

### 1. Two-Phase Generation (Plan → Write)

**Decision:** Separate outline generation from content generation

**Rationale:**
- Ensures coherent document structure before writing
- Allows different models for different tasks
- Summary/conclusion written once, reused verbatim

### 2. Multi-Model Strategy

| Phase | Model | Provider | Reason |
|-------|-------|----------|--------|
| Orchestration | LLaMA-4-Maverick-17B | Groq | Fast, good reasoning |
| Planning | LLaMA-4-Maverick-17B | Groq | Structured output capability |
| Writing | Kimi-K2-Instruct | Moonshot | Optimized for long-form content |

### 3. Parallel Section Generation

**Decision:** Use `Promise.all()` to generate sections concurrently

**Benefits:**
- Reduces total generation time
- Sections are independent
- Scales with available API quota

**Trade-offs:**
- Higher concurrent API usage
- No inter-section context sharing

### 4. Structured Output with Zod

**Decision:** Use `outlineSchema` for type-safe structured output

**Benefits:**
- Type safety across tool boundaries
- Validation at runtime
- Self-documenting contracts

### 5. Direct Database Update in Tool

**Decision:** `writeTool` directly updates Prisma database

**Rationale:**
- Atomic operation (generation + persistence)
- Reduces API round-trips
- Clear ownership of document state

### 6. Step Limit of 4

**Decision:** `stopWhen: stepCountIs(4)`

**Workflow Mapping:**
1. Plan tool call
2. Write tool call
3-4. Buffer for retries/complex workflows

---

## Potential Improvements

### 1. Error Handling

**Current:** No explicit error handling in tools

**Recommendation:**
```typescript
try {
  const outline = await generateText({...});
  return { docPlan: outline };
} catch (error) {
  console.error('Plan generation failed:', error);
  throw new Error('Failed to generate document outline');
}
```

### 2. Progress Tracking

**Current:** No progress updates during generation

**Recommendation:** Add status updates to database:
```typescript
await prisma.document.update({
  where: { id },
  data: { status: 'GENERATING' } // Before
});
// ... generation ...
await prisma.document.update({
  where: { id },
  data: { status: 'READY' } // After
});
```

### 3. Section Ordering

**Current:** Parallel generation loses section order

**Recommendation:** Preserve order in assembly:
```typescript
const contents = await Promise.all(content);
sections.forEach((sec, i) => {
  document += `\n ${contents[i]} \n`;
});
```

### 4. Token/Cost Tracking

**Current:** No cost tracking for AI calls

**Recommendation:** Track and store generation costs:
```typescript
const cost = calculateTokenCost(response.usage);
await prisma.document.update({
  where: { id },
  data: { cost }
});
```

### 5. Streaming Support

**Current:** Waits for full generation before response

**Recommendation:** Implement streaming for real-time updates:
```typescript
const stream = await documentAgent.stream({ prompt });
return new StreamingTextResponse(stream);
```

### 6. Retry Logic

**Current:** Single attempt per tool

**Recommendation:** Add retry with exponential backoff for API failures

---

## File Dependencies

```
/apps/web/
├── app/api/ai/generate/route.ts     # API endpoint
│   └── imports: documentAgent
│
├── lib/ai/
│   ├── agents.ts                    # documentAgent definition
│   │   ├── imports: ToolLoopAgent, stepCountIs (from braintrust)
│   │   ├── imports: planTool, writeTool (from tools)
│   │   └── imports: groq (@ai-sdk/groq)
│   │
│   ├── tools.ts                     # Tool definitions
│   │   ├── imports: tool, generateText (from braintrust)
│   │   ├── imports: groq (@ai-sdk/groq)
│   │   ├── imports: z (zod)
│   │   ├── imports: outlineSchema (from types)
│   │   ├── imports: Output (ai)
│   │   └── imports: prisma (@/lib/prisma)
│   │
│   └── braintrust.ts                # AI infrastructure
│       ├── imports: ai (ai SDK)
│       └── imports: initLogger, wrapAISDK (braintrust)
│
├── lib/types.ts                     # Type definitions
│   └── exports: outlineSchema
│
└── prisma/
    └── schema.prisma                # Database schema
        └── models: Document, DocType
```

---

## Summary

The `documentAgent` is a sophisticated AI agent that orchestrates a two-phase document generation workflow:

1. **Planning Phase:** Uses LLaMA-4-Maverick via Groq to generate a structured outline with summary and conclusion
2. **Writing Phase:** Uses Kimi-K2 via Moonshot to generate detailed section content in parallel, then assembles the final document

Key architectural choices include:
- Separation of concerns (planning vs. writing)
- Multi-model strategy for optimal performance
- Parallel processing for speed
- Type-safe contracts via Zod schemas
- Direct database persistence for atomicity

The workflow is triggered via a Next.js API route and integrates with Braintrust for observability, making it production-ready for academic document generation at scale.
