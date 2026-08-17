"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { Mdprops } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { SidePanel } from "../platejs/customs/side-panel";
import { TocPane } from "../platejs/customs/left-panel";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/tiptapui/resizable";

import { useSelectedText } from "@/lib/store";

export function PlateEditor({ md }: { md: Mdprops }) {
	const { id, title, content } = md;
	// const { data, isPending, error, refetch } = authClient.useSession();
	const { setSelectedText } = useSelectedText();

	// initialize editor with content from markdown
	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) =>
			editor.getApi(MarkdownPlugin).markdown.deserialize(content ?? ""),
		onReady: ({ editor }) => {
			editor.documentData = { documentId: id, documentTitle: title };
		},
	});

	return (
		<Plate
			editor={editor}
			onSelectionChange={({ editor, selection }) => {
				console.log("No Fukin Selection");
				console.log(selection);
				const text = selection ? editor.api.string(selection) : "";

				// Character offsets of the selection within the whole document.
				let from = 0;
				let to = 0;

				if (selection && text) {
					const docStart = editor.api.start([]);
					const [startPoint, endPoint] = editor.api.edges(selection) ?? [];

					if (docStart && startPoint) {
						const startRange = editor.api.range(docStart, startPoint);
						if (startRange) from = editor.api.string(startRange).length;
					}

					if (docStart && endPoint) {
						const endRange = editor.api.range(docStart, endPoint);
						if (endRange) to = editor.api.string(endRange).length;
					}
				}

				// setting the selection to a global state
				setSelectedText({
					text,
					children: editor.children,
					selection: selection ?? null,
					from,
					to,
				});
			}}
		>
			<ResizablePanelGroup orientation="horizontal">
				<ResizablePanel defaultSize="25%" collapsible>
					<TocPane />
				</ResizablePanel>
				<ResizableHandle withHandle={true} />
				<ResizablePanel className="rounded">
					<EditorContainer>
						<Editor variant="default" />
					</EditorContainer>
				</ResizablePanel>
				<ResizableHandle withHandle={true} />
				<ResizablePanel defaultSize="25%" collapsible>
					<SidePanel />
				</ResizablePanel>
			</ResizablePanelGroup>
		</Plate>
	);
}
