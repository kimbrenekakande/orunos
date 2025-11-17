import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import {sample} from "../../../archive/sand/flx";
// import markdownit as xer from 'markdown-it'


export default async function Page() {
	const response = await fetch("http://localhost:3000/api/works/paper");
	const work = await response.json();
	const answer =`${ work.answer }`

	return (
		<div className="h-screen w-full">
			<PlateEditor md={answer} />
			<Toaster />
		</div>
	);
}
