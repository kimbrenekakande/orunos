"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { Button } from "../platejs/button";
import { useRouter } from "next/navigation";
import { Mdprops } from "@/lib/types";
import { Page, Text, View, Document, PDFDownloadLink } from "@react-pdf/renderer";
import { styles } from "@/styles/pdfstyles";


export function PlateEditor({md} : {md : Mdprops}) {
  const router = useRouter();
  const {data, id } = md

	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(data),
	});
	
	
  async function SaveEditorText(){
    const newData = editor.api.markdown.serialize()
    await fetch(`api/papers/update?id=${id}`, 
      {
        method :'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify({'body' : newData})
      });

    router.push('/dashboard')
  }

  //Generating && Download PDF
  const MyDoc = () =>{
    const content = editor.api.markdown.serialize()
    
    
    return (
      <Document >
        <Page style={styles.cover}>
          <Text>COURSEWORK</Text>
        </Page>
        <Page size="A4" style={styles.page}>
          <View>
            <Text>orunos.com</Text>
            <Text>
              {content}
            </Text>
          </View>
          <Text style={styles.pageNo} render={({pageNumber}) => (
            `${pageNumber}`
          )} fixed/>
        </Page>  
      </ Document>
    )
  }

	return (
		<Plate editor={editor}>
			<EditorContainer>
				<Editor variant="default" />
				<div className="fixed bottom-5 right-10 -translate-x-1/2 z-50 rounded-4xl h-19 gap-2 flex">
          <Button className="cursor-pointer" onClick={SaveEditorText}>SAVE</Button>
          <Button className="cursor-pointer">
            <PDFDownloadLink document={<MyDoc/>} fileName="documentname.pdf">
              Download
            </PDFDownloadLink>
          </Button>
				</div>
			</EditorContainer>
		</Plate>
	);
}
