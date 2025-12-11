import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized
import baseUrl from "@/lib/base-url";



export default async function Page({params }: {params : Promise<{ doctype : string; id : string}>}) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')


	const {id} = await params;
	const response = await fetch(`${baseUrl}/api/papers/fetch?id=${id}`);
	const paper = await response.json()
	const answer = await `${paper.answer}`;

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
