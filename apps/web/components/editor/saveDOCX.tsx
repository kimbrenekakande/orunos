import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
/**
 * Generate a .docx file from markdown content and trigger a browser download.
 *
 * Uses `Packer.toBlob()` (browser-compatible) instead of `Packer.toBuffer() +
 * fs.writeFileSync` (Node-only) so it works in Next.js client components.
 */
export async function createAndDownloadDocx(content: string, title = "document.docx") {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun(content),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = title;
  a.click();
  URL.revokeObjectURL(url);

}
