import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { marked, type Token } from "marked";
import fs from "node:fs/promises";

// type 

// 1. Tokenize Markdown into an Abstract Syntax Tree (AST)
const markdown = `
# Quarterly Engineering Report

This document was converted from **Markdown** into a styled Word document. The conversion 
pipeline was built using a custom tokenizer-to-DOCX mapper that preserves semantic structure 
while applying our brand's visual identity.

### Highlights
- Custom typography & brand colors
- Automatic headings & line spacing
- Bullet lists and numbered lists with nested indentation
- Bold and italic inline formatting preserved from source Markdown

### Background
The engineering team wanted a lightweight, reproducible way to generate on-brand Word 
documents directly from Markdown source files. This approach eliminates manual formatting 
in Microsoft Word and ensures every report, spec, and RFC follows the same style guide.

### Approach
1. **Parse** the Markdown source into an abstract syntax tree using \`marked\`.
2. **Transform** each AST node into the corresponding \`docx.js\` paragraph, text run, or table element.
3. **Assemble** the elements into a \`Document\` with centralized paragraph and heading styles.
4. **Export** the final buffer as a \`.docx\` file ready for distribution.

### Next Steps
- Add support for tables and code blocks
- Integrate with the CI pipeline so docs are rebuilt on every push
- Explore a browser-based preview using \`docx-preview\`
`;


// 1. Tokenize into marked AST
const tokens = marked.lexer(markdown);

// console.log(tokens)
for (const token of tokens) {
  if (token.type === "list") console.log(token.items)
}



// // 2. Map Markdown tokens to native DOCX elements
// function tokensToDocx(tokens : ) {
//   return tokens.flatMap((token) => {
//     switch (token.type) {
//       case "heading":
//         return new Paragraph({
//           text: token.text,
//           heading: HeadingLevel[`HEADING_${token.depth}`],
//         });

//       case "paragraph":
//         return new Paragraph({
//           children: token.tokens.map((t) => {
//             return new TextRun({
//               text: t.text || t.raw,
//               bold: t.type === "strong",
//               italics: t.type === "em",
//             });
//           }),
//           spacing: { after: 160 },
//         });

//       default:
//         return [];
//     }
//   });
// }

// // 3. Define central Word Document styles
// const doc = new Document({
//   styles: {
//     paragraphStyles: [
//       {
//         id: "Normal",
//         name: "Normal",
//         run: { font: "Arial", size: 22, color: "333333" }, // 11pt
//       },
//       {
//         id: "Heading1",
//         name: "Heading 1",
//         run: { font: "Arial", size: 32, bold: true, color: "0F172A" }, // 16pt
//         paragraph: { spacing: { before: 280, after: 120 } },
//       },
//     ],
//   },
//   sections: [
//     {
//       properties: {
//         page: {
//           margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 inch = 1440 twips
//         },
//       },
//       children: tokensToDocx(tokens),
//     },
//   ],
// });

// // 4. Save file
// const buffer = await Packer.toBuffer(doc);
// await fs.writeFile("custom_styled.docx", buffer);