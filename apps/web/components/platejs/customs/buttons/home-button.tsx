import { useEditorRef } from "platejs/react";

import { HouseIcon } from "@phosphor-icons/react";
import { ToolbarButton } from "../../toolbar";

import { redirect } from 'next/navigation';

export function GoHomeButton() {
  
  return (
    <ToolbarButton
      onClick = {() => {
        // Custom action to toggle the plane 
        redirect("/dashboard");
      }}
      tooltip="Go Back"
    >
      <HouseIcon size={26} weight="thin"/>
    </ToolbarButton >
  )
}