// plugins/FontFamilyPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $patchStyleText } from "@lexical/selection";
import { $getSelection } from "lexical";
import { useEffect } from "react";
import { SET_FONT_FAMILY_COMMAND } from "./commands";

export function FontFamilyPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      SET_FONT_FAMILY_COMMAND,
      (fontFamily: string) => {
        editor.update(() => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, { fontFamily });
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
        editor.dispatchCommand(SET_FONT_FAMILY_COMMAND, e.target.value)
      }
      defaultValue="Hostestgreek"
    >
      <option value="Arial">Arial</option>
      <option value="Times New Roman">Times</option>
      <option value="Hostestgreek">Hostestgreek</option>
    </select>
  );
}
