import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";
import { authClient } from "@/lib/auth-client"

interface MyDocProps {
  title : string;
  content : string;
}

//Generating && Download PDF
export const MyDoc =  ({title, content }: MyDocProps) => {
  
  const {data, isPending, error, refetch} =  authClient.useSession() // Fetching the session from the client side
  const author = data?.user
  const id = author?.institutionId?.toString()
  
  // const inst = fetch(`/api/instute?id=${author.institutionId}`).then((res)=> res.json())
  
  return (
    <Document >
      <Page style={styles.cover}>
        <Text>{id}</Text>
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