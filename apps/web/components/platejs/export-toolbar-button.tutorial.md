# ExportToolbarButton — Tutorial & Architecture Guide

## Overview

`ExportToolbarButton` is a toolbar button that renders a dropdown menu with four export options:
**HTML**, **PDF**, **Image (PNG)**, and **Markdown**. Each option serializes the current
editor content into the target format and triggers a browser download.


## Component Architecture

```
ExportToolbarButton
├── DropdownMenu (Radix UI)
│   ├── DropdownMenuTrigger
│   │   └── ToolbarButton (icon + "Export" tooltip)
│   └── DropdownMenuContent
│       └── DropdownMenuGroup
│           ├── DropdownMenuItem → exportToHtml()
│           ├── DropdownMenuItem → exportToPdf()
│           ├── DropdownMenuItem → exportToImage()
│           └── DropdownMenuItem → exportToMarkdown()
```

### State

| State | Type | Purpose |
|-------|------|---------|
| `open` | `boolean` | Controls the dropdown menu visibility. Passed as `pressed` to `ToolbarButton` so the button appears "active" (accent-colored) when the menu is open. |

### Props

Accepts all `@radix-ui/react-dropdown-menu` `DropdownMenuProps` (spread onto the root `DropdownMenu`), allowing callers to control alignment, modality, etc.


## Export Pipeline

All four exports share a common **download helper** (`downloadFile`), but differ in how they produce the file blob/data-URL.

```
User clicks menu item
        │
        ▼
onSelect fires exportTo●()
        │
        ▼
   Format-specific serialization builds a blob or data-URL
        │
        ▼
      downloadFile(url, filename)
        │
        ├── fetch(url) → Blob → ObjectURL
        ├── create <a> element
        ├── click() triggers download
        └── revokeObjectURL() cleans up
```


## Format-by-Format Walkthrough

### 1. HTML Export (`exportToHtml`)

**Goal:** Produce a self-contained `.html` file that renders the editor content faithfully in a browser.

**Steps:**

1. **Clone the editor state** — `createSlateEditor({ plugins: BaseEditorKit, value: editor.children })` creates a headless editor instance with the current document tree. Using `BaseEditorKit` (not the full `EditorKit`) avoids pulling in interactive UI plugins.

2. **Serialize to static HTML** — `serializeHtml(editorStatic, { editorComponent: EditorStatic, props: { ... } })` walks the Slate document tree and renders each node through its Plate component. `EditorStatic` is a non-interactive version (`PlateStatic`) that produces pure HTML without attaching event listeners or React roots.

3. **Assemble the full HTML document** — The serialized HTML is wrapped in a complete `<!DOCTYPE html>` page with:
   - Inter & JetBrains Mono fonts (Google Fonts)
   - Tailwind CSS stylesheet (from `siteUrl`)
   - KaTeX CSS for math rendering
   - Custom CSS variables for font families

4. **Create data URL** — `data:text/html;charset=utf-8,...` (URL-encoded)

5. **Download** via `downloadFile`.

### 2. PDF Export (`exportToPdf`)

**Goal:** Produce a pixel-perfect PDF screenshot of the editor.

**Steps:**

1. **Render editor to canvas** via `getCanvas()` (see "Canvas Rendering" below).

2. **Embed canvas into PDF** using `pdf-lib`:
   - `PDFDocument.create()` — new blank PDF
   - `addPage([width, height])` — page sized to match the canvas pixels
   - `embedPng(canvas.toDataURL('PNG'))` — rasterize the canvas as PNG and embed it
   - `drawImage(imageEmbed, { width, height, x: 0, y: 0 })` — draw full-bleed
   - `saveAsBase64({ dataUri: true })` — output as `data:application/pdf;base64,...`

3. **Download** via `downloadFile`.

> **Note:** This is a raster-based approach — the PDF contains a single bitmap image of the editor, not selectable text. For selectable text, you'd need a different pipeline (e.g., `@react-pdf/renderer` or a server-side converter).

### 3. Image Export (`exportToImage`)

The simplest path — one canvas render plus one data-URL download.

1. **Render editor to canvas** via `getCanvas()`.
2. **`canvas.toDataURL('image/png')`** — produces `data:image/png;base64,...`
3. **Download** via `downloadFile`.

### 4. Markdown Export (`exportToMarkdown`)

**Goal:** Extract the raw Markdown source from the editor.

1. `editor.getApi(MarkdownPlugin).markdown.serialize()` — Plate's Markdown plugin serializes the Slate document tree into a Markdown string.
2. Create data URL: `data:text/markdown;charset=utf-8,...`
3. Download via `downloadFile`.


## Canvas Rendering (`getCanvas`)

Shared by PDF and Image exports. Uses `html2canvas-pro` (a maintained fork of `html2canvas`).

```ts
const getCanvas = async () => {
  // 1. Create a <style> element (currently unused but available for injecting
  //    styles during capture).
  const style = document.createElement('style');
  document.head.append(style);

  // 2. Capture the editor DOM node to a canvas.
  const canvas = await html2canvas(editor.api.toDOMNode(editor)!, {
    onclone: (document: Document) => {
      // html2canvas clones the DOM before rendering.
      // This callback runs on the clone, so mutations here don't
      // affect the live page.
      const editorElement = document.querySelector('[contenteditable="true"]');

      if (editorElement) {
        // Force a consistent sans-serif font stack on every element
        // inside the cloned editor. This ensures the rendered image
        // matches what the user sees, even if custom fonts aren't
        // loaded in the html2canvas worker.
        Array.from(editorElement.querySelectorAll('*')).forEach((element) => {
          const existingStyle = element.getAttribute('style') || '';
          element.setAttribute(
            'style',
            `${existingStyle}; font-family: ..., sans-serif !important`
          );
        });
      }
    },
  });

  // 3. Clean up the injected style element.
  style.remove();
  return canvas;
};
```

**Key details:**

| Aspect | Detail |
|--------|--------|
| Library | `html2canvas-pro` — dynamically `import()`ed to avoid bloating the main bundle |
| DOM target | `editor.api.toDOMNode(editor)!` — the Plate editor's root DOM element |
| Font forcing | Injects `!important` font-family on every child element to ensure consistent rendering |
| Clone safety | `onclone` operates on a detached DOM clone, so no side effects on the live editor |


## `downloadFile` — The Download Helper

```ts
const downloadFile = async (url: string, filename: string) => {
  const response = await fetch(url);       // 1. Fetch the data/object URL
  const blob = await response.blob();       // 2. Convert to Blob
  const blobUrl = URL.createObjectURL(blob);// 3. Create a new object URL

  const link = document.createElement('a'); // 4. Programmatic <a> click
  link.href = blobUrl;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(blobUrl);            // 5. Clean up memory
};
```

**Why not just set `link.href = url` directly?** Because data URLs (especially for PDFs)
are large. Creating a Blob + Object URL is more memory-efficient for the download
and avoids hitting URL length limits in some browsers.


## Dependency Map

```
ExportToolbarButton
│
├── @radix-ui/react-dropdown-menu  →  DropdownMenu UI primitives
├── @platejs/markdown (MarkdownPlugin) →  Markdown serialization
├── platejs (createSlateEditor)    →  Headless editor for HTML export
├── platejs/react (useEditorRef)   →  Access the current editor instance
├── platejs/static (serializeHtml) →  Render Slate tree to static HTML
│
├── html2canvas-pro (dynamic import) →  Canvas-based screenshots
├── pdf-lib (dynamic import)        →  PDF generation
│
├── @/components/platejs/dropdown-menu  →  Wrapped Radix dropdown components
├── @/components/platejs/toolbar        →  ToolbarButton (with tooltip HOC)
├── @/components/platejs/editor-static  →  PlateStatic wrapper for HTML export
└── @/components/editor/editor-base-kit →  Base plugin kit (no UI deps)
```

**Dynamic imports:** `html2canvas-pro` and `pdf-lib` are only loaded when the user
clicks "Export as PDF" or "Export as Image", keeping the initial bundle smaller.


## Integration Example

```tsx
import { ExportToolbarButton } from '@/components/platejs/export-toolbar-button';

// Inside your toolbar:
<FixedToolbar>
  <ToolbarGroup>
    <ExportToolbarButton modal={false} />
  </ToolbarGroup>
</FixedToolbar>
```

The `modal={false}` prop is important — it allows the user to interact with the
editor while the dropdown is open (useful for checking content before exporting).


## Edge Cases & Limitations

| Case | Behavior |
|------|----------|
| Empty editor | All exports produce empty/near-empty files (no crash) |
| Math (KaTeX) content | HTML export includes KaTeX CSS; PDF/Image capture the rendered math |
| Custom fonts | PDF/Image exports force a system font stack to avoid missing glyphs |
| Large documents | `html2canvas` may be slow or hit canvas size limits for very tall documents |
| PDF text-selectability | **Not supported** — the PDF is a raster image, not text |
