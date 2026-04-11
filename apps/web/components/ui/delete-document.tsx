'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/tiptapui/alert-dialog"
import { Trash2Icon } from "lucide-react"
import baseUrl from "@/lib/base-url"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


export function DeleteDocument({ id }: { id: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    setIsLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/papers/delete?id=${id}`, { method: 'DELETE' })
      if (!res.ok) {
        console.error('Failed to delete document')
        return
      }
      router.refresh()
      return toast.success("Document has been Deleted", { position: "top-center" })
    } catch (error) {
      console.error('Error deleting document:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button 
          className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground/40 hover:text-destructive transition-all duration-200"
          aria-label="Delete document"
        >
          <Trash2Icon className="h-[18px] w-[18px]" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Document?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this document. View{" "}
            <a href="#">Settings</a> delete any memories saved during this document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
