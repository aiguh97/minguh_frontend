import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { SET_FONT_SIZE_COMMAND } from "./commands";
import { $getSelection } from "lexical"; // ✅ ini wajib
import { $patchStyleText } from "@lexical/selection";
import { useEffect } from "react";


// plugins/FontSizePlugin.tsx
export function FontSizePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      SET_FONT_SIZE_COMMAND,
      (fontSize: string) => {
        editor.update(() => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, { fontSize });
          }
        });
        return true;
      },
      0
    );
  }, [editor]);

  return (
    <select
      onChange={(e) =>
        editor.dispatchCommand(SET_FONT_SIZE_COMMAND, e.target.value)
      }
      defaultValue="12px"
    >
      <option value="12px">12</option>
      <option value="14px">14</option>
      <option value="16px">16</option>
    </select>
  );
}
