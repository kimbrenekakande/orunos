"use client"

import {
  IconCreditCard,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

export function NavUser({user}: {user: {name: string, email: string, avatar: string}}) {
  const router = useRouter()
  async function logout(){
    const{error} = await authClient.signOut()
    if (error){
      console.log(`Out Errror : ${error}`)
    }
    redirect('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 rounded-full ring-2 ring-white/20 cursor-pointer">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-full bg-blue-700 text-white">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-xl shadow-lg ring-1 ring-black/5"
        side="bottom"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-full bg-blue-100 text-blue-700">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => router.push('/dashboard/settings')}>
            <IconUserCircle className="h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => router.push('/dashboard/billing')}>
            <IconCreditCard className="h-4 w-4" />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer gap-2 text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
        >
          <IconLogout className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
