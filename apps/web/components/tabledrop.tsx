"use client"

import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/tiptapui/dropdown-menu"
import { PencilIcon, ShareIcon, TrashIcon, EllipsisIcon } from "lucide-react"
import { Button } from "./tiptapui/button"

export function DropdownMenuDestructive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Link href="/dashboard" className="flex justify-between gap-2">
            <DropdownMenuItem className=" w-full">
              <PencilIcon />
              Edit
            </DropdownMenuItem>
          </ Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" className="min-w-full"
            onSelect={
              () => {
                // e.preventDefault()
                console.log("Delete")
              }
            }>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
