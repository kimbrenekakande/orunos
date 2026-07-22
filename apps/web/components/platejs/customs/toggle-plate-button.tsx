import { useEditorRef } from "platejs/react";
import { ArrowsClockwiseIcon, WarningCircleIcon, FileTextIcon } from "@phosphor-icons/react"
import { ToolbarButton } from "../toolbar";


export function TogglePlaneButton() {
  const editor = useEditorRef();
  
  return (
    <ToolbarButton
      onClick = {() => {
        // Custom action to toggle the plane 
        editor.tf.insertText("this is the shit")
      }}
      tooltip="toggle plane tool"
    >
      <WarningCircleIcon size={26} />
    </ToolbarButton >
  )
}