"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { Button } from "../platejs/button";
import { useRouter } from "next/navigation";
import { Mdprops } from "@/lib/schemas";



export function PlateEditor({md} : {md : Mdprops}) {
  const router = useRouter();
  const {data, id } = md
  console.log(`The ID is ${id}`)

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

	return (
		<Plate editor={editor}>
			<EditorContainer>
				<Editor variant="default" />
				<div className="fixed bottom-5 right-10 -translate-x-1/2 z-50 rounded-4xl h-19">
          <Button className="cursor-pointer" onClick={SaveEditorText}>SAVE</Button>
				</div>
			</EditorContainer>
		</Plate>
	);
}
