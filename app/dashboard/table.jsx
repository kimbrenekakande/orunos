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
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]


export async function TableView() {
	const all = await prisma.coursework.findMany() // all papers array
  console.log(all)

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
