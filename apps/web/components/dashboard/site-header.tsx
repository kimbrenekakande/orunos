'use client'
// import { Button } from "@/components/dashboard/button"
// import { Separator } from "@/components/dashboard/separator"
import { SidebarTrigger } from "@/components/dashboard/sidebar"
import { ModeToggle} from "@/components/ui/theme-toggle"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard/avatar"
import { NavUser } from "./nav-user"

export function SiteHeader() { 
  const kubo = usePathname().includes('/editor/')
  
  const user =  {
    name: "kakande",
    email: "kimbrene@gmail.com",
    avatar: "/images/tree.jpg",
  }


  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full justify-between px-8 mt-16">
        {/*<SidebarTrigger className="-ml-1" />*/}
        <div className="flex justify-between ">
          <ModeToggle/>
        </div>
        
        <div className="bg-blue-600s">
          <NavUser user={user} />
          {/*<Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>*/}
        </div>  
      </div>
    </header>
  )
}