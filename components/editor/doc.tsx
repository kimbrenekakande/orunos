import { Page, Text, View, Document , Image} from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";

interface MyDocProps {
  user: any;
  instituteId: number;
  title: string;
  content: string;
}

//Generating && Download PDF
export const MyDoc = ({ user , instituteId , title , content }: MyDocProps) => {
 

  return (
    <Document >
      <Page style={styles.cover}>
        {/*<Image src={institute.logo || "logo_black.png"} />*/}
        <Text>{title}</Text>
        <Text>{user.user.instituteId}</Text>
        <Text>{user.user.name}</Text>
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