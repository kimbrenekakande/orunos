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
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"

async function TableView() { 
  const all = await prisma.document.findMany({
    where: {
      userId : "qDbVJ4plN6jLeuZF0IbD9SkcJKFBSNfS",
    },
    orderBy : {
      createdAt : 'desc'
    }
  }) // all papers array
  
  console.log(all)
}

TableView()