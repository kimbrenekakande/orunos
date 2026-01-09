

import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized
import { DocPoller } from "./polling";

type props = {
  params : Promise<{ doctype: string; id: string }>,
  searchParams : Promise<{ source : string }>
}

export default async function Page({ params, searchParams } : props) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')

	const {id} = await params;
	const {source} = await searchParams

	return(
    <DocPoller id={id} from={source} />
  )
}
