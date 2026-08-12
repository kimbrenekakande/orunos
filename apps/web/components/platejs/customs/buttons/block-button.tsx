import { useEditorRef } from "platejs/react";
import { BlockSelectionPlugin } from "@platejs/selection/react";
import { SelectionBackgroundIcon } from "@phosphor-icons/react";
import { ToolbarButton } from "../../toolbar";
import type { Descendant } from "platejs";

export function BlockButton() {
	const editor = useEditorRef();
	const handleClick = () => {
		const selected = editor.getApi(BlockSelectionPlugin).blockSelection.getNodes({
			selectionFallback: true,
			sort: true,
		});

		const content = selected
			.map(
				([node]) =>
					node.children
						?.map((child: Descendant) => ("text" in child ? child.text : ""))
						.join("") || "",
			)
			.join("\n");

		console.log({ nodeCount: selected.length, content });
	};

	return (
		<ToolbarButton onClick={handleClick} tooltip="Go Back">
			<SelectionBackgroundIcon size={26} weight="thin" />
		</ToolbarButton>
	);
}
