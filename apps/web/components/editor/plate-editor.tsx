"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { Mdprops } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { SidePanel } from "../platejs/customs/side-panel";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/tiptapui/resizable";

import { useSelectedText } from "@/lib/store";

export function PlateEditor({ md }: { md: Mdprops }) {
	const { id, title, content } = md;
	const { data, isPending, error, refetch } = authClient.useSession();
	const { selectedText, setSelectedText } = useSelectedText();

	// initialize editor with content from markdown
	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(content ?? ""),
	});

	// set document data for use in cutom editor buttons
	editor.documentData = { documentId: id, documentTitle: title };

	return (
		<ResizablePanelGroup orientation="horizontal">
			<ResizablePanel defaultSize="0%" collapsible></ResizablePanel>
			<ResizableHandle withHandle={true} />
			<ResizablePanel className="rounded">
				<Plate
					editor={editor}
					onSelectionChange={({ editor, selection }) => {
						const text = selection ? editor.api.string(selection) : "";
						setSelectedText(text);
						console.log(text);
					}}
				>
					<EditorContainer>
						<Editor variant="default" />
					</EditorContainer>
				</Plate>
			</ResizablePanel>
			<ResizableHandle withHandle={true} />
			<ResizablePanel defaultSize="20%" collapsible>
				<SidePanel />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
