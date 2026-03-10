# Orunos Web

The Next.js web application for Orunos — Your Academic Copilot. A full-featured academic document creation platform with AI-powered writing assistance.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Authentication](#authentication)
- [AI Integration](#ai-integration)
- [Editor](#editor)
- [File Uploads](#file-uploads)
- [Email](#email)
- [Monitoring](#monitoring)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Overview

Orunos Web is a Next.js 16 application that serves as the primary interface for the Orunos platform. It provides:

- Rich text editing with Plate.js
- AI-powered content generation
- Document management
- User authentication
- Professional PDF export

The application is built with the App Router architecture and uses server-side rendering for optimal performance and SEO.

---

## Features

### Document Editor

- **Rich Text Editing** — Plate.js-based editor with 50+ plugins
- **AI Assistance** — Content generation, rewriting, and suggestions
- **Citations** — Automatic citation generation and bibliography
- **Tables & Figures** — Full support for academic content types
- **Equations** — LaTeX-style mathematical notation
- **Export** — PDF, DOCX, Markdown, and LaTeX export

### Dashboard

- Document management and organization
- Document type selection (coursework, fieldwork, thesis, research)
- Balance and transaction tracking
- Settings and profile management

### Landing Page

- Feature showcase
- Interactive UI components
- Call-to-action sections
- Responsive design

### Authentication

- Email/password authentication
- Google OAuth
- Email verification
- Session management
- Cross-domain cookies for mobile sync

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js | 16.0.10 |
| **UI Library** | React | 19.2.3 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | shadcn/ui, Radix UI | Latest |
| **State Management** | Zustand | 5.0.8 |
| **Forms** | React Hook Form | 7.68.0 |
| **Validation** | Zod | 4.1.13 |
| **Rich Text Editor** | Plate.js | 51.1.3 |
| **AI Integration** | AI SDK | 6.0.99 |
| **AI Providers** | DeepSeek, Groq, OpenAI | Latest |
| **Database ORM** | Prisma | 7.2.0 |
| **Database** | LibSQL (SQLite/Turso) | Latest |
| **Authentication** | Better Auth | 1.4.15 |
| **Email** | Resend | 6.7.0 |
| **File Uploads** | UploadThing | 7.7.4 |
| **Charts** | Recharts | 2.15.4 |
| **PDF** | @react-pdf/renderer, pdf-lib | Latest |
| **Animations** | Framer Motion, GSAP | Latest |
| **Icons** | Lucide, Tabler Icons | Latest |
| **Monitoring** | Sentry | 10.x |
| **OTEL** | Vercel OTEL, Braintrust | Latest |

---

## Project Structure

```
apps/web/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (login, signup)
│   │   ├── login/
│   │   └── signup/
│   ├── (others)/                 # Public pages
│   ├── api/                      # API routes
│   │   ├── ai/                   # AI endpoints
│   │   │   ├── command/          # AI commands
│   │   │   ├── copilot/          # AI copilot
│   │   │   └── generate/         # Content generation
│   │   ├── auth/                 # Auth endpoints
│   │   ├── papers/               # Document endpoints
│   │   └── uploadthing/          # File upload
│   ├── dashboard/                # Protected dashboard
│   │   ├── [doctype]/            # Dynamic document type pages
│   │   │   └── editor/           # Document editor
│   │   ├── billing/              # Billing pages
│   │   ├── settings/             # User settings
│   │   ├── layout.tsx            # Dashboard layout
│   │   └── page.tsx              # Dashboard home
│   ├── global-error.tsx          # Global error boundary
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── unauthorized.tsx          # Unauthorized access page
│
├── components/                   # React components
│   ├── auth/                     # Auth components
│   ├── dashboard/                # Dashboard components
│   │   ├── app-sidebar.tsx       # Sidebar navigation
│   │   ├── site-header.tsx       # Header component
│   │   ├── sidebar.tsx           # Sidebar provider
│   │   └── ...                   # UI components
│   ├── editor/                   # Plate.js editor
│   │   ├── plugins/              # Custom plugins
│   │   ├── doc.tsx               # Document wrapper
│   │   ├── editor-kit.tsx        # Editor configuration
│   │   ├── plate-editor.tsx      # Main editor component
│   │   └── use-chat.ts           # AI chat hook
│   ├── emails/                   # React Email templates
│   │   └── emailConfirmation.tsx # Email verification template
│   ├── platejs/                  # Plate.js custom nodes
│   │   ├── ai-node.tsx           # AI suggestion node
│   │   ├── block-selection.tsx   # Block selection
│   │   ├── code-block-node.tsx   # Code blocks
│   │   ├── equation-node.tsx     # Math equations
│   │   ├── table-node.tsx        # Tables
│   │   └── ...                   # 50+ node types
│   ├── react-bits/               # Animated components
│   ├── ruixen/                   # Custom UI components
│   ├── tiptapui/                 # UI components
│   ├── ui/                       # shadcn/ui components
│   └── ...                       # Other components
│
├── lib/                          # Core libraries
│   ├── actions/                  # Server actions
│   ├── ai/                       # AI utilities
│   │   ├── agents.ts             # AI agents
│   │   ├── braintrust.ts         # Braintrust integration
│   │   ├── rules.ts              # AI rules
│   │   └── tools.ts              # AI tools
│   ├── data/                     # Static data
│   ├── auth.tsx                  # Better Auth configuration
│   ├── auth-client.ts            # Auth client
│   ├── base-url.ts               # Base URL configuration
│   ├── client-session.ts         # Client session utilities
│   ├── features.ts               # Feature flags
│   ├── fetcher.ts                # Data fetching utilities
│   ├── prisma.ts                 # Prisma client
│   ├── resend.ts                 # Email sending
│   ├── server-session.ts         # Server session utilities
│   ├── social-auth.ts            # Social authentication
│   ├── store.ts                  # Zustand stores
│   ├── templates.ts              # Document templates
│   ├── types.ts                  # TypeScript types
│   ├── uploadthing.ts            # UploadThing config
│   └── utils.ts                  # Utility functions
│
├── prisma/                       # Database
│   ├── generated/                # Generated Prisma client
│   ├── migrations/               # Database migrations
│   └── schema.prisma             # Database schema
│
├── server/                       # Server-side logic
│   ├── creator.ts                # Document creator
│   └── streamer.ts               # Streaming utilities
│
├── styles/                       # Styles
│   ├── _variables.scss           # SCSS variables
│   └── _keyframe-animations.scss # Keyframe animations
│
├── hooks/                        # Custom React hooks
│   ├── use-auto-resize-textarea.ts
│   ├── use-composed-ref.ts
│   ├── use-cursor-visibility.ts
│   ├── use-debounce.ts
│   ├── use-element-rect.ts
│   ├── use-is-touch-device.ts
│   ├── use-menu-navigation.ts
│   ├── use-mobile.ts
│   ├── use-mounted.ts
│   ├── use-scrolling.ts
│   ├── use-throttled-callback.ts
│   ├── use-unmount.ts
│   ├── use-upload-file.ts
│   └── use-window-size.ts
│
├── utils/                        # Utility functions
│
├── public/                       # Static assets
│   ├── fonts/                    # Custom fonts
│   ├── images/                   # Images
│   └── ...                       # Other assets
│
├── instrumentation.ts            # Sentry instrumentation
├── instrumentation-client.ts     # Client-side instrumentation
├── sentry.edge.config.ts         # Sentry edge config
├── sentry.server.config.ts       # Sentry server config
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript config
├── eslint.config.mjs             # ESLint config
├── tailwind.config.ts            # Tailwind config
├── postcss.config.mjs            # PostCSS config
└── package.json                  # Dependencies
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Bun** 1.3.3+ (recommended)
- **Git**

### Installation

1. **Navigate to the web directory**

   ```bash
   cd apps/web
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file:

   ```bash
   # Database
   DATABASE_URL="file:./dev.db"
   PROD="false"

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-min-32-chars"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Resend (email)
   RESEND_API_KEY="re_your-api-key"

   # UploadThing (file uploads)
   UPLOADTHING_TOKEN="your-uploadthing-token"

   # AI Providers
   DEEPSEEK_API_KEY="your-deepseek-api-key"
   GROQ_API_KEY="your-groq-api-key"
   OPENAI_API_KEY="your-openai-api-key"

   # Sentry (monitoring)
   SENTRY_ORG="your-sentry-org"
   SENTRY_PROJECT="orunos"

   # Turso (production database)
   TURSO_DATABASE_URL="libsql://your-db.turso.io"
   TURSO_AUTH_TOKEN="your-auth-token"
   ```

4. **Set up the database**

   ```bash
   bun prisma generate
   bun prisma db push
   ```

5. **Run the development server**

   ```bash
   bun dev
   ```

6. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Development

### Available Scripts

```bash
# Start development server
bun dev

# Build for production
bun build

# Start production server
bun start

# Run linting
bun lint

# Type check
bun check-types

# Generate Prisma client
bun prisma generate

# Run database migrations
bun prisma migrate dev

# Push schema to database
bun prisma db push

# Reset database
bun prisma migrate reset

# Open Prisma Studio
bun prisma studio

# Start email preview server
bun email
```

### Hot Reloading

The development server automatically reloads on file changes. For server components, changes are reflected immediately. For client components, Fast Refresh is used.

### Debugging

Use React DevTools and the Next.js DevTools for debugging:

```bash
# Install React DevTools
bun add -g react-devtools
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Development database URL | `file:./dev.db` |
| `BETTER_AUTH_SECRET` | Secret for session encryption | `min-32-characters` |
| `PROD` | Production mode flag | `true` or `false` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `RESEND_API_KEY` | Resend API key for emails |
| `UPLOADTHING_TOKEN` | UploadThing token for file uploads |
| `DEEPSEEK_API_KEY` | DeepSeek AI API key |
| `GROQ_API_KEY` | Groq AI API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `TURSO_DATABASE_URL` | Turso database URL (production) |
| `TURSO_AUTH_TOKEN` | Turso auth token (production) |

---

## Database

### Schema Overview

The application uses Prisma ORM with LibSQL (SQLite) for development and Turso for production.

**Core Models:**

- **User** — User accounts with balance
- **Session** — User sessions for authentication
- **Account** — OAuth provider accounts
- **Verification** — Email verification codes
- **Document** — Academic documents
- **DocType** — Document types (coursework, fieldwork, etc.)
- **Transaction** — User balance transactions

### Database Commands

```bash
# Generate Prisma Client
bun prisma generate

# Create a new migration
bun prisma migrate dev --name migration_name

# Apply migrations to production
bun prisma migrate deploy

# Reset database
bun prisma migrate reset

# Open Prisma Studio (database GUI)
bun prisma studio
```

### Production Database

For production, the app uses Turso (LibSQL):

```typescript
// lib/prisma.ts
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
```

---

## Authentication

### Configuration

Authentication is handled by **Better Auth** with the following features:

- Email/password authentication
- Google OAuth
- Email verification
- Session management
- Cross-domain cookies for mobile sync

### Usage

```typescript
// Server-side
import { auth } from "@/lib/auth";

const session = await auth.api.getSession({ headers });

// Client-side
import { authClient } from "@/lib/auth-client";

const { data: session } = authClient.useSession();
```

### Protected Routes

Use middleware or server components to protect routes:

```typescript
// app/dashboard/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({ headers: [] });

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
```

---

## AI Integration

### AI Providers

The app integrates with multiple AI providers:

- **DeepSeek** — Primary AI model
- **Groq** — Fast inference
- **OpenAI** — Fallback provider

### AI Features

- **Content Generation** — Generate academic text
- **Rewriting** — Improve existing content
- **Suggestions** — Context-aware suggestions
- **Citations** — Automatic citation generation
- **Summarization** — Abstract and summary generation

### Usage

```typescript
// lib/ai/agents.ts
import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

const deepseek = createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY });

export async function generateContent(prompt: string) {
  const { text } = await generateText({
    model: deepseek("deepseek-chat"),
    prompt: prompt,
  });

  return text;
}
```

### AI Chat Hook

```typescript
// components/editor/use-chat.ts
import { useChat } from "ai/react";

export function useEditorChat() {
  return useChat({
    api: "/api/ai/generate",
    onResponse: (response) => {
      // Handle response
    },
  });
}
```

---

## Editor

### Plate.js Configuration

The editor is built with Plate.js, a rich text editor framework:

```typescript
// components/editor/editor-kit.tsx
import { createPlateEditor } from "@platejs/core";

export function useEditor() {
  return createPlateEditor({
    plugins: [
      // Core plugins
      createParagraphPlugin(),
      createHeadingPlugin(),
      
      // AI plugins
      createAIPlugin(),
      
      // Media plugins
      createImagePlugin(),
      createTablePlugin(),
      
      // More plugins...
    ],
  });
}
```

### Editor Components

- **FixedToolbar** — Main toolbar with formatting options
- **FloatingToolbar** — Context-aware floating toolbar
- **SlashCommand** — Slash command menu
- **AIMenu** — AI assistance menu
- **BlockSelection** — Block-level selection
- **TableNode** — Table editing
- **EquationNode** — Math equations
- **CodeBlockNode** — Code blocks with syntax highlighting

### Custom Plugins

Located in `components/editor/plugins/`:

- AI suggestion plugin
- Comment plugin
- Track changes plugin
- Citation plugin

---

## File Uploads

### UploadThing Configuration

```typescript
// lib/uploadthing.ts
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  editorUploader: f(["image", "text", "blob", "pdf", "video", "audio"])
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      return {
        key: file.key,
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.ufsUrl,
      };
    }),
};
```

### Upload Hook

```typescript
// hooks/use-upload-file.ts
import { useUploadThing } from "uploadthing/react";

export function useUploadFile() {
  const { startUpload } = useUploadThing("editorUploader");

  const upload = async (files: File[]) => {
    const result = await startUpload(files);
    return result;
  };

  return { upload };
}
```

---

## Email

### Resend Configuration

```typescript
// lib/resend.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, react }) {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: to,
    subject: subject,
    html: await render(react),
  });
}
```

### Email Templates

React Email templates are located in `components/emails/`:

- **emailConfirmation.tsx** — Email verification template

### Preview Server

```bash
# Start email preview server
bun email
```

Then navigate to [http://localhost:3001](http://localhost:3001) to preview templates.

---

## Monitoring

### Sentry Configuration

The app uses Sentry for error tracking and performance monitoring:

```typescript
// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://your-dsn@sentry.io/project-id",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
```

### Instrumentation

```typescript
// instrumentation.ts
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
```

### OpenTelemetry

The app also uses OpenTelemetry for distributed tracing:

- **@vercel/otel** — Vercel OTEL integration
- **@braintrust/otel** — Braintrust OTEL integration

---

## Building for Production

### Build Command

```bash
bun build
```

This creates an optimized production build in the `.next` directory.

### Analyze Bundle

```bash
# Install bundle analyzer
bun add -D @next/bundle-analyzer

# Update next.config.ts
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);

# Run build with analysis
ANALYZE=true bun build
```

### Performance Optimization

- Enable ISR (Incremental Static Regeneration)
- Use React Server Components where possible
- Implement proper caching strategies
- Optimize images with Next.js Image component
- Use dynamic imports for code splitting

---

## Deployment

### Vercel (Recommended)

1. **Push to Git**

   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**

   ```bash
   vercel deploy --prod
   ```

3. **Set Environment Variables**

   Add all environment variables in Vercel project settings.

### Manual Deployment

```bash
# Build
bun build

# Start production server
bun start
```

### Docker

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun build

# Run
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
```

---

## Troubleshooting

### Common Issues

**Database connection errors:**

```bash
# Regenerate Prisma client
bun prisma generate

# Push schema to database
bun prisma db push
```

**Build errors:**

```bash
# Clear .next cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
bun install
```

**TypeScript errors:**

```bash
# Check TypeScript configuration
bun tsc --noEmit
```

**Sentry upload errors:**

```bash
# Verify Sentry configuration
# Check SENTRY_ORG and SENTRY_PROJECT environment variables
```

### Debug Mode

Enable debug logging:

```bash
DEBUG=next:* bun dev
```

### Performance Issues

Use Next.js built-in profiling:

```bash
# Enable React profiling
NEXT_REACT_PROFILE=true bun dev
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Plate.js Documentation](https://platejs.org/)
- [Better Auth Documentation](https://better-auth.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

*Last updated: February 2026*
