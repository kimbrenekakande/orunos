"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/platejs/editor";
import { MarkdownPlugin } from "@platejs/markdown";
import { useRouter } from "next/navigation";
import { Mdprops } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { MyDoc } from "./doc";
import baseUrl from "@/lib/base-url";
import { SimpleEditorMenu } from "@/components/ruixen/simple-editor-menu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";


export function PlateEditor({ md }: { md: Mdprops }) {
  const router = useRouter();
  const { id, title, content } = md;
  const { data, isPending, error, refetch } = authClient.useSession();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const editor = usePlateEditor({
    plugins: EditorKit,
    value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(content),
  });

  const newData = editor.api.markdown.serialize();

  async function SaveEditorText() {
    setIsSaving(true);
    try {
      const changes = editor.api.markdown.serialize();
      await fetch(`${baseUrl}/api/papers/update?id=${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ update: changes }),
      });
      router.replace("/dashboard");
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleDownload() {
    setIsDownloading(true);
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `${title}.pdf`;
      a.click();
    }
    setTimeout(() => setIsDownloading(false), 1000);
  }

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="default" />
        <div className="fixed bottom-10 right-10 -translate-x-1/2 z-50 rounded-4xl h-19">
          <SimpleEditorMenu
            onSave={SaveEditorText}
            onDownload={handleDownload}
            isSaving={isSaving}
            isDownloading={isDownloading}
          />
          <PDFDownloadLink
            document={<MyDoc title={title} content={newData} />}
            fileName={`${title}.pdf`}
            className="hidden"
          >
            {({ url }) => {
              if (url) setPdfUrl(url);
              return null;
            }}
          </PDFDownloadLink>
        </div>
      </EditorContainer>
    </Plate>
  );
}
