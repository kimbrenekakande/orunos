'use'

import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized
import {Qner} from "./qner";


export default async function Paper({params} : {params : Promise<{doctype : string}>}) {
  const {doctype} = await params;

  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')


  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Qner doctype={doctype} />
    </div>
  )
}
