import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/tiptapui/tabs";
import { ChatTab } from "./chat-tab";
import { CitationsTab } from "./citations-tab";
import { PanelHeader } from "./panel-header";

export function SidePanel() {
	return (
		<div className="h-full w-full overflow-hidden">
			<div className="h-full">
				<Tabs defaultValue="chat" className="w-full h-full">
					<TabsContent value="chat" className="flex min-h-0 flex-col">
						<PanelHeader tabTitle="Chat" />
						<ChatTab />
					</TabsContent>

					<TabsContent value="citations" className="flex min-h-0 flex-col">
						<PanelHeader tabTitle="Citations" />
						<CitationsTab />
					</TabsContent>

					<TabsList className="w-full flex-end rounded-none bg-transparent border-t">
						<TabsTrigger value="chat" className="rounded">
							Chat
						</TabsTrigger>
						<TabsTrigger value="citations" className="rounded">
							Citations
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</div>
	);
}
