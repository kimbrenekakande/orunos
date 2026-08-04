import {
	HeadingLevel,
	Document,
	Packer,
	Paragraph,
	TextRun,
	Table,
	TableRow,
	TableCell,
	WidthType,
	BorderStyle,
	convertMillimetersToTwip,
	AlignmentType,
	Header,
	PageNumber,
	type IRunOptions,
} from "docx";
import { marked, type Token } from "marked";

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------
interface MarkedToken {
	type: string;
	text?: string;
	tokens?: MarkedToken[];
}

interface MarkedTableCell {
	text: string;
}

// --------------------------------------------------------------------------
// APA 7th Edition constants
// --------------------------------------------------------------------------
const LINE_SPACING = 360; // 12 pt × 20 twips/pt × 1.5 spacing
const FIRST_LINE_INDENT = 720; // 0.5 in × 1440 twips/in
// Fresh object per call — prevents shared-mutation issues in the docx builder
const hangingIndent = () => ({
	left: FIRST_LINE_INDENT,
	hanging: FIRST_LINE_INDENT,
});
const ONE_INCH = 25.4; // mm — APA margins

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const thinRule = { style: BorderStyle.SINGLE, size: 4, color: "000000" };

const HEADING_LEVEL_MAP: Record<
	number,
	(typeof HeadingLevel)[keyof typeof HeadingLevel]
> = {
	1: HeadingLevel.HEADING_1,
	2: HeadingLevel.HEADING_2,
	3: HeadingLevel.HEADING_3,
	4: HeadingLevel.HEADING_4,
	5: HeadingLevel.HEADING_5,
	6: HeadingLevel.HEADING_6,
};

// --------------------------------------------------------------------------
// Inline token → TextRun[]
// --------------------------------------------------------------------------
function inlineToRuns(
	tokens: MarkedToken[],
	parentStyle?: { bold?: boolean; italics?: boolean },
): TextRun[] {
	return tokens.flatMap((t): TextRun[] => {
		// Accumulate formatting as we descend through strong/em wrappers
		const style = { ...parentStyle };
		if (t.type === "strong") style.bold = true;
		if (t.type === "em") style.italics = true;

		// Has children? Recurse with accumulated style (book titles in
		// references, nested bold+italic, etc.)
		if (t.tokens?.length) return inlineToRuns(t.tokens, style);

		// Leaf token — apply accumulated parent formatting
		switch (t.type) {
			case "text":
				return [new TextRun({ text: t.text, ...style })];
			case "strong":
				return [new TextRun({ text: t.text, bold: true, ...style })];
			case "em":
				return [new TextRun({ text: t.text, italics: true, ...style })];
			case "del":
				return [new TextRun({ text: t.text, strike: true })];
			case "codespan":
				return [
					new TextRun({ text: t.text, font: "Courier New", size: "10pt" }),
				];
			case "br":
				return [new TextRun({ break: 1 })];
			case "link":
				return [new TextRun({ text: t.text, color: "1A56DB", underline: {} })];
			case "html":
			case "escape":
				return [new TextRun({ text: t.text ?? "" })];
			default:
				return [];
		}
	});
}

// --------------------------------------------------------------------------
// Flatten inline tokens to plain text (for heading .text fallback)
// --------------------------------------------------------------------------
function extractText(tokens: MarkedToken[]): string {
	return tokens
		.flatMap((t) => (t.tokens?.length ? extractText(t.tokens) : (t.text ?? "")))
		.join("");
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function isReferencesHeading(text: string | undefined): boolean {
	return (text ?? "").trim().toLowerCase() === "references";
}

function getPlainText(tokens: MarkedToken[] | undefined): string {
	if (!tokens?.length) return "";
	return tokens
		.flatMap((t) =>
			t.tokens?.length ? getPlainText(t.tokens) : (t.text ?? ""),
		)
		.join("");
}

// --------------------------------------------------------------------------
// Block tokens → docx primitives
// --------------------------------------------------------------------------
function tokensToDocx(tree: Token[]): (Paragraph | Table)[] {
	const children: (Paragraph | Table)[] = [];
	let inReferences = false;

	for (const token of tree) {
		switch (token.type) {
			// ── Headings (APA 7th) ──────────────────────────────────────────
			case "heading": {
				const headingText = token.tokens?.length
					? extractText(token.tokens as MarkedToken[])
					: token.text;

				// Track references section state based on heading text
				inReferences = isReferencesHeading(headingText);

				const level = HEADING_LEVEL_MAP[token.depth] ?? HeadingLevel.HEADING_1;
				const isLevel1 = token.depth === 1;
				const isLevel3 = token.depth === 3;

				if (isLevel3) {
					// APA Level 3: left-aligned, bold italic — use children for italics
					children.push(
						new Paragraph({
							children: [
								new TextRun({
									text: headingText,
									bold: true,
									italics: true,
									size: "12pt",
								}),
							],
							heading: level,
							alignment: AlignmentType.LEFT,
							spacing: { before: 240, after: 120, line: LINE_SPACING },
						}),
					);
				} else {
					children.push(
						new Paragraph({
							text: headingText,
							heading: level,
							alignment: isLevel1 ? AlignmentType.CENTER : AlignmentType.LEFT,
							spacing: {
								before: isLevel1 ? 0 : 240,
								after: isLevel1 ? 240 : 120,
								line: LINE_SPACING,
							},
						}),
					);
				}
				break;
			}

			// ── Body paragraphs ─────────────────────────────────────────────
			case "paragraph": {
				const runs = token.tokens?.length
					? inlineToRuns(token.tokens as MarkedToken[])
					: token.text
						? [new TextRun({ text: token.text })]
						: [];

				// Bold **References** heading on its own line triggers ref mode
				const paraText = token.tokens?.length
					? getPlainText(token.tokens as MarkedToken[])
					: (token.text ?? "");
				if (isReferencesHeading(paraText)) {
					inReferences = true;
					children.push(
						new Paragraph({
							children: runs,
							spacing: { before: 240, line: LINE_SPACING, after: 0 },
							alignment: AlignmentType.LEFT,
						}),
					);
					break;
				}

				if (runs.length === 0) {
					children.push(new Paragraph({ spacing: { line: LINE_SPACING } }));
				} else {
					children.push(
						new Paragraph({
							children: runs,
							indent: inReferences
								? hangingIndent()
								: { firstLine: FIRST_LINE_INDENT },
							spacing: { line: LINE_SPACING, after: 0 },
							alignment: AlignmentType.JUSTIFIED,
						}),
					);
				}
				break;
			}

			// ── Lists ───────────────────────────────────────────────────────
			case "list": {
				for (const item of token.items) {
					const itemRuns = item.tokens?.length
						? inlineToRuns(item.tokens as MarkedToken[])
						: [new TextRun({ text: item.text ?? "" })];

					children.push(
						new Paragraph({
							children: itemRuns,
							bullet: { level: 0 },
							indent: { left: FIRST_LINE_INDENT },
							spacing: { line: LINE_SPACING, after: 0 },
							alignment: AlignmentType.JUSTIFIED,
						}),
					);
				}
				break;
			}

			// ── Blockquote (APA: indented left, italic) ─────────────────────
			case "blockquote": {
				if (token.tokens?.length) {
					// Recursively render inner tokens, then wrap paragraphs in italic
					const inner = tokensToDocx(token.tokens);
					for (const node of inner) {
						if (node instanceof Paragraph) {
							// Access internal root array via indexer to avoid protected member
							const rawChildren = (node as unknown as Record<string, unknown>)[
								"root"
							] as TextRun[] | undefined;
							if (rawChildren?.length) {
								const italicRuns = rawChildren.map((run) => {
									// Copy constructor-style: recreate with italics on
									const opts = (run as unknown as Record<string, unknown>)[
										"options"
									] as Record<string, unknown> | undefined;
									return new TextRun({
										...opts,
										italics: true,
									} as unknown as IRunOptions);
								});
								children.push(
									new Paragraph({
										children: italicRuns,
										indent: { left: FIRST_LINE_INDENT },
										spacing: { line: LINE_SPACING, after: 0 },
									}),
								);
							}
						} else {
							children.push(node);
						}
					}
				}
				break;
			}

			// ── Code block ──────────────────────────────────────────────────
			case "code": {
				const lines = (token.text ?? "").split("\n");
				for (const line of lines) {
					children.push(
						new Paragraph({
							children: [
								new TextRun({
									text: line || " ",
									font: "Courier New",
									size: "10pt",
								}),
							],
							indent: { left: FIRST_LINE_INDENT },
							spacing: { line: 300, after: 0 },
						}),
					);
				}
				children.push(new Paragraph({ spacing: { line: LINE_SPACING } }));
				break;
			}

			// ── Horizontal rule ─────────────────────────────────────────────
			case "hr": {
				children.push(
					new Paragraph({
						border: {
							bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
						},
						spacing: { before: 240, after: 240, line: LINE_SPACING },
					}),
				);
				break;
			}

			// ── Table (full-width APA style — horizontal rules only) ────────
			case "table": {
				const colCount = Math.max(1, token.header.length);

				// Available page width (A4 minus 1″ margins each side) in twips
				const availableWidth =
					convertMillimetersToTwip(210) -
					convertMillimetersToTwip(ONE_INCH) * 2;

				const colWidth = Math.floor(availableWidth / colCount);

				// Compact cell padding — keeps rows short even with wrapped text
				const cellMargins = {
					top: convertMillimetersToTwip(0.5),
					bottom: convertMillimetersToTwip(0.5),
					left: convertMillimetersToTwip(2),
					right: convertMillimetersToTwip(2),
				};

				// Single-spaced, 10pt text inside tables for density
				const cellSpacing = { before: 0, after: 0, line: 240 };

				const makeHeaderCell = (text: string) =>
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: text || "",
										bold: true,
										size: "10pt",
									}),
								],
								alignment: AlignmentType.LEFT,
								spacing: cellSpacing,
							}),
						],
						width: { size: colWidth, type: WidthType.DXA },
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
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: text || "",
										size: "10pt",
									}),
								],
								alignment: AlignmentType.LEFT,
								spacing: cellSpacing,
							}),
						],
						width: { size: colWidth, type: WidthType.DXA },
						margins: cellMargins,
						borders: {
							top: noBorder,
							bottom: noBorder,
							left: noBorder,
							right: noBorder,
						},
					});

				const headerRow = new TableRow({
					tableHeader: true,
					children: (token.header as MarkedTableCell[]).map((r) =>
						makeHeaderCell(r.text),
					),
				});

				const bodyRows = (token.rows as MarkedTableCell[][]).map(
					(row) =>
						new TableRow({
							children: row.map((r) => makeBodyCell(r.text)),
						}),
				);

				children.push(
					new Table({
						width: { size: 100, type: WidthType.PERCENTAGE },
						columnWidths: Array(colCount).fill(colWidth),
						borders: {
							top: thinRule,
							bottom: thinRule,
							left: noBorder,
							right: noBorder,
						},
						rows: [headerRow, ...bodyRows],
					}),
				);

				children.push(new Paragraph({ spacing: { line: LINE_SPACING } }));
				break;
			}

			// ── Space ───────────────────────────────────────────────────────
			case "space": {
				children.push(new Paragraph({ spacing: { line: LINE_SPACING } }));
				break;
			}

			// ── Catch-all ───────────────────────────────────────────────────
			default: {
				const fallbackText = (token as Record<string, unknown>).text as
					| string
					| undefined;
				if (fallbackText) {
					children.push(
						new Paragraph({
							children: [new TextRun({ text: fallbackText })],
							indent: { firstLine: FIRST_LINE_INDENT },
							spacing: { line: LINE_SPACING, after: 0 },
							alignment: AlignmentType.JUSTIFIED,
						}),
					);
				}
				break;
			}
		}
	}

	return children;
}

// --------------------------------------------------------------------------
// Public API — parse markdown → build .docx → trigger browser download
// --------------------------------------------------------------------------
export async function createAndDownloadDocx(
	content: string,
	title = "document.docx",
) {
	const cleanTitle = title.replace(/\.docx$/i, "");

	// ── Parse markdown ─────────────────────────────────────────────────
	const tree: Token[] = marked.lexer(content);

	// ── Body primitives ─────────────────────────────────────────────────
	const bodyPrimitives = tokensToDocx(tree);

	// ── Title page (APA 7th student paper) ──────────────────────────────
	const titlePage: Paragraph[] = [
		new Paragraph({ spacing: { before: 2400, line: LINE_SPACING } }),
		new Paragraph({
			children: [new TextRun({ text: cleanTitle, bold: true, size: "14pt" })],
			alignment: AlignmentType.CENTER,
			spacing: { line: LINE_SPACING },
		}),
		new Paragraph({ spacing: { line: LINE_SPACING } }),
		new Paragraph({
			children: [
				new TextRun({
					text: "_________________________",
					color: "999999",
					size: "10pt",
				}),
			],
			alignment: AlignmentType.CENTER,
			spacing: { before: 480, line: LINE_SPACING },
		}),
		new Paragraph({
			children: [
				new TextRun({ text: "Author Name", color: "999999", size: "10pt" }),
			],
			alignment: AlignmentType.CENTER,
			spacing: { line: LINE_SPACING },
		}),
		new Paragraph({
			children: [
				new TextRun({
					text: "Institutional Affiliation",
					color: "999999",
					size: "10pt",
				}),
			],
			alignment: AlignmentType.CENTER,
			spacing: { line: LINE_SPACING },
		}),
		new Paragraph({
			children: [
				new TextRun({ text: "Course Name", color: "999999", size: "10pt" }),
			],
			alignment: AlignmentType.CENTER,
			spacing: { line: LINE_SPACING },
		}),
		new Paragraph({
			children: [
				new TextRun({ text: "Instructor Name", color: "999999", size: "10pt" }),
			],
			alignment: AlignmentType.CENTER,
			spacing: { line: LINE_SPACING },
		}),
		new Paragraph({
			children: [
				new TextRun({
					text: new Date().toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}),
					color: "999999",
					size: "10pt",
				}),
			],
			alignment: AlignmentType.CENTER,
			spacing: { line: LINE_SPACING },
		}),
	];

	// ── Page header (page number, top-right, every page) ────────────────
	const pageHeader = new Header({
		children: [
			new Paragraph({
				alignment: AlignmentType.RIGHT,
				spacing: { line: LINE_SPACING },
				children: [
					new TextRun({ children: [PageNumber.CURRENT], size: "10pt" }),
				],
			}),
		],
	});

	// ── Assemble document ───────────────────────────────────────────────
	const doc = new Document({
		title: cleanTitle,
		description: `Academic document — ${cleanTitle}`,
		keywords: "academic document",
		styles: {
			default: {
				document: {
					run: {
						size: "12pt",
						font: "Times New Roman",
						color: "000000",
					},
					paragraph: {
						alignment: AlignmentType.JUSTIFIED,
						spacing: { line: LINE_SPACING },
					},
				},
				heading1: {
					run: { bold: true, size: "14pt" },
					paragraph: {
						alignment: AlignmentType.CENTER,
						spacing: { line: LINE_SPACING },
					},
				},
				heading2: {
					run: { bold: true, size: "13pt" },
					paragraph: {
						alignment: AlignmentType.LEFT,
						spacing: { line: LINE_SPACING },
					},
				},
				heading3: {
					run: { bold: true, italics: true, size: "12pt" },
					paragraph: {
						alignment: AlignmentType.LEFT,
						spacing: { line: LINE_SPACING },
					},
				},
				heading4: {
					run: { bold: true, size: "12pt" },
					paragraph: {
						alignment: AlignmentType.LEFT,
						spacing: { line: LINE_SPACING },
					},
				},
				heading5: {
					run: { bold: true, italics: true, size: "12pt" },
					paragraph: {
						alignment: AlignmentType.LEFT,
						spacing: { line: LINE_SPACING },
					},
				},
			},
		},
		sections: [
			{
				headers: { default: pageHeader },
				properties: {
					page: {
						size: {
							width: convertMillimetersToTwip(210),
							height: convertMillimetersToTwip(297),
							code: 9,
						},
						margin: {
							top: convertMillimetersToTwip(ONE_INCH),
							bottom: convertMillimetersToTwip(ONE_INCH),
							right: convertMillimetersToTwip(ONE_INCH),
							left: convertMillimetersToTwip(ONE_INCH),
						},
					},
				},
				children: titlePage,
			},
			{
				headers: { default: pageHeader },
				properties: {
					page: {
						size: {
							width: convertMillimetersToTwip(210),
							height: convertMillimetersToTwip(297),
							code: 9,
						},
						margin: {
							top: convertMillimetersToTwip(ONE_INCH),
							bottom: convertMillimetersToTwip(ONE_INCH),
							right: convertMillimetersToTwip(ONE_INCH),
							left: convertMillimetersToTwip(ONE_INCH),
						},
					},
				},
				children: bodyPrimitives,
			},
		],
	});

	// ── Trigger download ────────────────────────────────────────────────
	const blob = await Packer.toBlob(doc);
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${cleanTitle}.docx`;
	a.click();
	URL.revokeObjectURL(url);
}
