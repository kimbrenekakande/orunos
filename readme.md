# Orunos

**Your Academic Copilot** — Your Academic Copilot — Create Authentic Academic Documents with AI that understands your stylometry.

Orunos is a comprehensive academic document creation platform designed for researchers, students, and academics. Generate well-formatted papers, theses, reports, and publications with AI-assisted writing, automatic citations, and professional PDF export tailored to academic standards.

![Orunos Banner](./apps/web/public/images/tree.jpg)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Orunos is a full-stack monorepo application that provides:

- **AI-powered academic writing assistance** — Generate content, improve academic language, and get writing suggestions
- **Rich text editing** — Plate.js-based editor with support for tables, equations, citations, and more
- **Citation management** — Automatic citation generation across 10,000+ academic sources
- **Document templates** — Pre-built templates for coursework, fieldwork, theses, and research papers
- **Multi-platform access** — Web application (Next.js) and mobile app (Expo React Native)
- **User authentication** — Secure authentication with Better Auth, email verification, and social login

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Orunos Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐              ┌──────────────────┐     │
│  │   Web App        │              │   Mobile App     │     │
│  │   (Next.js 16)   │◄────────────►│   (Expo RN)      │     │
│  │   localhost:3000 │   Shared     │   localhost:8081 │     │
│  └────────┬─────────┘   Auth       └──────────────────┘     │
│           │                                                  │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │   API Routes     │                                       │
│  │   /api/*         │                                       │
│  └────────┬─────────┘                                       │
│           │                                                  │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │   Better Auth    │                                       │
│  │   (Auth Layer)   │                                       │
│  └────────┬─────────┘                                       │
│           │                                                  │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │   Prisma ORM     │                                       │
│  │   (SQLite/Turso) │                                       │
│  └────────┬─────────┘                                       │
│           │                                                  │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │   Database       │                                       │
│  │   (LibSQL)       │                                       │
│  └──────────────────┘                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

### Academic Document Editor

Powered by **Plate.js** (Slate-based rich text editor) with AI-enhanced features:

- **AI-powered content generation** — Generate academic text with AI assistance
- **Smart formatting** — Follows APA, MLA, Chicago, and other academic style guides
- **Tables, figures, and equations** — Full support for academic content types
- **Citation management** — Automatic bibliography generation
- **AI peer review** — Get feedback and suggestions for improvement
- **Mathematical equations** — LaTeX-style equation editing
- **Table of contents** — Automatic section numbering and navigation
- **Context-aware suggestions** — Academic language improvements
- **Abstract generation** — AI-driven summary creation

### Professional PDF Export

- Academic paper formatting with proper margins and typography
- Thesis and dissertation templates
- Journal submission-ready layouts
- Conference paper formats
- Research poster generation

### Document Management

- Create, edit, and organize academic documents
- Version history and revision tracking
- Export to multiple formats (PDF, DOCX, LaTeX, Markdown)
- Collaborative writing and co-author support

### User Interface

- Responsive design for all screen sizes
- Dark/light mode support
- Accessible components (WCAG compliant)
- Keyboard shortcuts for power users
- Modern UI with shadcn/ui and custom components

### Authentication & Security

- Email/password authentication
- Social login (Google OAuth)
- Email verification
- Session management with cookies
- Cross-domain cookie support for mobile apps
- Secure token storage

---

## Technology Stack

### Core Technologies

| Category | Technology | Version |
|----------|-----------|---------|
| **Package Manager** | Bun | 1.3.3 |
| **Build Tool** | Turborepo | 2.7.3 |
| **Language** | TypeScript | 5.9.3 |

### Web Application (`apps/web`)

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js | 16.0.10 |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | shadcn/ui, Radix UI | Latest |
| **State Management** | Zustand | 5.0.8 |
| **Forms** | React Hook Form | 7.68.0 |
| **Validation** | Zod | 4.1.13 |
| **Rich Text Editor** | Plate.js | 51.1.3 |
| **AI Integration** | AI SDK | 6.0.99 |
| **AI Providers** | DeepSeek, Groq, OpenAI | Latest |
| **Database ORM** | Prisma | 7.2.0 |
| **Database** | LibSQL (SQLite) | Latest |
| **Authentication** | Better Auth | 1.4.15 |
| **File Uploads** | UploadThing | 7.7.4 |
| **Email** | Resend | 6.7.0 |
| **Charts** | Recharts | 2.15.4 |
| **PDF** | @react-pdf/renderer, pdf-lib | Latest |
| **Animations** | Framer Motion, GSAP | Latest |
| **Icons** | Lucide, Tabler Icons | Latest |
| **Monitoring** | Sentry | 10.x |

### Mobile Application (`apps/mobile`)

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Expo | 54.0.33 |
| **Navigation** | Expo Router | 6.0.23 |
| **UI Library** | React Native | 0.81.5 |
| **Styling** | Uniwind (Tailwind for RN) | Latest |
| **UI Components** | HeroUI Native | 1.0.0-rc.1 |
| **Authentication** | Better Auth Expo | 1.4.18 |
| **Secure Storage** | Expo SecureStore | 15.0.8 |
| **Navigation** | React Navigation | 7.x |
| **Gestures** | React Native Gesture Handler | 2.28.0 |
| **Animations** | React Native Reanimated | 4.1.1 |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| TypeScript | Type checking |
| Metro | React Native bundler |
| Prisma | Database migrations |

---

## Project Structure

```
orunos/
├── apps/
│   ├── web/                          # Next.js web application
│   │   ├── app/                      # App Router pages & layouts
│   │   │   ├── (auth)/               # Auth pages (login, signup)
│   │   │   ├── (others)/             # Other public pages
│   │   │   ├── api/                  # API routes
│   │   │   │   ├── ai/               # AI-related endpoints
│   │   │   │   ├── auth/             # Auth endpoints
│   │   │   │   ├── papers/           # Document endpoints
│   │   │   │   └── uploadthing/      # File upload endpoint
│   │   │   └── dashboard/            # Protected dashboard pages
│   │   │       ├── [doctype]/        # Dynamic document type pages
│   │   │       ├── billing/          # Billing pages
│   │   │       └── settings/         # User settings
│   │   ├── components/               # React components
│   │   │   ├── auth/                 # Auth-related components
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   ├── editor/               # Plate.js editor components
│   │   │   ├── emails/               # React Email components
│   │   │   ├── platejs/              # Plate.js custom plugins
│   │   │   ├── tiptapui/             # UI components
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── lib/                      # Utility libraries
│   │   │   ├── actions/              # Server actions
│   │   │   ├── ai/                   # AI utilities
│   │   │   ├── auth.tsx              # Better Auth configuration
│   │   │   ├── prisma.ts             # Prisma client
│   │   │   └── utils.ts              # General utilities
│   │   ├── prisma/                   # Database schema & migrations
│   │   │   ├── schema.prisma         # Database schema
│   │   │   └── migrations/           # Migration files
│   │   ├── server/                   # Server-side logic
│   │   ├── styles/                   # Global styles
│   │   ├── hooks/                    # Custom React hooks
│   │   └── utils/                    # Utility functions
│   │
│   └── mobile/                       # Expo React Native app
│       ├── app/                      # Expo Router pages
│       │   ├── (auth)/               # Auth screens
│       │   │   ├── login.tsx
│       │   │   └── signup.tsx
│       │   ├── (tabs)/               # Tab navigation
│       │   │   ├── index.tsx         # Home screen
│       │   │   ├── documents.tsx     # Documents list
│       │   │   └── settings.tsx      # Settings
│       │   └── _layout.tsx           # Root layout
│       ├── components/               # React Native components
│       │   └── ui/                   # UI components
│       ├── hooks/                    # Custom hooks
│       ├── lib/                      # Utilities
│       │   ├── auth-client.ts        # Better Auth client
│       │   ├── next-url.ts           # API base URL
│       │   └── theme.ts              # Theme configuration
│       ├── assets/                   # Images, fonts, etc.
│       └── scripts/                  # Build scripts
│
├── packages/                         # Shared packages (future)
│
├── .tables/                          # Database table configurations
│
├── package.json                      # Root package.json (workspaces)
├── turbo.json                        # Turborepo configuration
├── bun.lock                          # Bun lockfile
└── readme.md                         # This file
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **Bun** 1.3.3+ ([Install Guide](https://bun.sh/docs/installation))
- **Git** for version control

Optional for mobile development:
- **Expo CLI** (`npm install -g expo-cli`)
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/orunos.git
   cd orunos
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the `apps/web` directory:

   ```bash
   # apps/web/.env.local

   # Database
   DATABASE_URL="file:./dev.db"
   PROD="false"

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-here"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Resend (email)
   RESEND_API_KEY="your-resend-api-key"

   # UploadThing (file uploads)
   UPLOADTHING_TOKEN="your-uploadthing-token"

   # AI Providers
   DEEPSEEK_API_KEY="your-deepseek-api-key"
   GROQ_API_KEY="your-groq-api-key"
   OPENAI_API_KEY="your-openai-api-key"

   # Sentry (monitoring)
   SENTRY_ORG="your-sentry-org"
   SENTRY_PROJECT="orunos"
   ```

   For mobile app, create `.env` in `apps/mobile`:

   ```bash
   # apps/mobile/.env
   API_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   cd apps/web
   bun prisma generate
   bun prisma db push
   ```

5. **Run the development servers**

   From the root directory:

   ```bash
   # Run both web and mobile dev servers
   bun dev
   ```

   Or run them separately:

   ```bash
   # Web app only
   cd apps/web
   bun dev

   # Mobile app only
   cd apps/mobile
   bun dev
   ```

6. **Open in browser**

   - Web: [http://localhost:3000](http://localhost:3000)
   - Mobile: Scan QR code from Expo DevTools or open in simulator

---

## Development

### Available Scripts

From the **root directory**:

```bash
bun dev          # Start all development servers
bun build        # Build all applications
bun lint         # Run ESLint on all projects
bun check-types  # Run TypeScript type checking
bun clean        # Clean build artifacts
```

From **apps/web**:

```bash
bun dev          # Start Next.js development server
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
bun check-types  # Type check
bun prisma:generate  # Generate Prisma client
bun prisma:migrate   # Run database migrations
bun email        # Start React Email preview server
```

From **apps/mobile**:

```bash
bun start        # Start Expo development server
bun android      # Run on Android emulator
bun ios          # Run on iOS simulator
bun lint         # Run ESLint
```

### Database Management

```bash
# Generate Prisma Client
cd apps/web
bun prisma generate

# Push schema changes to database
bun prisma db push

# Create a new migration
bun prisma migrate dev --name migration_name

# Reset database
bun prisma migrate reset

# Open Prisma Studio (database GUI)
bun prisma studio
```

### Code Style

The project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (via ESLint) for code formatting

Run linting:

```bash
bun lint
```

---

## Deployment

### Web Application (Next.js)

The web app is configured for deployment on **Vercel** with Sentry monitoring.

1. **Build for production**

   ```bash
   cd apps/web
   bun build
   ```

2. **Deploy to Vercel**

   ```bash
   vercel deploy --prod
   ```

3. **Environment variables**

   Set all environment variables in your Vercel project settings.

### Mobile Application (Expo)

1. **Build for production**

   ```bash
   cd apps/mobile
   eas build --platform ios
   eas build --platform android
   ```

2. **Submit to stores**

   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

### Database (Production)

For production, the app uses **Turso** (LibSQL):

```bash
# Set production database URL
TURSO_DATABASE_URL="libsql://your-db.turso.io"
TURSO_AUTH_TOKEN="your-auth-token"
PROD="true"
```

---

## Database Schema

The application uses the following core entities:

### User Management
- **User** — User accounts with balance
- **Session** — User sessions for authentication
- **Account** — OAuth provider accounts
- **Verification** — Email verification codes

### Document Management
- **Document** — Academic documents with title, content, and status
- **DocType** — Document types (coursework, fieldwork, thesis, etc.)

### Transactions
- **Transaction** — User balance transactions (deposits, withdrawals)

---

## API Reference

### Authentication

- `POST /api/auth/*` — Better Auth endpoints
- `GET /api/auth/session` — Get current session

### Documents

- `GET /api/papers/all` — Fetch all user documents
- `GET /api/papers/fetch` — Fetch specific document
- `POST /api/papers/update` — Update document
- `DELETE /api/papers/delete` — Delete document

### AI

- `POST /api/ai/generate` — Generate content with AI
- `POST /api/ai/command` — Execute AI commands
- `POST /api/ai/copilot` — AI copilot assistance

### File Uploads

- `POST /api/uploadthing` — Upload files

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**

   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to the branch**

   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all linting checks pass

---

## Troubleshooting

### Common Issues

**Database connection errors:**
```bash
# Regenerate Prisma client
cd apps/web
bun prisma generate
bun prisma db push
```

**Mobile app can't connect to API:**
- Ensure both web and mobile servers are running
- Check `API_URL` in mobile `.env`
- For Android emulator, use `http://10.0.2.2:3000`
- For physical devices, use your machine's IP address

**Build errors:**
```bash
# Clean and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
rm bun.lock
bun install
```

---

## License

This project is proprietary software. All rights reserved.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) — React framework
- [Expo](https://expo.dev/) — React Native framework
- [Better Auth](https://better-auth.com/) — Authentication
- [Plate.js](https://platejs.org/) — Rich text editor
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [Prisma](https://www.prisma.io/) — Database ORM
- [Turborepo](https://turbo.build/repo) — Build system
- [Bun](https://bun.sh/) — JavaScript runtime

---

## Support

For support and questions:
- Create an issue on GitHub
- Contact: support@orunos.com

---

*Last updated: February 2026*
