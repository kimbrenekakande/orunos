
import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import { addShit } from "@/lib/actions/creator";
import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from 'zod'
import { min } from "lodash";

const formSchema = z.object({
  doctype : z
    .string(),

  qn : z
    .string()
    .min(10, "Your questions must me more than 10 characters")
})

export default async function Paper({params} : {params : Promise<{doctype : string}>}) {
  const {doctype} = await params;

  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')

  const form = useForm<z.infer<typeof formSchema>>({
    
  })
  
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-10'>
      <h1>Start {doctype}</h1>
      <form action={addShit} className="w-[70%] flex flex-col gap-4 items-center">

        <input type="text" value={doctype} name="doctype" id="doctype" className="hidden"/>
        <input type="text" name="ans" id="ans" value="answer from LLM" className="hidden"/>
        <Textarea name="qn" placeholder="Type your message here." className="h-[200px]" />

        <Button type="submit" className="w-40 cursor-pointer">Submit</Button>
      </form>
    </div>
    
  )
}
