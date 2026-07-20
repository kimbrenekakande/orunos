"use client"
import { ArrowsClockwiseIcon, WarningCircleIcon, FileTextIcon } from "@phosphor-icons/react"
import { Doc } from "@/lib/types"


export function StatCards( documents : Doc[]) {
  return (
    <>
      <div className="grid grid-cols-4 justify-between mx-0 sm:mx-8 border border-gray mt-8 rounded">
        <Stat icon={<FileTextIcon size={26}  weight="thin"/>} title={"Total"} total={documents.length}/>
        <Stat icon={<FileTextIcon size={26} weight="thin" className={"text-green-600"}/>} title={"Ready"} total={documents.filter((doc: Doc) => doc.status === "READY").length}/>
        <Stat icon={<ArrowsClockwiseIcon size={26} weight="thin" className="text-orange-500"/> } title={"Pending"} total={8}/>
        <Stat icon={<WarningCircleIcon size={26} weight="light" className="text-red-500"/>} title={"Failed"} total={2}/>
      </div>
    </>
  )
}


export function Stat({ icon, title , total } : { icon: React.ReactNode; title: string; total: number }) {
  return (
    <div className="bg-red border-l border-gray h-fit p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <p className="text-sm  font-sans">{title}</p>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-mono"> {total} </p>
      </div>
      <div className="hidden">
        <p className="text-sm">+20% ($2,423) vs Last Months</p>
      </div> 
    </div>
  )
}
