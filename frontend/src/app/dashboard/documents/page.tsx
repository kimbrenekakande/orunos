import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Page() {
	return (
		<SidebarInset>
			<SiteHeader />
			<div className="flex flex-1 flex-col items-center justify-center">
        <h1>Documents List</h1>
      </div>
		</SidebarInset>
	);
}
