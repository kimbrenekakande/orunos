"use client";
import { PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./doc";

export default function PaperPage() {
	return (
		<div className="h-screen w-full">
			<PDFViewer width="100%" height="100%">
				<MyDocument />
			</PDFViewer>
		</div>
	);
}
