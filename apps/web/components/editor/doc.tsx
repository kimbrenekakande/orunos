import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";
import { authClient } from "@/lib/auth-client"

// interface userProps {
//   name: string,
//   email: string,
//   emailVerified: boolean,
//   image: string,
//   createdAt?: any,
//   updatedAt?: any,
//   institutionId: number,
//   wallet: number,
//   id : int
// }

interface MyDocProps {
  content: string;
}

//Generating && Download PDF
export const MyDoc = ({content }: MyDocProps) => {
  
  const {data, isPending, error, refetch} =  authClient.useSession() // Fetching the session from the client side
  const author =  data?.user

  return (
    <Document >
      <Page style={styles.cover}>
        {/*<Image src={institute.logo || "logo_black.png"} />*/}
        {/*<Text>{title}</Text>*/}
        {/*<Text>{author.institutionId || "instute"}</Text>*/}
        <Text>{author?.name || "name"}</Text>
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