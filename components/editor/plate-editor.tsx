"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { FloatingDock } from "@/components/ui/floating-dock";
import { links } from "@/lib/floater";
import { Button } from "../platejs/button";
import { redirect } from "next/navigation";

interface Mdprops {
  id : string
  data : string
}

export function PlateEditor({md} : {md : Mdprops}) {
  const {data, id } = md
  console.log(`The ID is ${id}`)

	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(data),
	});

  async function SaveEditorText(){
    const newData = editor.api.markdown.serialize()
    const res = await fetch(`http://localhost:3000/api/papers/update?id=${id}` , 
      {
        method :'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify({'body' : newData})
      });
      
    console.log(`new data : ${newData}`)
    console.log(res)
    redirect('/dashboard')
  }

	return (
		<Plate editor={editor}>
			<EditorContainer>
				<Editor variant="default" />
				<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
					{/* <FloatingDock
						// mobileClassName="translate-y-20" // only for demo, remove for production
						items={links}
					/> */}
          <Button className="cursor-pointer" onClick={SaveEditorText}>SAVE</Button>
				</div>
			</EditorContainer>
		</Plate>
	);
}
