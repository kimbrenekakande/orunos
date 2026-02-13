# ReactPDF Academic Document Architecture

## Overview

The Orunos platform leverages **ReactPDF** to generate high-quality academic documents from editor content. This document outlines the architecture, data flow, and recommendations for creating robust academic PDF documents using ReactPDF.

## Current Implementation

### Core Components

#### 1. **MyDoc Component** (`/components/editor/doc.tsx`)
The main PDF document generator that creates academic-style documents with institutional branding:

```typescript
export const MyDoc = ({title, content }: MyDocProps) => {
  // Fetches institution data and user session
  // Generates cover page with institutional logo
  // Creates content page with proper academic formatting
}
```

#### 2. **PDF Styles** (`/styles/pdfstyles.ts`)
Comprehensive academic document styling using ReactPDF StyleSheet:

- Cover page layout with institutional branding
- Proper academic typography (Times font family)
- Headers, footers, and page numbering
- Section headings with proper hierarchy
- Table formatting for academic tables
- Bibliography and abstract styling

#### 3. **Integration Point** (`/components/editor/plate-editor.tsx`)
The PDF generation is integrated into the editor UI:

```typescript
<PDFDownloadLink
  document={<MyDoc title={title} content={newData} />}
  fileName={`${title}.pdf`}
>
  Download
</PDFDownloadLink>
```

## Data Flow and Mutations

### 1. **Content Flow**
```
Editor State (Slate.js) → Markdown Serialization → PDF Document Generation → Download
```

**Process:**
1. Editor content is serialized to Markdown using `editor.api.markdown.serialize()`
2. Markdown content is passed to the `MyDoc` component
3. ReactPDF renders the document with academic styling
4. PDF is generated and offered for download

### 2. **Data Sources**
- **Title**: From document metadata
- **Content**: Serialized from Slate.js editor state to Markdown
- **Author Information**: Fetched from user session
- **Institutional Data**: Retrieved via API call to `/api/institute/fetch`

### 3. **Mutation Points**
- **Editor → Markdown**: `editor.api.markdown.serialize()` transforms Slate document to Markdown string
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

## Recommendations for Academic PDF Enhancement

### 1. **Enhanced Content Parsing**

#### A. **Markdown AST Processing**
```typescript
// Process Markdown to identify academic sections
const parseAcademicStructure = (markdown: string) => {
  const ast = parseMarkdown(markdown);
  return {
    abstract: extractAbstract(ast),
    sections: extractSections(ast),
    references: extractReferences(ast),
    figures: extractFigures(ast),
    tables: extractTables(ast)
  };
};
```

#### B. **Semantic Content Recognition**
- Identify abstract sections by keywords ("Abstract", "Summary")
- Recognize headings and create proper hierarchy
- Detect citations and format according to academic standards
- Parse tables and figures with captions

### 2. **Advanced Academic Styling**

#### A. **Enhanced Style Definitions**
```typescript
export const academicStyles = StyleSheet.create({
  // Enhanced academic typography
  body: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    lineHeight: 2,
    textAlign: 'justify',
    marginHorizontal: 72, // 1 inch margins
  },
  
  // Proper heading hierarchy
  h1: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  
  h2: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    marginTop: 20,
    marginBottom: 8,
  },
  
  // Academic-specific elements
  abstract: {
    fontSize: 11,
    lineHeight: 1.6,
    marginVertical: 20,
    textAlign: 'justify',
  },
  
  keywords: {
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20,
  },
  
  // Citation and reference styling
  citation: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
    marginLeft: 20,
    textIndent: -15,
  },
  
  // Table and figure styling
  table: {
    marginVertical: 15,
    width: '100%',
  },
  
  figure: {
    alignItems: 'center',
    marginVertical: 15,
  },
  
  caption: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Times-Italic',
  },
});
```

### 3. **Academic Document Features**

#### A. **Automatic Table of Contents**
```typescript
const TableOfContents = ({ sections }) => (
  <View style={styles.toc}>
    <Text style={styles.tocTitle}>TABLE OF CONTENTS</Text>
    {sections.map((section, index) => (
      <View key={index} style={styles.tocItem}>
        <Text style={styles.tocText}>{section.title}</Text>
        <Text style={styles.tocPageNumber} render={({ pageNumber }) => 
          `${pageNumber + 1}` // Adjust page number based on document structure
        } />
      </View>
    ))}
  </View>
);
```

#### B. **Reference Management**
```typescript
const ReferencesSection = ({ references }) => (
  <View style={styles.references}>
    <Text style={styles.sectionHeading}>References</Text>
    {references.map((ref, index) => (
      <Text key={index} style={styles.citation}>
        [{index + 1}] {formatCitation(ref)}
      </Text>
    ))}
  </View>
);
```

### 4. **Performance Optimization**

#### A. **PDF Caching Strategy**
```typescript
// Cache generated PDFs to avoid regeneration
const cachePDF = async (documentId: string, pdfBlob: Blob) => {
  // Store in browser cache or temporary server storage
  const cacheKey = `pdf_${documentId}`;
  localStorage.setItem(cacheKey, await blobToBase64(pdfBlob));
};

const getCachedPDF = (documentId: string) => {
  const cacheKey = `pdf_${documentId}`;
  const cached = localStorage.getItem(cacheKey);
  return cached ? base64ToBlob(cached) : null;
};
```

#### B. **Progressive Rendering**
```typescript
// Render document in chunks for better performance
const ProgressiveDocument = ({ content, chunkSize = 1000 }) => {
  const chunks = splitContentIntoChunks(content, chunkSize);
  
  return (
    <Document>
      {chunks.map((chunk, index) => (
        <Page key={index} style={styles.page}>
          <Text style={styles.content}>{chunk}</Text>
        </Page>
      ))}
    </Document>
  );
};
```

### 5. **Academic Compliance Features**

#### A. **Citation Standards**
Support for major academic citation styles:
- APA (American Psychological Association)
- MLA (Modern Language Association)
- Chicago/Turabian
- IEEE
- Vancouver

#### B. **Document Templates**
Predefined templates for common academic document types:
- Research papers
- Theses and dissertations
- Conference papers
- Lab reports
- Literature reviews

#### C. **Accessibility Features**
- Proper semantic structure for screen readers
- High contrast options
- Alternative text for figures
- Logical reading order

### 6. **Enhanced PDF Generation Workflow**

#### A. **Improved Data Flow**
```
Editor Content → Semantic Analysis → Academic Structure → Styled PDF → Download/Export
```

#### B. **Validation Layer**
```typescript
// Validate academic document structure before PDF generation
const validateAcademicDocument = (content: string) => {
  const issues = [];
  
  // Check for required sections
  if (!hasAbstract(content)) {
    issues.push("Abstract section is missing");
  }
  
  if (!hasReferences(content)) {
    issues.push("References section is missing");
  }
  
  // Check citation format
  const citations = extractCitations(content);
  if (!areCitationsValid(citations)) {
    issues.push("Citations are not properly formatted");
  }
  
  return issues;
};
```

### 7. **Implementation Roadmap**

#### Phase 1: Core Enhancements
- [ ] Implement semantic content parsing
- [ ] Add academic-specific styling
- [ ] Create document templates
- [ ] Add citation formatting support

#### Phase 2: Advanced Features
- [ ] Automatic TOC generation
- [ ] Reference management system
- [ ] Figure and table captions
- [ ] Cross-references support

#### Phase 3: Performance & Compliance
- [ ] PDF caching mechanism
- [ ] Accessibility compliance
- [ ] Multiple citation style support
- [ ] Validation and error reporting

## Best Practices for Academic PDF Generation

### 1. **Content Preparation**
- Ensure proper document structure before PDF generation
- Validate citations and references
- Format tables and figures appropriately
- Include required academic sections

### 2. **Styling Consistency**
- Maintain consistent typography throughout
- Follow academic formatting guidelines
- Use appropriate spacing and margins
- Ensure proper heading hierarchy

### 3. **Performance Considerations**
- Optimize for large document generation
- Implement caching strategies
- Provide progress indicators
- Handle errors gracefully

### 4. **Quality Assurance**
- Test with various document types
- Validate generated PDFs for compliance
- Ensure cross-platform compatibility
- Verify accessibility features

## Using Markdown Content from Database for Well-Designed Academic Documents

### 1. **Markdown Content Structure Analysis**

The Markdown content stored in the database's `answer` field follows standard Markdown syntax but needs to be parsed and transformed for proper academic document presentation. Here's how to leverage this content effectively:

#### A. **Content Parsing Strategy**

```typescript
// Parse the Markdown content from the database
const parseDBContent = (dbContent: string) => {
  // STEP 1: Extract document sections based on Markdown headings
  // This splits the content by headings (H1, H2, H3, etc.) to identify different sections
  const sections = extractSectionsFromMarkdown(dbContent);
  
  // STEP 2: Identify academic elements like abstract, references, etc.
  // This looks for specific academic elements within the content
  const academicElements = identifyAcademicElements(sections);
  
  // STEP 3: Transform raw Markdown to structured academic content
  // Convert the parsed elements into a format suitable for academic PDF generation
  return transformToAcademicStructure(academicElements);
};
```

#### B. **Academic Element Recognition**
- **Abstract Detection**: Look for "# Abstract" or "# Summary" headings - These are typically the first major section after the title
- **Section Identification**: Parse H1/H2/H3 headings to create document structure - H1 for main sections, H2 for subsections, H3 for minor sections
- **Figure/Equation Captions**: Identify `![caption](image)` and `$$equation$$` patterns - These are special Markdown syntaxes for figures and mathematical expressions
- **Citation Parsing**: Recognize `[citation]` patterns and convert to academic format - Different academic styles have different citation formats
- **Table Recognition**: Parse Markdown tables for academic presentation - Tables in Markdown use | and - to create grid structures

### 2. **Content Transformation Pipeline**

#### A. **Raw Markdown → Academic Structure**

```typescript
// Enhanced MyDoc component to process DB content
export const EnhancedMyDoc = ({ title, content }: MyDocProps) => {
  // STEP 1: Parse the raw Markdown from database using useMemo for performance
  // useMemo ensures the parsing only happens when content changes
  const parsedContent = useMemo(() => 
    parseAcademicMarkdown(content), [content]  // Dependency array ensures re-parsing only when content changes
  );
  
  // STEP 2: Destructure the parsed content into specific academic elements
  const {
    abstract,      // The abstract section of the document
    sections,      // Main content sections
    references,    // Bibliography/references section
    figures,       // Figures with captions
    tables,        // Data tables
    equations      // Mathematical equations
  } = parsedContent;

  return (
    <Document>
      {/* Cover page - Always the first page of academic documents */}
      <CoverPage title={title} />
      
      {/* Abstract page - Academic documents typically have an abstract */}
      {abstract && <AbstractPage content={abstract} />}
      
      {/* Table of Contents - Helps readers navigate the document */}
      <TOCPage sections={sections} />
      
      {/* Main content pages - The bulk of the academic document */}
      <ContentPages 
        sections={sections}    // Main content sections
        references={references} // References/bibliography
        figures={figures}      // Figures with captions
        tables={tables}        // Data tables
        equations={equations}  // Mathematical equations
      />
    </Document>
  );
};
```

#### B. **Semantic Content Processing**

```typescript
// Process Markdown content to identify academic semantics
const parseAcademicMarkdown = (rawMarkdown: string) => {
  // STEP 1: Split content by headings to identify sections
  // The regex /^(#{1,6})\s+(.*?)$/gm matches Markdown headings
  // ^ - Start of line
  // (#{1,6}) - Capture group 1: 1-6 hash symbols (H1 to H6)
  // \s+ - One or more whitespace characters
  // (.*?) - Capture group 2: The heading text (non-greedy)
  // $ - End of line
  // g - Global flag (find all matches)
  // m - Multiline flag (treat each line separately)
  const parts = rawMarkdown.split(/^(#{1,6})\s+(.*?)$/gm);
  
  let currentSection = null;
  const sections = [];
  // Initialize an object to store different academic elements
  const academicElements = {
    abstract: null,      // Will hold the abstract content
    sections: [],       // Array of document sections
    references: [],     // Array of references
    figures: [],        // Array of figures
    tables: [],         // Array of tables
    equations: []       // Array of equations
  };

  // STEP 2: Process each part to categorize content
  // The split creates groups of [full_match, hashes, heading_text, content_after_heading]
  // So we process every 3 elements (hashes, heading_text, content)
  for (let i = 0; i < parts.length; i += 3) {
    // Get the heading level by counting the number of hash symbols
    // parts[i] contains the hash symbols (e.g., "###")
    const headingLevel = parts[i]?.length || 0;
    
    // Get the heading text (e.g., "Introduction")
    const headingText = parts[i + 1] || '';
    
    // Get the content that comes after this heading (until the next heading)
    const content = parts[i + 2] || '';

    // STEP 3: Identify special academic sections based on heading text
    if (headingText.toLowerCase().includes('abstract')) {
      // If the heading contains 'abstract', store the content as abstract
      academicElements.abstract = content.trim(); // trim() removes extra whitespace
    } else if (headingText.toLowerCase().includes('references') || 
               headingText.toLowerCase().includes('bibliography')) {
      // If the heading is 'references' or 'bibliography', parse the references
      academicElements.references = parseReferences(content);
    } else if (headingLevel <= 3) { // Major sections (H1, H2, H3)
      // For major headings, create a section object
      sections.push({
        level: headingLevel,              // Heading level (1, 2, or 3)
        title: headingText,               // The section title
        content: content,                 // The content under this heading
        id: generateSectionId(headingText) // Unique ID for table of contents
      });
    }
    
    // STEP 4: Extract figures, tables, equations from content
    // These helper functions scan the content for specific patterns
    academicElements.figures.push(...extractFigures(content));
    academicElements.tables.push(...extractTables(content));
    academicElements.equations.push(...extractEquations(content));
  }

  return academicElements;
};
```

### 3. **Design Principles for Academic Documents**

#### A. **Visual Hierarchy from Markdown Structure**
- **H1 Headings** → Major section titles (larger font, bold, proper spacing) - Typically Introduction, Methods, Results, Discussion, Conclusion
- **H2 Headings** → Subsection titles (medium font, bold) - Subdivisions within major sections
- **H3+ Headings** → Minor section titles (smaller font, bold or italic) - Detailed subsections
- **Lists** → Proper indentation and bullet/number formatting - For ordered/unordered lists
- **Code blocks** → Monospace font with proper background - For programming code or technical notation
- **Blockquotes** → Indented with distinctive styling - For quotes or abstract-like content

#### B. **Typography Rules Based on Markdown Elements**

```typescript
// Style mapping based on Markdown elements
// This creates a bridge between Markdown syntax and PDF styling
const markdownToPdfStyles = {
  // Headings - Different levels have different visual importance
  h1: styles.heading1,      // Main section headers (Introduction, Methods, etc.)
  h2: styles.heading2,      // Subsection headers (Materials, Procedures, etc.)
  h3: styles.heading3,      // Minor headers (Equipment, Calculations, etc.)
  
  // Text elements - Different emphasis styles
  paragraph: styles.paragraph,  // Regular body text
  emphasis: styles.italic,      // *italic* text
  strong: styles.bold,          // **bold** text
  
  // Lists - Proper formatting for academic documents
  listItem: styles.listItem,           // Container for list items
  listItemBullet: styles.listItemBullet, // Bullet points or numbers
  
  // Special elements - Academic-specific formatting
  blockquote: styles.abstract, // Often used for abstracts or important quotes
  code: styles.codeBlock,      // Technical code or notation
  table: styles.table,         // Data tables with proper borders
  figure: styles.figure        // Figures with captions
};
```

### 4. **Enhanced Content Processing Techniques**

#### A. **Smart Content Segmentation**

```typescript
// Segment content based on academic document standards
// This function breaks down the Markdown content into logical academic sections
const segmentAcademicContent = (markdown: string) => {
  // Initialize an array to hold different content segments
  const segments = [];
  // Split the content into individual lines for processing
  const lines = markdown.split('\n');
  
  // Start with a default segment type called 'prologue'
  // This captures content before the first major heading
  let currentSegment = { type: 'prologue', content: [] };
  
  // Loop through each line to identify segment boundaries
  for (const line of lines) {
    // CHECK 1: Is this line an Abstract heading?
    if (line.startsWith('# Abstract')) {
      // If we were in a previous segment, save it before starting the abstract
      if (currentSegment.type !== 'prologue') {
        segments.push(currentSegment);
      }
      // Start a new segment specifically for the abstract
      currentSegment = { type: 'abstract', content: [] };
    } 
    // CHECK 2: Is this line a major heading (H1 or H2)?
    else if (line.startsWith('# ') || line.startsWith('## ')) {
      // If we were in a prologue or abstract, save it before starting a new section
      if (currentSegment.type !== 'prologue' && currentSegment.type !== 'abstract') {
        segments.push(currentSegment);
      }
      // Start a new section segment, including the heading line
      currentSegment = { type: 'section', content: [line] };
    } 
    // CHECK 3: Is this line a References or Bibliography heading?
    else if (line.startsWith('# References') || line.startsWith('# Bibliography')) {
      // Save the current segment before starting the references section
      if (currentSegment.type !== 'prologue' && currentSegment.type !== 'abstract') {
        segments.push(currentSegment);
      }
      // Start a new segment for references
      currentSegment = { type: 'references', content: [] };
    } 
    // DEFAULT: Add the line to the current segment
    else {
      currentSegment.content.push(line);
    }
  }
  
  // After processing all lines, save the final segment if it has content
  if (currentSegment.content.length > 0) {
    segments.push(currentSegment);
  }
  
  return segments;
};
```

#### B. **Academic Formatting Application**

```typescript
// Apply academic formatting based on content segments
// This function takes the segmented content and applies appropriate ReactPDF formatting
const formatAcademicContent = (segments: any[]) => {
  // Map each segment to its appropriate ReactPDF component with academic styling
  return segments.map(segment => {
    // Use a switch statement to handle different segment types
    switch (segment.type) {
      // CASE 1: Abstract segment
      case 'abstract':
        // Format the abstract with specific academic styling
        return (
          <View style={styles.abstract}>
            <Text style={styles.abstractText}>
              {/* Join the content lines back together with newlines */}
              {segment.content.join('\n')}
            </Text>
          </View>
        );
        
      // CASE 2: Section segment (contains headings and content)
      case 'section':
        // Separate the heading line from the rest of the content
        const [header, ...body] = segment.content;
        // Count the number of # symbols to determine heading level
        const level = (header.match(/^#+/) || [''])[0].length;
        // Extract just the title text (remove the # symbols and spaces)
        const title = header.replace(/^#+\s*/, '');
        
        // Return a formatted section with proper heading hierarchy
        return (
          <View style={styles.section}>
            {/* Apply appropriate heading style based on level */}
            <Text style={getHeadingStyle(level)}>{title}</Text>
            {/* Format the body content as paragraphs */}
            <Text style={styles.paragraph}>{body.join('\n')}</Text>
          </View>
        );
        
      // CASE 3: References segment
      case 'references':
        // Format references with numbered list styling
        return (
          <View style={styles.bibliography}>
            <Text style={styles.sectionHeading}>References</Text>
            {/* Map each reference to a formatted citation */}
            {segment.content.map((ref, idx) => (
              <Text key={idx} style={styles.citation}>
                {/* Add sequential numbering to each reference */}
                {idx + 1}. {ref}
              </Text>
            ))}
          </View>
        );
        
      // DEFAULT CASE: Handle any other content type
      default:
        // Format as regular text with standard academic styling
        return (
          <Text style={styles.text}>
            {segment.content.join('\n')}
          </Text>
        );
    }
  });
};
```

### 5. **Database Content Optimization Strategies**

#### A. **Pre-processing Before Storage**

```typescript
// Enhance content before saving to database for better PDF generation
// This function prepares the content to be more academic-document-friendly
const preprocessForAcademicPDF = (content: string) => {
  // STEP 1: Ensure proper academic structure
  // This adds semantic markers to help with later parsing
  let processed = ensureAcademicStructure(content);
  
  // STEP 2: Standardize citation formats
  // Convert various citation styles to a consistent format
  processed = standardizeCitations(processed);
  
  // STEP 3: Add semantic markers for academic elements
  // This makes it easier to identify different sections later
  processed = addAcademicMarkers(processed);
  
  return processed;
};

// Example: Ensure abstract is properly marked
const ensureAcademicStructure = (content: string) => {
  // Check if the content already has an abstract heading
  if (!content.toLowerCase().includes('abstract')) {
    // If no abstract heading found, look for abstract-like content
    // This regex looks for "abstract" or "summary" followed by content until the next heading
    // /i - Case insensitive
    // /s - Dot matches newline characters too
    const abstractPattern = /(abstract|summary).*?\n\n([^#]+)/is;
    const match = content.match(abstractPattern);
    
    if (match) {
      // If we found abstract-like content, wrap it in proper heading
      return content.replace(match[0], `# Abstract\n\n${match[2]}\n\n`);
    }
  }
  
  return content;
};
```

#### B. **Content Enrichment Pipeline**

```typescript
// Pipeline to enrich DB content for better academic presentation
// This is a functional programming approach using array.reduce
const contentEnrichmentPipeline = (dbContent: string) => {
  // Apply a series of transformations to the content
  // Each function in the array takes the content and returns a modified version
  return [
    normalizeHeadings,      // Ensure consistent heading hierarchy (fix malformed headings)
    expandAbbreviations,    // Expand academic abbreviations (e.g., "et al." stays, but expand others)
    validateCitations,      // Check citation format validity and fix common issues
    enhanceFigures,         // Add proper figure captions and formatting
    formatEquations,        // Improve equation presentation and formatting
    generateTOCData         // Prepare data for table of contents generation
  ].reduce((content, fn) => fn(content), dbContent); // Start with dbContent and apply each function
  // The reduce function works like: fn3(fn2(fn1(dbContent)))
};
```

### 6. **Best Practices for Database Content to PDF Conversion**

#### A. **Content Structure Guidelines**
- Use consistent heading hierarchy (# H1, ## H2, ### H3) - This creates a logical document structure
- Include semantic section markers (Abstract, Introduction, Methodology, Results, Discussion, Conclusion, References) - These help identify academic sections
- Format citations consistently ([Author, Year] or [1], [2], etc.) - Consistent citations are crucial for academic documents
- Use proper Markdown for tables, code blocks, and lists - Proper syntax ensures correct parsing

#### B. **Academic Formatting Standards**
- Apply double spacing to body text - Standard in many academic institutions
- Use justified text alignment - Professional appearance for printed documents
- Maintain 1-inch margins - Standard academic formatting requirement
- Include proper page numbering - Essential for academic document navigation
- Add headers with document title and page numbers - Professional document structure

#### C. **Performance Considerations**
- Pre-process content during save operations - Don't do heavy processing during PDF generation
- Cache parsed academic structures - Store processed content to avoid repeated parsing
- Use efficient parsing algorithms for large documents - Optimize for performance with big documents
- Implement progressive rendering for long documents - Show content as it's generated

### 7. **Implementation Example: Enhanced MyDoc Component**

```typescript
// Import necessary ReactPDF components
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
// Import the academic styling
import { styles } from "@/styles/pdfstyles";
// Import authentication client for user information
import { authClient } from "@/lib/auth-client";
// Import base URL for API calls
import baseUrl from "@/lib/base-url";
// Import React hooks for state management and optimization
import { useEffect, useState, useMemo } from "react";
// Import the type definitions
import { MyDocProps } from "@/lib/types";

// Enhanced academic content processor using React's useMemo hook
// useMemo caches the result and only recalculates when dependencies change
const useAcademicContent = (rawContent: string) => {
  return useMemo(() => {
    // STEP 1: Parse and structure the raw Markdown content
    // This converts the flat Markdown string into a structured object
    const parsed = parseAcademicMarkdown(rawContent);
    
    // STEP 2: Apply academic formatting rules
    // This converts the structured data into ReactPDF components
    const formatted = formatAcademicContent(parsed);
    
    // Return the formatted content ready for PDF rendering
    return formatted;
  }, [rawContent]); // Only recalculate when rawContent changes
};

// Helper function to fetch institution data
// This is used to get the institution logo and name for the cover page
async function fetchInstitutionData(instID: string) {
  // Make an API call to fetch institution information
  const res = await fetch(`${baseUrl}/api/institute/fetch?id=${instID}`);
  return res.json();
}

// The main component that generates the academic PDF document
export const EnhancedMyDoc = ({ title, content }: MyDocProps) => {
  // State to store institution information
  const [institution, setInstitution] = useState(null);
  
  // Get user session data using the auth client
  const { data: sessionData, isPending, error } = authClient.useSession();
  // Extract the author information from the session
  const author = sessionData?.user;
  // Get the institution ID from the user data
  const id = Number(author?.institutionId);
  
  // Process the content using our custom hook
  // This parses and formats the academic content
  const academicContent = useAcademicContent(content);

  // Effect hook to fetch institution data when the ID is available
  useEffect(() => {
    // Only fetch if we have a valid institution ID
    if (id) {
      // Fetch the institution data and update the state
      fetchInstitutionData(id.toString()).then(setInstitution);
    }
  }, [id]); // Only run when the ID changes

  // Return the complete PDF document structure
  return (
    <Document>
      {/* Enhanced cover page with institutional branding */}
      <Page style={styles.cover}>
        {/* Conditionally render the institution logo if available */}
        {institution?.logo && (
          <Image style={styles.image} src={institution.logo} />
        )}
        {/* Institution name - fallback to placeholder if not available */}
        <Text style={styles.institutionName}>
          {institution?.name || "Institution Name"}
        </Text>
        {/* Document title */}
        <Text style={styles.coverTitle}>{title}</Text>
        {/* Author name - fallback to placeholder if not available */}
        <Text style={styles.authorInfo}>
          {author?.name || "Author Name"}
        </Text>
        {/* Author email - fallback to placeholder if not available */}
        <Text style={styles.authorInfo}>
          {author?.email || "Author Email"}
        </Text>
        {/* Current date for the document */}
        <Text style={styles.authorInfo}>
          {new Date().toLocaleDateString()}
        </Text>
      </Page>

      {/* Academic content pages */}
      <Page size="A4" style={styles.page}>
        {/* Header that appears on every page */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        
        {/* Render the processed academic content */}
        {academicContent}
        
        {/* Page number that appears on every page */}
        <Text 
          style={styles.pageNo} 
          // Render function provides the current page number
          render={({ pageNumber }) => `${pageNumber}`}
          // Fixed means this element appears on every page
          fixed
        />
      </Page>
    </Document>
  );
};
```

## Conclusion

The current ReactPDF implementation in Orunos provides a solid foundation for academic document generation. However, enhancing it with semantic content analysis, academic-specific styling, and compliance features will significantly improve the quality and usability of generated academic documents. The recommended enhancements focus on creating professional-grade academic PDFs that meet institutional and publication standards.

By leveraging the Markdown content stored in the database through intelligent parsing and academic formatting, the system can generate well-structured, professionally formatted academic documents that meet the rigorous standards required for scholarly work. The key is to transform the raw Markdown into semantically rich academic content that preserves the author's intent while applying proper academic formatting conventions.

The detailed explanations and commented code examples above provide a comprehensive guide to understanding how to parse and transform Markdown content from the database into well-designed academic documents. This approach ensures that the content maintains its academic integrity while being presented in a professional format suitable for scholarly purposes.

## Conclusion

The current ReactPDF implementation in Orunos provides a solid foundation for academic document generation. However, enhancing it with semantic content analysis, academic-specific styling, and compliance features will significantly improve the quality and usability of generated academic documents. The recommended enhancements focus on creating professional-grade academic PDFs that meet institutional and publication standards.

By leveraging the Markdown content stored in the database through intelligent parsing and academic formatting, the system can generate well-structured, professionally formatted academic documents that meet the rigorous standards required for scholarly work. The key is to transform the raw Markdown into semantically rich academic content that preserves the author's intent while applying proper academic formatting conventions.