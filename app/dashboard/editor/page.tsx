'use client'
import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import { useState, useEffect } from "react";

export default function Page() {
  const [mkdwn, setMkdwn] = useState('Fuckkkkkkkkkkking!!')
  useEffect (()=>{
    async function getMdwn(){
      const response = (await fetch('http://localhost:3000/api/works'))
      const work = await response.json()
      const ans = await work.answer
      setMkdwn(ans)
    }
    getMdwn();
  }, [mkdwn])

	return (
		<div className="h-screen w-full">
			<PlateEditor md={mkdwn}/>

			<Toaster />

		</div>
	);
}

