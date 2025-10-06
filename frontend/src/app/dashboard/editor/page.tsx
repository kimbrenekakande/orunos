import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import TiptapEditor from "@/components/editor";

export default function Page() {
	return (
		<SidebarInset>
			<SiteHeader />
			<div className="min-h-screen bg-white">
        <TiptapEditor />
      </div>
		</SidebarInset>
	);
}
