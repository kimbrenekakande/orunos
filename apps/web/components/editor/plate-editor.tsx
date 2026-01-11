"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { Button } from "../platejs/button";
import { useRouter } from "next/navigation";
import { Mdprops } from "@/lib/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { authClient } from "@/lib/auth-client" //client side session 
import {MyDoc} from "./doc"



export function PlateEditor({md} : {md : Mdprops}) {
  const router = useRouter();
  const {id, title, content } = md
  const {data, isPending, error, refetch} = authClient.useSession() 

	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(content),
	});
	
	const newData = editor.api.markdown.serialize() //what am i serializing here ???
	
	
  async function SaveEditorText(){
    await fetch(`api/papers/update?id=${id}`, 
      {
        method :'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify({'body' : newData})
      });

    router.push('/dashboard')
  }
  
	return (
		<Plate editor={editor}>
			<EditorContainer>
				<Editor variant="default" />
				<div className="fixed bottom-5 right-10 -translate-x-1/2 z-50 rounded-4xl h-19 gap-2 flex">
          <Button className="cursor-pointer" onClick={SaveEditorText}>SAVE</Button>
          <Button className="cursor-pointer">
            <PDFDownloadLink 
              document={<MyDoc 
                title={title}
                content={newData}
              />}
              fileName={`${title}.pdf`}
              >
              Download
            </PDFDownloadLink>
          </Button>
				</div>
			</EditorContainer>
		</Plate>
	);
}
