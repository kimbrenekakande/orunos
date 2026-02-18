import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized
import Questionaire from "@/components/kokonutui/ai-prompt";

type Props = {
  params: Promise<{doctype: string}>
}

export const generateMetadata = async ({ params }: Props) => {
  const dockind = (await params).doctype
  return {
    title: `Orunos | ${dockind}` ,
    description: "Your Academic CoPilot",
  }
};

export default async function Paper({params} : Props) {
  const {doctype} = await params;

  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect('/login')

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Questionaire doctype={doctype}/>
    </div>
  )
}
