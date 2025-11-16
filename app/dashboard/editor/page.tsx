import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import { sample } from "./flx";

export default async function Page() {
	// const { content, setContent } = usePlateText();

  const response = await fetch("http://localhost:3000/api/works");
  const work = await response.json();
  const an = work.answer
  const answer = an
	
	return (
		<div className="h-screen w-full">
			<PlateEditor md={answer}/>

			<Toaster />
		</div>
	);
}
