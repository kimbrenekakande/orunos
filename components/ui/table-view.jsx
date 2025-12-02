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
  
	const all = await prisma.document.findMany() // all papers array

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
            <Link key={paper.id}  href={`/dashboard/coursework/editor/${paper.id}`} className="contents">
              <TableRow  className="hover:text-orange-700">
                <TableCell className="font-medium">{paper.question.substring(0,40)}</TableCell>
                <TableCell>Coursework</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell >date</TableCell>
                <TableCell className="text-right">date</TableCell>
              </TableRow>
            </Link>
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
