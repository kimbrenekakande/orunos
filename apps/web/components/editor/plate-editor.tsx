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
import { MorphingExpandableMenu } from "@/components/ruixen/morphing-expandable-menu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "sonner";


export function PlateEditor({ md }: { md: Mdprops }) {
  const router = useRouter();
  const { id, title, content } = md;
  const { data, isPending, error, refetch } = authClient.useSession();

  const editor = usePlateEditor({
    plugins: EditorKit,
    value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(content),
  });

  const newData = editor.api.markdown.serialize();

  async function SaveEditorText() {
    const changes = editor.api.markdown.serialize();
    await fetch(`${baseUrl}/api/papers/update?id=${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ update: changes }),
    });
    router.push("/dashboard");
  }

  function handleDownload() {
    toast.success("PDF download started", { position: "top-center" });
  }

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="default" />
        <div className="fixed bottom-5 right-10 -translate-x-1/2 z-50 rounded-4xl h-19">
          <MorphingExpandableMenu
            onSave={SaveEditorText}
            onDownload={handleDownload}
          />
          <PDFDownloadLink
            document={<MyDoc title={title} content={newData} />}
            fileName={`${title}.pdf`}
            className="hidden"
          >
            Download
          </PDFDownloadLink>
        </div>
      </EditorContainer>
    </Plate>
  );
}
