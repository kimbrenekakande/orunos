import prisma from "@/lib/prisma"
import { marked } from "marked"
import { Page, Text, View, Document, Image, Link } from "@react-pdf/renderer";


const doc = `
  # ReactPDF Academic Document Architecture

  ## Overview

  The Orunos platform leverages **ReactPDF** to generate high-quality academic documents from editor content. This document outlines the architecture, data flow, and recommendations for creating robust academic PDF documents using ReactPDF.

  ## Data Flow and Mutations

  ### 1. **Content Flow**

  **Process:**
  1. Editor content is serialized to Markdown using editor.api.markdown.serialize()
  2. Markdown content is passed to the MyDoc component
  3. ReactPDF renders the document with academic styling
  4. PDF is generated and offered for download

  ### 2. **Data Sources**
  - **Title**: From document metadata
  - **Content**: Serialized from Slate.js editor state to Markdown
  - **Author Information**: Fetched from user session
  - **Institutional Data**: Retrieved via API call to /api/institute/fetch

  ### 3. **Mutation Points**
  - **Editor → Markdown**: editor.api.markdown.serialize() transforms Slate document to Markdown string
  - **Markdown → PDF**: ReactPDF components render Markdown content into PDF elements
  - **Dynamic Data Fetching**: Institution data is fetched asynchronously during PDF generation

  ## Academic Document Requirements

  ### 1. **Structural Elements**
  - **Cover Page**: Title, author, institution, date
  - **Abstract**: Concise summary of content
  - **Table of Contents**: Automatic generation of sections and page numbers
  - **Main Content**: Properly formatted sections with headings
  - **References/Bibliography**: Standardized citation format
  - **Appendices**: Supplementary materials

  ### 2. **Typography Standards**
  - **Font**: Times New Roman or similar serif fonts for readability
  - **Size**: 12pt for body text, appropriate scaling for headings
  - **Spacing**: Double spacing for body text, proper margins
  - **Justification**: Justified text alignment for academic appearance

  ### 3. **Layout Requirements**
  - **Margins**: 1-inch margins on all sides
  - **Headers/Footers**: Page numbers, document title, author name
  - **Section Hierarchy**: Clear visual distinction between heading levels
  - **Page Numbering**: Sequential numbering with proper placement

  ## Current Limitations

  ### 1. **Content Parsing**
  - Raw Markdown content is passed directly to PDF renderer
  - No semantic analysis of document structure
  - Limited support for complex academic elements (tables, figures, equations)

  ### 2. **Styling Constraints**
  - Static styling applied to all content
  - No automatic detection of academic sections
  - Limited support for advanced formatting (footnotes, endnotes)

  ### 3. **Performance**
  - Full document regeneration on each download
  - Asynchronous institution data fetching during PDF generation
  - No caching of generated PDFs
`

async function generatePDF() {
  const docux = await prisma.document.findUnique({
    where: {
      id : "cmlp26r5d0000i9ocfqkaostu",
    }
  })
  const tokens = marked.lexer(docux.answer)
  const tagy = tokens.map((token, index) => {
    switch(token.type) {
      case 'text':
        return <Text key={index}>{token.text}</Text>;

      case 'strong':
        return (
          <Text key={index} style={styles.strong}>
            {token.text}
          </Text>
        );

      case 'em':
        return (
          <Text key={index} style={styles.em}>
            {token.text}
          </Text>
        );

      case 'codespan':
        return (
          <Text key={index} style={styles.inlineCode}>
            {token.text}
          </Text>
        );

      case 'link':
        return (
          <Link key={index} src={token.href} style={styles.link}>
            {token.text}
          </Link>
        );

      case 'br':
        return <Text key={index}>{'\n'}</Text>;

      default:
        return <Text key={index}>{token.raw || ''}</Text>;return <Text key={index}>{token.text}</Text>;
    }
  })
  console.log(tagy)
}

generatePDF()


// console.log(tokens)
