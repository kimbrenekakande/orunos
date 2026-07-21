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

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/tiptapui/resizable"
import {usePanelRef} from "react-resizable-panels"

import { mutate } from "swr";

import { Button } from "@/components/tiptapui/button";

export function PlateEditor({ md }: { md: Mdprops }) {
  const router = useRouter();
  const { id, title, content } = md;
  const { data, isPending, error, refetch } = authClient.useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: (editor) =>
      editor.getApi(MarkdownPlugin).markdown.deserialize(content ?? ""),
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
      const response = await fetch(`${baseUrl}/api/documents/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ update: changes }),
      });

      if (!response.ok) {
        throw new Error(`Save failed with status: ${response.status}`);
      }

      await mutate(`${baseUrl}/api/documents/${id}`);
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

  const panelRef = usePanelRef()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const togglePanel = () => {
    if (panelRef.current?.isCollapsed()) {
      panelRef.current?.expand()
    } else {
      panelRef.current?.collapse()
    }
  }

  const COLLAPSED_SIZE = 0
  
  return (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel className="rounded-lg" >
        <Button className="absolute top-2 right-2" onClick={togglePanel}>FUCK</Button>
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
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel
        defaultSize="25%"
        minSize={15}
        collapsible
        collapsedSize={COLLAPSED_SIZE}
        onResize={(size) => setIsCollapsed(Number(size) === COLLAPSED_SIZE)}
        panelRef={panelRef}
      >
        Two
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
