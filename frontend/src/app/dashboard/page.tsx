"use client"
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { PromptBox } from "@/components/ui/chatgpt-prompt-input";

export default function Page() {
	return (
		<SidebarInset>
			<SiteHeader />
			<div className="flex flex-1 flex-col items-center justify-center h-full w-full">
        <div className="w-[90%] mx-auto md:w-[50%]">
          <PromptBox />
        </div>
      </div>
		</SidebarInset>
	);
}
