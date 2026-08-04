import baseUrl from "@/lib/base-url";
import { mutate } from "swr";
import { redirect } from "next/navigation";
import { useEditorRef } from "platejs/react";
import { FloppyDiskIcon } from "@phosphor-icons/react";
import { ToolbarButton } from "../../toolbar";
import { MarkdownPlugin } from "@platejs/markdown";
import { EditorTypeWithCustomFields } from "@/lib/types";

export function SaveChangesButton() {
	const editor = useEditorRef<EditorTypeWithCustomFields>();
	const documentId: string = editor.documentData.documentId;

	return (
		<ToolbarButton
			onClick={async () => {
				// Custom action to save editor changes to the

				console.log(editor.documentData);
				try {
					const changes = editor.getApi(MarkdownPlugin).markdown.serialize();
					const response = await fetch(
						`${baseUrl}/api/documents/${documentId}`,
						{
							method: "PATCH",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ update: changes }),
						},
					);

					if (!response.ok) {
						throw new Error(`Save failed with status: ${response.status}`);
					}

					await mutate(`${baseUrl}/api/documents/${documentId}`);
					await new Promise((resolve) => setTimeout(resolve, 800));
					redirect("/dashboard");
				} catch (error) {
					console.error("Failed to save:", error);
				}
				// redirect("/dashboard");
			}}
			tooltip="Save Changes"
		>
			<FloppyDiskIcon size={26} />
		</ToolbarButton>
	);
}
