import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import { $getSelection, $createParagraphNode, ElementFormatType } from "lexical";

export function AlignPlugin() {
  const [editor] = useLexicalComposerContext();

  const applyAlign = (alignment: ElementFormatType) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $setBlocksType(selection, () => $createParagraphNode().setFormat(alignment));
      }
    });
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => applyAlign("left")}>Left</button>
      <button onClick={() => applyAlign("center")}>Center</button>
      <button onClick={() => applyAlign("justify")}>Justify</button>
    </div>
  );
}
