'use client'

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { SettingsDialog } from "@/components/editor/settings-dialog";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";

export function PlateEditor({md} : {md : string}) {

  console.log(`now_content : ${md}`);

	const editor = usePlateEditor({
		plugins: EditorKit,
		value: (editor) =>
			editor.getApi(MarkdownPlugin).markdown.deserialize(md),
	});

	// Assuming `editor` is your Plate editor instance with content
	// const markdownOutput = editor.api.markdown.serialize();
	// console.log(markdownOutput);

	return (
		<Plate editor={editor}>
			<EditorContainer>
				<Editor variant="default" />
			</EditorContainer>

			<SettingsDialog />
		</Plate>
	);
}
