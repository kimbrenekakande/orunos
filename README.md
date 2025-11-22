# orunos
Your AI Study Buddy - A comprehensive academic platform designed to help students complete coursework and focus on learning. Orunos combines powerful AI-assisted writing, citation tools, and learning resources to create an all-in-one academic companion.A modern web application built with Next.js, featuring a rich text editor and document management system. This project leverages a modern tech stack to provide a powerful and responsive user experience.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS with custom theming
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Rich Text Editing**: Plate.js (Slate-based editor) with AI-powered features
- **AI Integration**: AI SDK with DeepSeek and other AI providers
- **Database**: Prisma ORM with SQLite (PostgreSQL for production)
- **Authentication**: NextAuth.js (implied by project structure)
- **File Uploads**: UploadThing
- **UI Components**: Radix UI Primitives
- **Icons**: Lucide Icons and Tabler Icons
- **Date Handling**: date-fns
- **Charts**: Recharts
- **PDF Generation**: @react-pdf/renderer and pdf-lib
- **Animations**: Framer Motion and GSAP

## Key Features

- **Rich Text Editor**: Powered by Plate.js with AI-enhanced features:

  - AI-powered content generation and suggestions
  - Smart formatting and style recommendations
  - Tables, lists, and code blocks with AI assistance
  - Media embeds (images, videos) with AI-generated captions
  - AI-powered comments and collaboration features
  - Mathematical equation solving and generation
  - Document structure with AI-generated table of contents
  - Context-aware content improvements
  - AI-driven content summarization

- **Document Management**:

  - Create, edit, and organize documents
  - Version history
  - Export to multiple formats (PDF, DOCX, Markdown)

- **User Interface**:
  - Responsive design
  - Dark/light mode
  - Accessible components
  - Keyboard shortcuts

## Getting Started

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/orunos.git
   cd orunos
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Update the environment variables as needed
   ```

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `dev`: Start the development server
- `build`: Build the application for production
- `start`: Start the production server
- `lint`: Run ESLint
- `prisma:generate`: Generate Prisma client
- `prisma:migrate`: Run database migrations

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

---

_NOTE: This README was generated with AI assistance._
