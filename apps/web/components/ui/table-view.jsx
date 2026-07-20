import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { FileText, Clock, MoreHorizontal } from "lucide-react"
import { DeleteDocument } from "@/components/ui/delete-document"

export async function TableView({ user, docs }) {
  const all = await prisma.document.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (all.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No documents yet</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Create your first document to get started</p>
      </div>
    )
  }

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="border-b border-border/60 hover:bg-transparent">
          <TableHead className="h-12 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold w-[50%]">Document</TableHead>
          <TableHead className="h-12 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold text-center w-[15%]">Type</TableHead>
          <TableHead className="h-12 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold text-center w-[15%]">
            <div className="flex items-center justify-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              Status
            </div>
          </TableHead>
          <TableHead className="h-12 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold text-center w-[15%]">
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="h-3 w-3" />
              Modified
            </div>
          </TableHead>
          <TableHead className="h-12 pr-4 w-[5%]">
            <div className="flex justify-end">
              <MoreHorizontal className="h-[14px] w-[14px] text-muted-foreground/40" />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {all.map((paper) => (
          <TableRow 
            key={paper.id} 
            className="group border-b border-border/50 [&:last-child]:border-0 hover:bg-muted/40 transition-colors duration-150"
          >
            <TableCell className="py-3.5">
              <Link 
                href={`/dashboard/coursework/editor/${paper.id}?source=table`} 
                className="flex items-center gap-3.5 text-sm font-medium text-foreground/90 hover:text-foreground transition-colors duration-150"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded bg-muted/80 group-hover:bg-muted transition-colors duration-150 shrink-0">
                  <FileText className="h-4 w-4 text-muted-foreground/70" />
                </div>
                <span className="truncate min-w-0 flex-1" title={paper.question}>{paper.question.charAt(0).toUpperCase() + paper.question.slice(1)}</span>
              </Link>
            </TableCell>
            <TableCell className="py-3.5 text-center">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted/80 text-muted-foreground border border-border/50">
                {paper.docTypeId}
              </span>
            </TableCell>
            <TableCell className="py-3.5 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className={`relative inline-flex h-2 w-2 rounded-full ${
                  paper.status === "READY" ? "bg-emerald-500" : "bg-amber-500"
                }`}>
                  {paper.status === "GENERATING" && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-amber-400 opacity-50" />
                  )}
                </span>
                <span className="text-[11px] text-muted-foreground/80 hidden sm:inline">
                  {paper.status === "READY" ? "Ready" : "Processing"}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-3.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground/80">
                <Clock className="h-3 w-3" />
                <span className="hidden sm:inline">
                  {paper.updatedAt.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: paper.updatedAt.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                  })}
                </span>
                <span className="sm:hidden">
                  {paper.updatedAt.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-3.5">
              <div className="flex justify-end">
                <DeleteDocument id={paper.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
