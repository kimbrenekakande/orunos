"use client";

import { useState } from "react";
import { Save, FileDown, Loader } from "lucide-react";

interface SimpleEditorMenuProps {
  onSave: () => void;
  onDownload: () => void;
  isSaving?: boolean;
  isDownloading?: boolean;
}

type ActiveIcon = "save" | "download";

export function SimpleEditorMenu({ onSave, onDownload, isSaving, isDownloading }: SimpleEditorMenuProps) {
  const [activeIcon, setActiveIcon] = useState<ActiveIcon | null>(null);

  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border border-border/60 bg-popover shadow-xl shadow-black/8 p-1">
      <button
        onClick={onSave}
        onMouseEnter={() => setActiveIcon("save")}
        onMouseLeave={() => setActiveIcon(null)}
        disabled={isSaving}
        className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
          activeIcon === "save"
            ? "bg-amber-500/10 text-amber-500"
            : "text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500"
        }`}
        title="Save"
      >
        {isSaving ? (
          <Loader className="size-[17px] animate-spin" />
        ) : (
          <Save className="size-[17px]" />
        )}
      </button>
      <button
        onClick={onDownload}
        onMouseEnter={() => setActiveIcon("download")}
        onMouseLeave={() => setActiveIcon(null)}
        disabled={isDownloading}
        className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
          activeIcon === "download"
            ? "bg-amber-500/10 text-amber-500"
            : "text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500"
        }`}
        title="Download"
      >
        {isDownloading ? (
          <Loader className="size-[17px] animate-spin" />
        ) : (
          <FileDown className="size-[17px]" />
        )}
      </button>
    </div>
  );
}