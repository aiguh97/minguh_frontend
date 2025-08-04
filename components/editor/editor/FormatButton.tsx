import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Bold, Italic, Underline } from "lucide-react";

 


      const fontOptions = [
        { label: "Default", value: "inherit" },
        { label: "Serif", value: "serif" },
        { label: "Sans", value: "sans-serif" },
        { label: "Monospace", value: "monospace" },
        { label: "Comic Sans", value: '"Comic Sans MS", cursive' },
      ];
      
      export default function FormatButton() {
        const [editor] = useLexicalComposerContext();
          return (<>
           {/* Format Buttons */}
      <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
        <Bold size={16} />
      </Button>
      <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
        <Italic size={16} />
      </Button>
      <Button size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
        <Underline size={16} />
      </Button></>)
      }