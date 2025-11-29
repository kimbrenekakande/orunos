import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";



export default async function Page({params }: {params : Promise<{ doctype : string; id : string}>}) {
	const {id} = await params;
	const response = await fetch(`http://localhost:3000/api/papers/fetch?id=${id}`);
	const paper = await response.json()
	const answer = `${paper.answer}`;

  const obj = { //aligns with Mdprops schema in plate-editor 
    id : id,
    data : answer,
  }

	return (
		<div className="h-full w-full">
			<PlateEditor md={obj}/>
			<Toaster />
		</div>
	);
}
