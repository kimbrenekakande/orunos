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
import { usePDF } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { mutate } from "swr";

export function PlateEditor({ md }: { md: Mdprops }) {
  const router = useRouter();
  const { id, title, content } = md;
  const { data, isPending, error, refetch } = authClient.useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: (editor) =>
      editor.getApi(MarkdownPlugin).markdown.deserialize(content),
  });

  const newData = editor.api.markdown.serialize();
  const [instance, updateInstance] = usePDF({
    document: <MyDoc title={title} content={newData} />,
  });

  useEffect(() => {
    updateInstance(<MyDoc title={title} content={newData} />);
  }, [newData, title, updateInstance]);

  async function SaveEditorText() {
    setIsSaving(true);
    try {
      const changes = editor.api.markdown.serialize();
      const response = await fetch(`${baseUrl}/api/papers/update?id=${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ update: changes }),
      });

      if (!response.ok) {
        throw new Error(`Save failed with status: ${response.status}`);
      }

      await mutate(`${baseUrl}/api/papers/fetch?id=${id}`);
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.replace("/dashboard");
    } catch (error) {
      console.error("Failed to save:", error);
      setIsSaving(false);
    }
  }

  function handleDownload() {
    if (instance.loading) return;

    if (instance.error) {
      console.error("PDF generation error:", instance.error);
      return;
    }

    if (instance.url) {
      setIsDownloading(true);
      const a = document.createElement("a");
      a.href = instance.url;
      a.download = `${title}.pdf`;
      a.click();
      setTimeout(() => setIsDownloading(false), 1000);
    }
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
            isDownloading={isDownloading || instance.loading}
          />
        </div>
      </EditorContainer>
    </Plate>
  );
}
