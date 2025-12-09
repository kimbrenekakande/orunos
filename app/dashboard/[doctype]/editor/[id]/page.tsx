'use server'
import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized
import prisma from "@/lib/prisma";



export default async function Page({params }: {params : Promise<{ docType : string; id : string}>}) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')

	const {id} = await params;
	const response = await fetch(`http://localhost:3000/api/papers/fetch?id=${id}`);
	const paper = await response.json()

  // kickoff agent workflow
  const kickoff = await fetch('http://localhost:3000/api/ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: paper.question,
    }),
  })
  const kickResponse = await kickoff.json()
  const {text} = kickResponse

  const obj = {
    id : id, 
    data : text
  }

	return (
		<div className="h-full w-full">
			<PlateEditor md={obj}/>
			<Toaster />
		</div>
	);
}
