

import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized
import { DocPoller } from "./polling";




export default async function Page({params }: {params : Promise<{ doctype : string; id : string}>}) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')

	const {id} = await params;

	return(
    <DocPoller id={id}/>
  )
}
