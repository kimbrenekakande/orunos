// --------------------------------------------------------------------------
// ExportToolbarButton — Dropdown menu for exporting editor content in 4 formats
// --------------------------------------------------------------------------
//
// Formats:
//   1. HTML  — Serializes the editor tree to a self-contained .html page
//   2. PDF   — Renders the editor to a canvas, embeds it as a PNG in a PDF
//   3. Image — Renders the editor to a canvas, downloads as PNG
//   4. MD    — Serializes the Plate document to a Markdown string
//
// Architecture:
//   - All 4 paths funnel through a shared `downloadFile()` helper
//   - `getCanvas()` (used by PDF & Image) dynamically imports html2canvas-pro
//   - PDF additionally dynamically imports pdf-lib for document creation
//   - HTML export clones the editor state via createSlateEditor + serializeHtml
//     so it doesn't require a live React root
//
// Dynamic imports (html2canvas-pro, pdf-lib) keep the initial bundle smaller
// — they're only fetched when the user clicks PDF/Image export.
// --------------------------------------------------------------------------

"use client";

import * as React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { MarkdownPlugin } from "@platejs/markdown";
import { ArrowDownToLineIcon } from "lucide-react";
import { useEditorRef } from "platejs/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/platejs/dropdown-menu";
import { ToolbarButton } from "./toolbar";
import { pdf } from "@react-pdf/renderer";
import { MyDoc } from "../editor/savePDF";
import { createAndDownloadDocx } from "../editor/saveDOCX";

export function ExportToolbarButton(props: DropdownMenuProps) {
	const editor = useEditorRef();
	const [open, setOpen] = React.useState(false); // Tracks whether the dropdown menu is open. Passed as `pressed` to  ToolbarButton so the button gets accent styling while the menu is visible.

	const documentTitle = (editor.documentData as { documentTitle: string })
		.documentTitle;
	const content = editor.getApi(MarkdownPlugin).markdown.serialize();

	// exportToPdf — Generate a PDF from editor content using @react-pdf/renderer
	const exportToPdf = async () => {
		const blob = await pdf(
			<MyDoc title={documentTitle as string} content={content} />,
		).toBlob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${documentTitle || "document"}.pdf`;
		a.click();
		URL.revokeObjectURL(url);
	};

	// exportToMarkdown — Serialize the Plate document to a Markdown string
	const exportToDOCX = async () => {
		// console.log(content)
		createAndDownloadDocx(content, documentTitle as string);
	};

	return (
		// modal={false} allows the user to interact with the editor while the
		// dropdown is open (e.g. to check content before exporting).
		<DropdownMenu
			open={open}
			onOpenChange={setOpen}
			modal={false}
			{...(props as any)}
		>
			<DropdownMenuTrigger asChild>
				{/* `pressed={open}` highlights the button (accent color) while the
            dropdown is visible. `isDropdown` renders a chevron indicator. */}
				<ToolbarButton pressed={open} tooltip="Export" isDropdown>
					<ArrowDownToLineIcon className="size-4" />
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start">
				<DropdownMenuGroup>
					{/* Each `onSelect` fires when the user clicks (or keyboard-selects)
              a menu item. The export function runs and the menu closes. */}
					{/*<DropdownMenuItem onSelect={exportToMarkdown}>
            Export as HTML
          </DropdownMenuItem>*/}
					<DropdownMenuItem onSelect={exportToPdf}>
						Export as PDF
					</DropdownMenuItem>
					{/*<DropdownMenuItem onSelect={exportToMarkdown}>
            Export as Image
          </DropdownMenuItem>*/}
					<DropdownMenuItem onSelect={exportToDOCX}>
						Export as DOCX
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
