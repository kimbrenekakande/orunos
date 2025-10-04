import { AppSidebar } from "@/components/app-sidebar"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"
// import { SiteHeader } from "@/components/site-header"
import {
  // SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// import data from "./data.json"

export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <SidebarProvider style={{"--sidebar-width": "calc(var(--spacing) * 72)","--header-height": "calc(var(--spacing) * 12)",} as React.CSSProperties}>
      <AppSidebar variant="inset" />
      {children}
    </SidebarProvider>
  )
}
