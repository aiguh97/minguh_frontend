import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from "lexical";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  editor: LexicalEditor;
};

const AlignmentToolbar: React.FC<Props> = ({ editor }) => {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
      >
        <AlignLeft size={16} />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
      >
        <AlignCenter size={16} />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
      >
        <AlignRight size={16} />
      </Button>
    </div>
  );
};

export default AlignmentToolbar;
