import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";

export default async function Page({params }: {params : Promise<{ doctype : string; id : string}>}) {
	const {doctype , id} = await params;
	const response = await fetch(`http://localhost:3000/api/works/paper?id=${id}`);
	const work = await response.json()
	const answer = `${work.question}`;

	return (
		<div className="h-full w-full">
      <h1 className=" ">{doctype} | {id}</h1>
			<PlateEditor md={answer} />
			<Toaster />
		</div>
	);
}
