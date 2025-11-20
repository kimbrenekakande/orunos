
import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import { addShit } from "@/lib/actions/creator";


export default async function paper({params} : {params : Promise<{doctype : string}>}) {
  const {doctype} = await params;
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-10'>
      <h1>Start {doctype}</h1>
      <form action={addShit} className="w-[70%] flex flex-col gap-4 items-center">

        <input type="text" value={doctype} name="doctype" id="doctype" className="hidden"/>
        <input type="text" name="ans" id="ans" value="answers nigga" className="hidden"/>
        <Textarea name="qn" placeholder="Type your message here." className="h-[200px]" />

        <Button type="submit" className="w-40 cursor-pointer">Submit</Button>
      </form>
    </div>
    
  )
}
