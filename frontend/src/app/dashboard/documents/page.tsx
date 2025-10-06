import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import data from "@/lib/data.json"
import { DataTable } from "@/components/data-table"

export default function Page() {
	return (
		<SidebarInset>
			<SiteHeader />
			<div className="flex flex-1 flex-col items-center justify-center">
        <DataTable data={data} />
      </div>
		</SidebarInset>
	);
}
