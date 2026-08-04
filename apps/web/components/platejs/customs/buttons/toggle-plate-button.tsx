import { useEditorRef } from "platejs/react";
import { WarningCircleIcon } from "@phosphor-icons/react"
import { ToolbarButton } from "../../toolbar";
import { togglePanel } from "@/components/editor/plate-editor";


export function TogglePlaneButton() {
  const editor = useEditorRef();
  
  return (
    <ToolbarButton
      onClick = {() => {
        togglePanel()
      }}
      tooltip="toggle plane tool"
    >
      <WarningCircleIcon size={26} />
    </ToolbarButton >
  )
}