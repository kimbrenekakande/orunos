"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { useRouter } from "next/navigation";
import { Mdprops } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { MyDoc } from "./savePDF";
import baseUrl from "@/lib/base-url";
import { SimpleEditorMenu } from "@/components/ruixen/simple-editor-menu";
import { usePDF } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { SidePanel } from "../platejs/customs/side-panel";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/tiptapui/resizable";
import { usePanelRef } from "react-resizable-panels";

import { mutate } from "swr";

import { Button } from "@/components/tiptapui/button";

let togglePanelRef: (() => void) | null = null;

export function togglePanel() {
	togglePanelRef?.();
}

export function PlateEditor({ md }: { md: Mdprops }) {
	const { id, title, content } = md;
	const { data, isPending, error, refetch } = authClient.useSession();

	// initialize editor with content from markdown
	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) =>
			editor.getApi(MarkdownPlugin).markdown.deserialize(content ?? ""),
	});

	// set document data for use in cutom editor buttons
	editor.documentData = { documentId: id, documentTitle: title };

	// editor side panel trigger
	const panelRef = usePanelRef();
	// const [isCollapsed, setIsCollapsed] = useState(true)

	togglePanelRef = () => {
		if (panelRef.current?.isCollapsed()) {
			panelRef.current?.expand();
		} else {
			panelRef.current?.collapse();
		}
	};
	// const COLLAPSED_SIZE = "0%"

	return (
		<ResizablePanelGroup orientation="horizontal">
			<ResizablePanel className="rounded">
				<Plate editor={editor}>
					<EditorContainer>
						<Editor variant="default" />
					</EditorContainer>
				</Plate>
			</ResizablePanel>
			<ResizableHandle withHandle={true} />
			<ResizablePanel
				defaultSize="0%"
				collapsible
				// onResize={(size) => setIsCollapsed(Number(size) === COLLAPSED_SIZE)}
				panelRef={panelRef}
			>
				<SidePanel />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
