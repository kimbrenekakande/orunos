

import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized
import { DocPoller } from "./polling";
import { Metadata } from "next";

type Props = {
  params : Promise<{ doctype: string; id: string }>,
  searchParams : Promise<{ source : string }>
}

export const generateMetadata = async ({ params }: Props) : Promise<Metadata> => {
  const dockind = (await params).doctype
  
  return {
    title: `Orunos | ${dockind}` ,
    description: "Your Academic CoPilot",
  }
};

export default async function Page({ params, searchParams } : Props) {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')

  const { id } = await params;
  
  console.log("identification")
	console.log(id)
	const {source} = await searchParams

	return(
    <DocPoller id={id} from={source} />
  )
}
