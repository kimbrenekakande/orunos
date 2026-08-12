'use client';

import * as React from 'react';

import {
  BaselineIcon,
  BoldIcon,
  // Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
  // WandSparklesIcon,
} from 'lucide-react';
import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';

import { AIToolbarButton } from './ai-toolbar-button';
import { AlignToolbarButton } from './align-toolbar-button';
import { CommentToolbarButton } from './comment-toolbar-button';
// import { EmojiToolbarButton } from './emoji-toolbar-button';
import { FontColorToolbarButton } from './font-color-toolbar-button';
import { FontSizeToolbarButton } from './font-size-toolbar-button';
import { RedoToolbarButton, UndoToolbarButton } from './history-toolbar-button';
// import { TogglePlaneButton } from './customs/buttons/toggle-plate-button'; // custom button
import { GoHomeButton } from './customs/buttons/home-button'; 
import { SaveChangesButton } from './customs/buttons/save-button';
import { ExportToolbarButton } from './export-toolbar-button';



import {
  IndentToolbarButton,
  OutdentToolbarButton,
} from './indent-toolbar-button';
import { InsertToolbarButton } from './insert-toolbar-button';
import { LineHeightToolbarButton } from './line-height-toolbar-button';
import { LinkToolbarButton } from './link-toolbar-button';
import {
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  TodoListToolbarButton,
} from './list-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { MediaToolbarButton } from './media-toolbar-button';
// import { ModeToolbarButton } from './mode-toolbar-button';
// import { MoreToolbarButton } from './more-toolbar-button';
import { TableToolbarButton } from './table-toolbar-button';
import { ToggleToolbarButton } from './toggle-toolbar-button';
import { ToolbarGroup, ToolbarSeparator } from './toolbar';
// import { TurnIntoToolbarButton } from './turn-into-toolbar-button';
import { BlockButton } from "./customs/buttons/block-button"

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  if (readOnly) return null;

  return (
    <>
      {/* First Row - Main Formatting */}
      <div className="flex w-full flex-wrap items-center gap-1 px-8">
        {/* Undo/Redo */}
        <ToolbarGroup>
          <GoHomeButton />
          <UndoToolbarButton />
          <RedoToolbarButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Text Formatting */}
        <ToolbarGroup className="flex-nowrap overflow-x-auto pb-1 scrollbar-hide">
          <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
            <BoldIcon className="size-4" />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘+I)">
            <ItalicIcon className="size-4" />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={KEYS.underline} tooltip="Underline (⌘+U)">
            <UnderlineIcon className="size-4" />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={KEYS.strikethrough} tooltip="Strikethrough">
            <StrikethroughIcon className="size-4" />
          </MarkToolbarButton>
          {/*<MarkToolbarButton nodeType={KEYS.code} tooltip="Code (⌘+E)">
            <Code2Icon className="size-4" />
          </MarkToolbarButton>*/}
          <MarkToolbarButton nodeType={KEYS.highlight} tooltip="Highlight">
            <HighlighterIcon className="size-4" />
          </MarkToolbarButton>
          
          <ToolbarSeparator />
          
          <FontColorToolbarButton nodeType={KEYS.color} tooltip="Text color">
            <BaselineIcon className="size-4" />
          </FontColorToolbarButton>
          <FontColorToolbarButton nodeType={KEYS.backgroundColor} tooltip="Background color">
            <PaintBucketIcon className="size-4" />
          </FontColorToolbarButton>
          
          <ToolbarSeparator />
          
          <FontSizeToolbarButton />
          <LineHeightToolbarButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Lists & Alignment */}
        <ToolbarGroup>
          <BulletedListToolbarButton />
          <NumberedListToolbarButton />
          <TodoListToolbarButton />
          <ToggleToolbarButton />
          <AlignToolbarButton />
          <OutdentToolbarButton />
          <IndentToolbarButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Insert Menu */}
        <ToolbarGroup>
          <InsertToolbarButton />
          <LinkToolbarButton />
          <TableToolbarButton />
          <MediaToolbarButton nodeType={KEYS.img} />
          <BlockButton />
        </ToolbarGroup>

        <div className="flex-1" />

        {/* Right-aligned actions */}
        <ToolbarGroup>
          {/*<AIToolbarButton tooltip="AI commands">
            <WandSparklesIcon className="size-4" />
          </AIToolbarButton>*/}
          <CommentToolbarButton />
          <SaveChangesButton />
          <ExportToolbarButton />
          {/*<ModeToolbarButton />
          <MoreToolbarButton />*/}
          {/*<TogglePlaneButton />*/}
        </ToolbarGroup>
      </div>

    </>
  );
}
