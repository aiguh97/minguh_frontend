"use client";

import {
  $getSelection,
  $isRangeSelection,
  $insertNodes,
  LexicalEditor,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
} from "lexical";
// import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRulePlugin";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState, useCallback } from "react";
import { Table, Bold, Italic, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImageUploaderTextEditor from "./ImageUploader";
import { $createTableNodeWithDimensions } from "@lexical/table";
import AlignmentToolbar from "./AlignmentToolbar";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import FontToolbar from "./FontToolbar";
import LinkEditorButton from "./LinkToolBarButton";
import HeadingDropdown from "./HeadingToolbar";

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [fontFamily, setFontFamily] = useState("poppins");

  type ElementFormatType = "left" | "center" | "right" | "justify";

  const insertTable = () => {
    editor.update(() => {
      const tableNode = $createTableNodeWithDimensions(2, 2);
      $insertNodes([tableNode]);
    });
  };

  return (
    <div
      className="flex gap-1 p-2 border-b bg-muted items-center overflow-x-auto"
      style={{ zIndex: 999999999999999 }}
    >
      {/* Upload Gambar */}
      <ImageUploaderTextEditor />

   <HeadingDropdown/>

      {/* Bold/Italic/Underlline */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <Bold size={16} />
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <Italic size={16} />
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <Underline size={16} />
      </Button>

      <AlignmentToolbar editor={editor} />
     <FontToolbar
  selectedFont="poppins"
  onChange={(font) => {
    console.log("Selected font:", font);
  }}
/>


      <LinkEditorButton />
      {/* Table */}
      <Button size="sm" variant="outline" onClick={insertTable}>
        <Table size={100} />
      </Button>
    </div>
  );
}
