import { useEditorRef } from "platejs/react";
import { BlockSelectionPlugin } from '@platejs/selection/react';
import { SelectionBackgroundIcon } from "@phosphor-icons/react";
import { ToolbarButton } from "../../toolbar";

import { redirect } from 'next/navigation';

export function BlockButton() {
  const editor = useEditorRef()
  const handleClick = () => {
    const selected = editor.getApi(BlockSelectionPlugin).blockSelection.getNodes();
    console.log(selected)
  }

  return (
    <ToolbarButton
      onClick = {handleClick}
      tooltip="Go Back"
    >
      <SelectionBackgroundIcon size={26} weight="thin"/>
    </ToolbarButton >
  )
}