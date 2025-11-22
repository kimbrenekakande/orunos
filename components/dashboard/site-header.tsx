// import { Button } from "@/components/dashboard/button"
// import { Separator } from "@/components/dashboard/separator"
import { SidebarTrigger } from "@/components/dashboard/sidebar"
import { ModeToggle} from "@/components/ui/theme-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}
