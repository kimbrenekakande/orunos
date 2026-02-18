import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { marked } from 'marked';

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
  },
  h1: {
    fontSize: 24,
    marginBottom: 12,
    marginTop: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  h2: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#2a2a2a',
  },
  h3: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#3a3a3a',
  },
  h4: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#4a4a4a',
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  strong: {
    fontFamily: 'Helvetica-Bold',
  },
  em: {
    fontFamily: 'Helvetica-Oblique',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline',
  },
  list: {
    marginBottom: 10,
    marginLeft: 20,
  },
  listItem: {
    marginBottom: 4,
    flexDirection: 'row',
  },
  listBullet: {
    width: 15,
  },
  listContent: {
    flex: 1,
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 25,
    alignItems: 'center',
  },
  tableHeaderRow: {
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 2,
    borderBottomColor: '#9ca3af',
    fontFamily: 'Helvetica-Bold',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  codeBlock: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Courier',
    fontSize: 9,
    borderRadius: 3,
  },
  inlineCode: {
    backgroundColor: '#f3f4f6',
    fontFamily: 'Courier',
    fontSize: 9,
    padding: 2,
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#d1d5db',
    paddingLeft: 15,
    marginBottom: 10,
    fontFamily: 'Helvetica-Oblique',
    color: '#6b7280',
  },
  hr: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
});

// Render inline tokens (bold, italic, links, etc.)
const renderInlineTokens = (tokens) => {
  if (!tokens) return null;
  
  return tokens.map((token, index) => {
    switch (token.type) {
      case 'text':
        return <Text key={index}>{token.text}</Text>;
      
      case 'strong':
        return (
          <Text key={index} style={styles.strong}>
            {renderInlineTokens(token.tokens)}
          </Text>
        );
      
      case 'em':
        return (
          <Text key={index} style={styles.em}>
            {renderInlineTokens(token.tokens)}
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
        return <Text key={index}>{token.raw || ''}</Text>;
    }
  });
};

// Render block-level tokens
const renderToken = (token, index) => {
  switch (token.type) {
    case 'heading':
      const headingStyle = styles[`h${token.depth}`] || styles.h4;
      return (
        <Text key={index} style={headingStyle}>
          {renderInlineTokens(token.tokens)}
        </Text>
      );
    
    case 'paragraph':
      return (
        <Text key={index} style={styles.paragraph}>
          {renderInlineTokens(token.tokens)}
        </Text>
      );
    
    case 'list':
      return (
        <View key={index} style={styles.list}>
          {token.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.listItem}>
              <Text style={styles.listBullet}>
                {token.ordered ? `${itemIndex + 1}.` : '•'}
              </Text>
              <View style={styles.listContent}>
                {renderInlineTokens(item.tokens)}
              </View>
            </View>
          ))}
        </View>
      );
    
    case 'table':
      return (
        <View key={index} style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            {token.header.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.tableCell}>
                {renderInlineTokens(cell.tokens)}
              </Text>
            ))}
          </View>
          {/* Table Rows */}
          {token.rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.tableCell}>
                  {renderInlineTokens(cell.tokens)}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
    
    case 'code':
      return (
        <View key={index} style={styles.codeBlock}>
          <Text>{token.text}</Text>
        </View>
      );
    
    case 'blockquote':
      return (
        <View key={index} style={styles.blockquote}>
          {token.tokens.map((t, i) => renderToken(t, i))}
        </View>
      );
    
    case 'hr':
      return <View key={index} style={styles.hr} />;
    
    case 'space':
      return null;
    
    default:
      return null;
  }
};

// Main PDF Document Component
const MarkdownPDFDocument = ({ markdown }) => {
  // Parse markdown to tokens
  const tokens = marked.lexer(markdown);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {tokens.map((token, index) => renderToken(token, index))}
      </Page>
    </Document>
  );
};

// Example usage component
const ExampleUsage = () => {
  const markdownFromDB = `
# Main Title

This is a paragraph with **bold text** and *italic text* and a [link](https://example.com).

## Section 2

Here's a table:

| Name | Age | City |
|------|-----|------|
| John | 25 | NYC |
| Jane | 30 | LA |
| Bob | 35 | Chicago |

### Subsection

- Bullet point 1
- Bullet point 2
- Bullet point 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3

#### Code Example

\`\`\`javascript
const hello = 'world';
console.log(hello);
\`\`\`

> This is a blockquote with some important information.

Inline code: \`const x = 10;\`

---

That's all folks!
  `;

  return <MarkdownPDFDocument markdown={markdownFromDB} />;
};

export { MarkdownPDFDocument, ExampleUsage };
export default MarkdownPDFDocument;
