"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { FloatingDock } from "@/components/ui/floating-dock";
import { links } from "@/lib/floater";

export function PlateEditor({ md }: { md: string }) {
	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(md),
	});

	// Assuming `editor` is your Plate editor instance with content
	// const markdownOutput = editor.api.markdown.serialize();
	// console.log(markdownOutput);

	return (
		<Plate editor={editor}>
			<EditorContainer>
				<Editor variant="default" />
				<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
					<FloatingDock
						// mobileClassName="translate-y-20" // only for demo, remove for production
						items={links}
					/>
				</div>
			</EditorContainer>
		</Plate>
	);
}
