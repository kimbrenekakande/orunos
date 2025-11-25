import {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page : {
    flexDirection : 'row',
    border : 1,
    borderColor : "#EAEAEA"

  },
  section :{
    margin : 10,
    padding : 10,
    flexGrow : 1
  },
})
export default async function PaperView({params }: {params : Promise<{ doctype : string; id : string}>}) {
  const {doctype , id} = await params;
  const response = await fetch(`http://localhost:3000/api/papers/fetch?id=${id}`);
  const work = await response.json()
  const answer = `${work?.question}`;

  return (
    <PDFViewer>
      <Document>
        <Page size ="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>FUCK OFF</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
    
  );
}
