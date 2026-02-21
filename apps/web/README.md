# Orunos

**Create Professional Academic Documents with AI**

Orunos is a comprehensive academic document creation platform designed for researchers, students, and academics. Generate well-formatted papers, theses, reports, and publications with AI-assisted writing, automatic citations, and professional PDF export tailored to academic standards.

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

- **Academic Document Editor**: Powered by Plate.js with AI-enhanced features:

  - AI-powered content generation and academic writing suggestions
  - Smart formatting following academic style guides (APA, MLA, Chicago)
  - Tables, figures, and equations with AI assistance
  - Citation management and bibliography generation
  - AI-powered peer review feedback and improvements
  - Mathematical equation editing and generation
  - Automatic table of contents and section numbering
  - Context-aware academic language improvements
  - AI-driven abstract and summary generation

- **Professional PDF Export**:
  - Academic paper formatting with proper margins and typography
  - Thesis and dissertation templates
  - Journal submission-ready layouts
  - Conference paper formats
  - Research poster generation

- **Document Management**:
  - Create, edit, and organize academic documents
  - Version history and revision tracking
  - Export to multiple formats (PDF, DOCX, LaTeX, Markdown)
  - Collaborative writing and co-author support

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
