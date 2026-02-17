// import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/dashboard/sidebar"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orunos | Your Academic CoPilot",
  description: "Your Academic CoPilot",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/*<AppSidebar variant="inset" />*/}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          {children}           
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
