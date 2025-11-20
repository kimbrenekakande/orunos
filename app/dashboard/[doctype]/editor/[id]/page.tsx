import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
// import { sample } from "../../../../archive/sand/flx";
// import markdownit as xer from 'markdown-it'

export default async function Page({params }: {params : Promise<{ doctype : string; id : string}>}) {
	const {doctype , id} = await params;
	const response = await fetch(`http://localhost:3000/api/works/paper?id=${id}`);
	const work = await response.json()
	const answer = `${work.question}`;
  console.log('start......')
  console.log(id)
  console.log(response)

	return (
		<div className="h-screen w-full">
      <h1 className="text-5xl text-white">{doctype} : {id}</h1>
			<PlateEditor md={answer} />
			<Toaster />
		</div>
	);
}
