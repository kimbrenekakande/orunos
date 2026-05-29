import { Page, Text, View, Document, Image, Link } from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";
import { authClient } from "@/lib/auth-client"
import React from "react";
import { MyDocProps } from "@/lib/types";
import {marked} from "marked"
import baseUrl from "@/lib/base-url";

//Generating && Download PDF
export const MyDoc = ({ title, content }: MyDocProps) => {

  const {data} =  authClient.useSession()
  const author = data?.user

  // Some content sources include control/zero-width characters that can break `marked` parsing.
  // Removing them makes inline emphasis (like `**bold**`) tokenize correctly.
  const safeContent = (content || "").replace(/\u0000/g, "").replace(/[\u200B-\u200D\uFEFF]/g, "");

  // Rewrite remote image URLs through the same-origin proxy so @react-pdf/renderer
  // can fetch images without CORS issues.
  const proxiedContent = safeContent.replace(
    /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g,
    (_match, alt, url) =>
      `![${alt}](${baseUrl}/api/image-proxy?url=${encodeURIComponent(url)})`
  );

  //turn md content to react pdf primitives
  const renderTokens = (tokens: any[]): React.ReactNode[] => {
    const getHeadingStyle = (depth: number) => {
      const styleKey = `h${depth}` as keyof typeof styles;
      return styles[styleKey] || styles.paragraph;
    };

    return tokens.map((token, index) => {
      switch (token.type) {
        case 'text':
          return (
            <Text key={index}>
              {renderInlineFallback(String(token.text ?? ""))}
            </Text>
          );

        case 'space':
          return <View key={index} style={styles.space} />;

        // Soft/hard breaks sometimes appear depending on marked configuration.
        case 'softbreak':
          return <Text key={index}>{'\n'}</Text>;

        case 'strong':
        case 'bold':
          return (
            <Text key={index} style={styles.strong}>
              {token.tokens ? renderTokens(token.tokens) : token.text}
            </Text>
          );

        case 'em':
        case 'italic':
          return (
            <Text key={index} style={styles.em}>
              {token.tokens ? renderTokens(token.tokens) : token.text}
            </Text>
          );

        case 'codespan':
        case 'inlineCode':
          return (
            <Text key={index} style={styles.inlineCode}>
              {token.text}
            </Text>
          );

        case 'del':
        case 'strike':
          return (
            <Text key={index} style={styles.del}>
              {token.tokens ? renderTokens(token.tokens) : token.text}
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

        case 'image':
          return (
            <Image key={index} src={token.href} style={styles.image} />
          );

        case 'heading':
          return (
            <Text key={index} style={getHeadingStyle(token.depth)}>
              {token.text}
            </Text>
          );

        case 'paragraph': {
          // @react-pdf/renderer Image is block-level and cannot be nested
          // inside Text. Split the paragraph at image boundaries so each
          // image renders as a sibling, not a child, of Text elements.
          const children = token.tokens || [];
          const hasImage = children.some((t: any) => t.type === 'image');

          if (!hasImage) {
            return (
              <Text key={index} style={styles.paragraph}>
                {renderTokens(children)}
              </Text>
            );
          }

          // Split into groups separated by image tokens
          const groups: React.ReactNode[] = [];
          let textGroup: any[] = [];

          for (const child of children) {
            if (child.type === 'image') {
              if (textGroup.length > 0) {
                groups.push(
                  <Text key={`${index}-t${groups.length}`} style={styles.paragraph}>
                    {renderTokens(textGroup)}
                  </Text>
                );
                textGroup = [];
              }
              groups.push(
                <Image key={`${index}-i${groups.length}`} src={child.href} style={styles.image} />
              );
            } else {
              textGroup.push(child);
            }
          }

          if (textGroup.length > 0) {
            groups.push(
              <Text key={`${index}-t${groups.length}`} style={styles.paragraph}>
                {renderTokens(textGroup)}
              </Text>
            );
          }

          return <View key={index}>{groups}</View>;
        }

        case 'list':
          return token.items.map((item: any, i: number) => (
            <View key={`${index}-${i}`} style={styles.listItem} wrap>
              <Text style={styles.listBullet}>
                {token.ordered ? `${i + 1}.` : '•'}
              </Text>
              <Text style={styles.listContent}>
                {item.tokens ? renderTokens(item.tokens) : renderInlineFallback(String(item.text ?? ""))}
              </Text>
            </View>
          ));

        case 'table':
          return (
            <View key={index} style={styles.table}>
              <View style={styles.tableHeaderRow} wrap>
                {token.header?.map((headerCell: any, hi: number) => (
                  <View key={hi} style={styles.tableCellContainer} wrap>
                    <Text style={styles.tableCell}>
                      {headerCell.tokens
                        ? renderInlineTokens(headerCell.tokens)
                        : renderInlineFallback(String(headerCell.text ?? ""))}
                    </Text>
                  </View>
                ))}
              </View>
              {token.rows?.map((row: any, ri: number) => (
                <View key={ri} style={styles.tableRow} wrap>
                  {row.map((cell: any, ci: number) => (
                    <View key={ci} style={styles.tableCellContainer} wrap>
                      <Text style={styles.tableCell}>
                        {cell.tokens
                          ? renderInlineTokens(cell.tokens)
                          : renderInlineFallback(String(cell.text ?? ""))}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          );

        case 'blockquote':
          return (
            <View key={index} style={styles.blockquote} wrap>
              {renderTokens(token.tokens || [])}
            </View>
          );

        case 'code':
          return (
            <View key={index} style={styles.codeBlock} wrap>
              <Text style={styles.codeText}>{token.text}</Text>
            </View>
          );

        case 'hr':
          return <View key={index} style={styles.hr} />;

        default:
          return (
            <Text key={index}>
              {renderInlineFallback(String(token.text || token.raw || ""))}
            </Text>
          );
      }
    });
  };

  // Fallback for inline markdown that `marked` failed to tokenize (e.g. `**bold**` still in text).
  // React-PDF supports nested <Text> with different styles, so we can render it safely here.
  function renderInlineFallback(text: string): React.ReactNode[] | string {
    const patterns: Array<{
      kind: "code" | "bold" | "strike" | "em";
      regex: RegExp;
    }> = [
      { kind: "code", regex: /`([^`]+)`/g },
      { kind: "bold", regex: /\*\*([^*]+?)\*\*/g },
      { kind: "strike", regex: /~~([^~]+?)~~/g },
      { kind: "em", regex: /\*([^*]+?)\*/g },
    ];

    // Find the earliest match among all patterns.
    const findNext = (input: string) => {
      let best:
        | {
            kind: "code" | "bold" | "strike" | "em";
            match: RegExpExecArray;
            index: number;
          }
        | null = null;

      for (const p of patterns) {
        p.regex.lastIndex = 0;
        const m = p.regex.exec(input);
        if (!m) continue;
        const idx = m.index ?? 0;
        if (!best || idx < best.index) best = { kind: p.kind, match: m, index: idx };
      }
      return best;
    };

    // Fast path: no patterns.
    const anyRegex = /`[^`]+`|\*\*[^*]+?\*\*|~~[^~]+?~~|\*[^*]+?\*/;
    if (!anyRegex.test(text)) return text;

    const out: React.ReactNode[] = [];
    let cursor = 0;
    while (cursor < text.length) {
      const next = findNext(text.slice(cursor));
      if (!next) {
        out.push(text.slice(cursor));
        break;
      }

      const absoluteIndex = cursor + next.index;
      if (absoluteIndex > cursor) out.push(text.slice(cursor, absoluteIndex));

      const full = next.match[0];
      const inner = next.match[1] ?? "";

      switch (next.kind) {
        case "code":
          out.push(
            <Text key={`code-${absoluteIndex}`} style={styles.inlineCode}>
              {inner}
            </Text>
          );
          break;
        case "bold":
          out.push(
            <Text key={`bold-${absoluteIndex}`} style={styles.strong}>
              {inner}
            </Text>
          );
          break;
        case "strike":
          out.push(
            <Text key={`strike-${absoluteIndex}`} style={styles.del}>
              {inner}
            </Text>
          );
          break;
        case "em":
          out.push(
            <Text key={`em-${absoluteIndex}`} style={styles.em}>
              {inner}
            </Text>
          );
          break;
      }

      // Advance cursor past the matched token.
      const advanceBy = full.length;
      cursor = absoluteIndex + advanceBy;
    }

    return out;
  }

  // Render marked inline tokens without relying on regex fallback.
  // This keeps table cell layout stable and correctly styles tokens like `**bold**`.
  function renderInlineTokens(tokens: any[]): React.ReactNode[] {
    return tokens.map((token: any, index: number) => {
      switch (token.type) {
        case "text":
          return String(token.text ?? token.raw ?? "");
        case "strong":
        case "bold":
          return (
            <Text key={index} style={styles.strong}>
              {token.tokens ? renderInlineTokens(token.tokens) : token.text}
            </Text>
          );
        case "em":
        case "italic":
          return (
            <Text key={index} style={styles.em}>
              {token.tokens ? renderInlineTokens(token.tokens) : token.text}
            </Text>
          );
        case "del":
        case "strike":
          return (
            <Text key={index} style={styles.del}>
              {token.tokens ? renderInlineTokens(token.tokens) : token.text}
            </Text>
          );
        case "codespan":
        case "inlineCode":
          return (
            <Text key={index} style={styles.inlineCode}>
              {token.text}
            </Text>
          );
        case "link":
          return (
            <Link key={index} src={token.href} style={styles.link}>
              {token.text}
            </Link>
          );
        default:
          return String(token.text ?? token.raw ?? "");
      }
    });
  }

  const tokens = marked.lexer(proxiedContent)
  const primitives = renderTokens(tokens)

  return (
    <Document >
      {/*Cover Page*/}
      {/*<Page size="A4" style={styles.cover}>
        <Text style={styles.coverTitle}>
          {title}
        </Text>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.authorInfo}>
            {author?.name || "Author Name"}
          </Text>
          <Text style={styles.authorInfo}>
            {author?.email || "author@email.com"}
          </Text>
        </View>
      </Page>*/}

      <Page size="A4" style={styles.page} wrap>
        <View>
          {primitives}
        </View>
      </Page>
    </Document>
  )
}
