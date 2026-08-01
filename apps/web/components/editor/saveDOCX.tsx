import {
  HeadingLevel,
  Document,
  Packer,
  Paragraph, TextRun,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  convertMillimetersToTwip,
  AlignmentType,
  Header,
  PageNumber
} from "docx";
import { marked, type Token } from "marked";


// Generate a .docx file from markdown content and trigger a browser download.

export async function createAndDownloadDocx(content: string, title = "document.docx") {

  // Parse markdown to tokens 
  const tree: Token[] = marked.lexer(content);
  console.log("-------THE TREE------")
  console.log(tree)
  console.log(tree)


  // Helper: recursively convert marked inline tokens to docx TextRun[]
  // Key rule: if a token has .tokens, recurse into them (parent .text is raw with **)
  // If it's a leaf, use .text (clean, no markdown markers)
  function inlineToRuns(tokens: any[]): TextRun[] {
    return tokens.flatMap((t: any) => {
      // Has children? Ignore parent's raw .text — recurse into kids
      if (t.tokens?.length > 0) {
        return inlineToRuns(t.tokens);
      }
      // Leaf token — use clean .text
      switch (t.type) {
        case "text":
          return new TextRun({ text: t.text });
        case "strong":
          return new TextRun({ text: t.text, bold: true });
        case "em":
          return new TextRun({ text: t.text, italics: true });
        case "del":
          return new TextRun({ text: t.text, strike: true });
        case "codespan":
          return new TextRun({ text: t.text, font: "Courier New" });
        case "html":
          return [];
        case "escape":
          return new TextRun({ text: t.text });
        case "br":
          return new TextRun({ break: 1 });
        default:
          return [];
      }
    });
  }
  
  // traverse the tokens tree to docx primitives
  function tokensToDocx(Tree: Token[]) {
    // APA tables use horizontal rules only — no vertical/grid lines
    const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const thinRule = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
    
    const br = []
    return Tree.flatMap((token) => {
      switch (token.type) {
        // headings 
        case "heading": 
          return new Paragraph({
            text: token.text,
            heading: HeadingLevel[`HEADING_${token.depth}` as keyof typeof HeadingLevel],
            spacing: {
              before: 240,
              after : 120
            },
            // keepLines: true,
            // keepNext : true,
          })
        
        // body text
        case "paragraph":
          return new Paragraph({
            children: token.tokens ? inlineToRuns(token.tokens) : token.text,
            indent: {
              // firstLine : 720, //first paragraph line indent 
            },
            // keepLines: true,
          })

        // list
        case "list":
          return token.items.map((i : any ) => {
            return new Paragraph({
              children: i.tokens ? inlineToRuns(i.tokens) : undefined,
              bullet: { level: 0 },
            })
          })

        // table case — APA-style: horizontal rules only, bold header, clean spacing
        case "table": {
          const colCount = token.header.length;
          const cellWidth = Math.floor(100 / colCount);

          const cellMargins = {
            top: convertMillimetersToTwip(1.2),
            bottom: convertMillimetersToTwip(1.2),
            left: convertMillimetersToTwip(2.5),
            right: convertMillimetersToTwip(2.5),
          };

          const makeHeaderCell = (text: string) =>
            new TableCell({
              children: [new Paragraph({ text, bold: true, alignment: AlignmentType.LEFT, spacing: { before: 0, after: 0, line: 240 } })],
              width: { size: cellWidth, type: WidthType.PERCENTAGE },
              margins: cellMargins,
              borders: {
                top: noBorder,
                bottom: thinRule,
                left: noBorder,
                right: noBorder,
              },
            });

          const makeBodyCell = (text: string) =>
            new TableCell({
              children: [new Paragraph({ text, alignment: AlignmentType.LEFT, spacing: { before: 0, after: 0, line: 240 } })],
              width: { size: cellWidth, type: WidthType.PERCENTAGE },
              margins: cellMargins,
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
            });

          const headerRow = new TableRow({
            children: token.header.map((r: any) => makeHeaderCell(r.text)),
          });

          const bodyRows = (token.rows ?? []).map(
            (row: any) =>
              new TableRow({
                children: row.map((r: any) => makeBodyCell(r.text)),
              }),
          );

          return new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: thinRule,
              bottom: thinRule,
              left: noBorder,
              right : noBorder,
            },
            rows: [headerRow, ...bodyRows],
          });
        }
        

        default:
          return [];
      }
    })
  }

  const primitives = tokensToDocx(tree)

  const doc = new Document({
    // creator: "Dolan Miu",
    description: "My extremely interesting document",
    title: title,
    keywords: "academic document",
    
    styles: {
      default: {
        document: {
          run: {
            size: "12pt",
            font: "New Times Roman",
            color: "000000",
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED,
          }
        },
        heading1: {
          run: {
            bold: true,
          }
        },
        heading2: {
          run: {
            bold: true,
          }
        },
        heading3: {
          run: {
            bold: true,
            color: "000000",
          }
        },
        heading4: {
          run: {
            bold: true,
            color: "000000",
          }
        },
        heading5: {
          run: {
            bold: true,
            color: "000000",
          }
        },
      }
    },
    
    sections: [{
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  children: [
                    PageNumber.CURRENT
                  ]
                })
              ]
            })
          ]
        })
      },
      properties: {
        page: {
          size: {
            width: convertMillimetersToTwip(210),
            height: convertMillimetersToTwip(297),
            code : 9
          },
          margin: {
            top: convertMillimetersToTwip(12),
            bottom: convertMillimetersToTwip(12),
            right: convertMillimetersToTwip(16),
            left : convertMillimetersToTwip(16),
          }
        }
      },
      children: primitives,
    }],
  })

  
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = title;
  a.click();
  URL.revokeObjectURL(url);
}
