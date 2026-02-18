import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader,TableRow } from "@/components/ui/table"
import Link from "next/link"
import clsx from "clsx"
import prisma from "@/lib/prisma"
import { FileText} from "lucide-react"
import {DeleteDocument} from "@/components/ui/delete-document"

export async function TableView( {user} ) {
  const all = await prisma.document.findMany({
    where: {
      userId : user.id,
    },
    orderBy : {
      createdAt : 'desc'
    }
  }) // all papers array
  
  return (
    <Table>
      <TableCaption>A list of your created documents.</TableCaption>
      <TableHeader>
        <TableRow  className="text-orange-700">
          <TableHead>Title</TableHead>
          <TableHead className="text-center">Doc Type</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Last Edited</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {all.map((paper) => (
          <TableRow key={paper.id} className="hover:text-orange-700">
            <TableCell className="font-medium">
              <Link href={`/dashboard/coursework/editor/${paper.id}?source=table`} className="contents flex gap-4">
              <FileText /> 
              {paper.question.substring(0,40)}
              </Link>
            </TableCell>
            <TableCell className="text-center">{paper.docTypeId}</TableCell>
            <TableCell className={clsx(
              "text-4xl text-center",
              {"text-red-900" : paper.status === "GENERATING"},
              {"text-green-600" : paper.status === "READY"}
            )}>&deg;</TableCell>
            <TableCell className="text-center">{paper.updatedAt.toISOString().split('T')[0]}</TableCell>
            <TableCell className="flex justify-center">
              <DeleteDocument id={paper.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Papers</TableCell> 
          <TableCell className="text-right">90</TableCell> 
        </TableRow>
      </TableFooter>*/}
    </Table>
  )
}
 