import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import { startCreation } from "@/lib/actions/creator";
import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized

export default async function paper({params} : {params : Promise<{doctype : string}>}) {
  const {doctype} = await params;

  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')
  
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-10'>
      <h1>Start {doctype}</h1>
      <form action={startCreation} className="w-[70%] flex flex-col gap-4 items-center">

        <input type="text" value={doctype} name="doctype" id="doctype" className="hidden"  readOnly/>
        <Textarea name="qns" placeholder="Type your message here." className="h-[200px]"/>
        
        <Button type="submit" className="w-40 cursor-pointer">Submit</Button>
      </form>
    </div>
  )
}
