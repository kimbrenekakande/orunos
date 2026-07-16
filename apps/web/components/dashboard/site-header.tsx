'use client'

import { ModeToggle} from "@/components/ui/theme-toggle"
import { usePathname } from "next/navigation"
import { IconHome, IconSettings, IconCreditCard, IconLogout } from "@tabler/icons-react"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { Button } from "@/components/dashboard/button"
import Link from "next/link"

export function SiteHeader() {
  const kubo = usePathname().includes('/editor/')

  async function logout(){
    const{error} = await authClient.signOut()
    if (error){
      console.log(`Out Error : ${error}`)
    }
    redirect('/')
  }

  if (kubo) return null

  return (
    <header className="relative z-10 flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full justify-between px-6 sm:px-8 mt-16">
        <ModeToggle/>
        
        <div className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center size-9 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          >
            <IconHome className="h-[1.2rem] w-[1.2rem] pointer-events-auto" />
          </Link>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center justify-center size-9 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          >
            <IconSettings className="h-[1.2rem] w-[1.2rem] pointer-events-auto" />
          </Link>
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center justify-center size-9 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          >
            <IconCreditCard className="h-[1.2rem] w-[1.2rem] pointer-events-auto" />
          </Link>
          <button
            className="inline-flex items-center justify-center size-9 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
            onClick={logout}
          >
            <IconLogout className="h-[1.2rem] w-[1.2rem] pointer-events-auto" />
          </button>
        </div>
      </div>
    </header>
  )
}
