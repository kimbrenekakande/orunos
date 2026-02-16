import { Page, Text, View, Document, Image, Link } from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";
import { authClient } from "@/lib/auth-client"
import baseUrl from "@/lib/base-url";
import React, { useEffect, useState } from "react";
import { MyDocProps } from "@/lib/types";
import { InstituteType } from "@/lib/types";
import {marked} from "marked"



async function somero(instID : string) {
  const res = await fetch(`${baseUrl}/api/institute/fetch?id=${instID}`)
  return res.json()
}
// const institution = await somero(id)
//Generating && Download PDF
export const MyDoc = ({ title, content }: MyDocProps) => {
  const x: InstituteType = {
    id       :  0 ,  
    name     :  "",
    country  :  "",
    address  :  "",
    logo     :  "",
  }
  
  const [institution, setInstitution] = useState(x)
  const {data, isPending, error, refetch} =  authClient.useSession() // Fetching the session from the client side
  const author = data?.user
  const id = Number(author?.institutionId)
  
  useEffect(() => {
    if (id) {
      somero(id.toString()).then(setInstitution)
    }
  }, [id])
  
  //turn md content to react pdf primitives
  const renderTokens = (tokens: any[]): React.ReactNode[] => {
    return tokens.map((token, index) => {
      switch (token.type) {
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
        
        case 'heading':
          return (
            <Text key={index} style={styles[`h${token.depth}`]}>
              {token.text}
            </Text>
          );
        
        case 'paragraph':
          return (
            <Text key={index}>
              {renderTokens(token.tokens || [])}
            </Text>
          );
        
        case 'list':
          return token.items.map((item: any, i: number) => (
            <Text key={`${index}-${i}`}>
              {'• '}{item.text}
              {item.tokens && renderTokens(item.tokens)}
            </Text>
          ));
        
        default:
          return <Text key={index}>{token.raw || ''}</Text>;
      }
    });
  };

  const tokens = marked.lexer(content)
  const primitives = renderTokens(tokens)

  return (
    <Document >
      <Page>
        <Image src={institution?.logo}/>
        <Text>{institution?.name || "Institution Name"}</Text>
        <Text>{ title }</Text>
        <Text>{author?.name || "name"}</Text>
        <Text>{author?.email || "email"}</Text>
      </Page>
      
      <Page size="A4" style={styles.page}>
        <View>
          {primitives}
        </View>
        <Text render={({pageNumber}) => (
          `${pageNumber}`
        )} fixed/>
      </Page>
    </Document>
  )
}