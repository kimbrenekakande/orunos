import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader,TableRow } from "@/components/ui/table"
import Link from "next/link"
import clsx from "clsx"
import prisma from "@/lib/prisma"
import { DropdownMenuDestructive } from "../tabledrop"


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
      <TableCaption>A list of your recent papers.</TableCaption>
      <TableHeader>
        <TableRow  className="text-orange-700">
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          {/* <TableHead className="text-right">Last Edited</TableHead>*/}
        </TableRow>
      </TableHeader>
      <TableBody>
          {all.map((paper) => (
            
            <TableRow key={paper.id}  className="hover:text-orange-700">
              <TableCell className="font-medium">
                <Link  href={`/dashboard/coursework/editor/${paper.id}?source=table`} className="contents">
                {paper.question.substring(0,40)}
                </Link>
              </TableCell>
              <TableCell>{paper.docTypeId}</TableCell>
              <TableCell className={clsx(
                "text-4xl",
                {"text-red-900" : paper.status === "GENERATING"},
                {"text-green-600" : paper.status === "READY"}
              )}>&deg;</TableCell>
              <TableCell>{ paper.createdAt.toISOString().split('T')[0] }</TableCell>
              {/* <TableCell className="text-right">{paper.updatedAt.toISOString().split('T')[0]}</TableCell>*/}
              <TableCell className="mx-16">
                <DropdownMenuDestructive />
              </TableCell>
            </TableRow>
          ))}
        
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>Total Papers</TableCell> */}
          {/* <TableCell className="text-right">90</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  )
}
