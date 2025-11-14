'client'
import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";


export default async function Page() {
  const response = (await fetch('http://localhost:3000/api/works'))
  const work = await response.json()
  console.log('Loading----------')
  console.log(work)

	return (
		<div className="h-screen w-full">
			<PlateEditor md={work.answer}/>

			<Toaster />

		</div>
	);
}

