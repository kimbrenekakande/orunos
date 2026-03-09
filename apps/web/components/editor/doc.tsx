import { Page, Text, View, Document, Image, Link } from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";
import { authClient } from "@/lib/auth-client"
import React from "react";
import { MyDocProps } from "@/lib/types";
import {marked} from "marked"

//Generating && Download PDF
export const MyDoc = ({ title, content }: MyDocProps) => {

  const {data} =  authClient.useSession()
  const author = data?.user

  //turn md content to react pdf primitives
  const renderTokens = (tokens: any[]): React.ReactNode[] => {
    const getHeadingStyle = (depth: number) => {
      const styleKey = `h${depth}` as keyof typeof styles;
      return styles[styleKey] || styles.paragraph;
    };

    return tokens.map((token, index) => {
      switch (token.type) {
        case 'text':
          return <Text key={index}>{token.text}</Text>;

        case 'strong':
        case 'bold':
          return (
            <Text key={index} style={styles.strong}>
              {token.text}
            </Text>
          );

        case 'em':
        case 'italic':
          return (
            <Text key={index} style={styles.em}>
              {token.text}
            </Text>
          );

        case 'codespan':
        case 'inlineCode':
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

        case 'image':
          return (
            <Image key={index} src={token.href} style={{ width: 100, height: 100 }} />
          );

        case 'heading':
          return (
            <Text key={index} style={getHeadingStyle(token.depth)}>
              {token.text}
            </Text>
          );

        case 'paragraph':
          return (
            <Text key={index} style={styles.paragraph}>
              {renderTokens(token.tokens || [])}
            </Text>
          );

        case 'list':
          return token.items.map((item: any, i: number) => (
            <View key={`${index}-${i}`} style={styles.listItem}>
              <Text style={styles.listBullet}>{'•'}</Text>
              <Text style={styles.listContent}>
                {item.text}
                {item.tokens && renderTokens(item.tokens)}
              </Text>
            </View>
          ));

        case 'table':
          return (
            <View key={index} style={styles.table}>
              <View style={styles.tableHeaderRow}>
                {token.header?.map((headerCell: any, hi: number) => (
                  <Text key={hi} style={styles.tableCell}>
                    {headerCell.text}
                  </Text>
                ))}
              </View>
              {token.rows?.map((row: any, ri: number) => (
                <View key={ri} style={styles.tableRow}>
                  {row.map((cell: any, ci: number) => (
                    <Text key={ci} style={styles.tableCell}>
                      {cell.text}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          );

        case 'blockquote':
          return (
            <View key={index} style={styles.blockquote}>
              {renderTokens(token.tokens || [])}
            </View>
          );

        case 'code':
          return (
            <View key={index} style={styles.codeBlock}>
              <Text>{token.text}</Text>
            </View>
          );

        case 'hr':
          return <View key={index} style={styles.hr} />;

        default:
          return <Text key={index}>{token.text || token.raw || ''}</Text>;
      }
    });
  };

  const tokens = marked.lexer(content)
  const primitives = renderTokens(tokens)

  return (
    <Document >
      <Page size="A4" style={styles.cover}>
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
      </Page>

      <Page size="A4" style={styles.page}>
        <View>
          {primitives}
        </View>
      </Page>
    </Document>
  )
}
