import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";
import { authClient } from "@/lib/auth-client"
import baseUrl from "@/lib/base-url";
import { useEffect, useState } from "react";
import { MyDocProps } from "@/lib/types";


async function somero(instID : string) {
  const res = await fetch(`${baseUrl}/api/institute/fetch?id=${instID}`)
  return res.json()
}
// const institution = await somero(id)
//Generating && Download PDF
export const MyDoc = ({title, content }: MyDocProps) => {
  
  const [institution, setInstitution] = useState(null)
  const {data, isPending, error, refetch} =  authClient.useSession() // Fetching the session from the client side
  const author = data?.user
  const id = Number(author?.institutionId)
  
  useEffect(() => {
    if (id) {
      somero(id.toString()).then(setInstitution)
    }
  },[id])

  return (
    <Document >
      <Page style={styles.cover}>
        <Image style={styles.image} src={institution?.logo}/>
        <Text>{institution?.name || "Institution Name"}</Text>
        <Text>{ title }</Text>
        <Text>{author?.name || "name"}</Text>
        <Text>{author?.email || "email"}</Text>
      </Page>
      
      <Page size="A4" style={styles.page}>
        <View>
          <Text>
            {content}
          </Text>
        </View>
        <Text style={styles.pageNo} render={({pageNumber}) => (
          `${pageNumber}`
        )} fixed/>
      </Page>
    </Document>
  )
}