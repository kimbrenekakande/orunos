"use client";

import { Save, FileDown } from "lucide-react";

interface SimpleEditorMenuProps {
  onSave: () => void;
  onDownload: () => void;
}

export function SimpleEditorMenu({ onSave, onDownload }: SimpleEditorMenuProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border border-border/60 bg-popover shadow-xl shadow-black/8 p-1">
      <button
        onClick={onSave}
        className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-500 hover:cursor-pointer"
        title="Save"
      >
        <Save className="size-[17px]" />
      </button>
      <button
        onClick={onDownload}
        className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-500 hover:cursor-pointer"
        title="Download"
      >
        <FileDown className="size-[17px]" />
      </button>
    </div>
  );
}