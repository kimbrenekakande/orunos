import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import prisma from "@/lib/prisma"


export async function TableView() {
  
	const all = await prisma.document.findMany({
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
          <TableHead className="text-right">Last Edited</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {all.map((paper) => (
            
            <TableRow key={paper.id}  className="hover:text-orange-700">
              <TableCell className="font-medium">
                <Link  href={`/dashboard/coursework/editor/${paper.id}`} className="contents">
                {paper.question.substring(0,40)}
                </Link>
              </TableCell>
              <TableCell>{paper.docTypeId}</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell >date</TableCell>
              <TableCell className="text-right">date</TableCell>
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
