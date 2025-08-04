"use client";

import { $createHeadingNode } from "@lexical/rich-text";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // periksa path ini

export default function HeadingDropdown() {
  const [editor] = useLexicalComposerContext();

  const handleChange = (value: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (value === "paragraph") {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(value as any));
        }
      }
    });
  };

  return (
<Select defaultValue="paragraph" onValueChange={handleChange}>
  <SelectTrigger className="w-[150px] bg-white text-sm">
    <SelectValue placeholder="Heading" />
  </SelectTrigger>
  <SelectContent className="bg-white">
    <SelectItem className="text-sm p-2" value="paragraph">Normal</SelectItem>
    <SelectItem className="text-2xl font-bold p-2" value="h1">Heading 1</SelectItem>
    <SelectItem className="text-xl font-bold p-2" value="h2">Heading 2</SelectItem>
    <SelectItem className="text-lg font-semibold p-2" value="h3">Heading 3</SelectItem>
    <SelectItem className="text-base font-semibold p-2" value="h4">Heading 4</SelectItem>
    <SelectItem className="text-sm font-medium p-2" value="h5">Heading 5</SelectItem>
  </SelectContent>
</Select>

  );
}
