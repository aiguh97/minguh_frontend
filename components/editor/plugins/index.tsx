import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { DragDropImagePlugin } from "../editor/DragDropImagePlugin";
// import { DragDropImagePlugin } from "./editor/DragDropImagePlugin"; // Tambahkan ini

export function Plugins({
  onChange,
  onSerializedChange,
}: {
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: any) => void;
}) {
  return (
    <>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="min-h-[100px] outline-none" />
        }
        placeholder={<div className="text-gray-400">Konten Artikel</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <AutoFocusPlugin />
      <HistoryPlugin />
      <OnChangePlugin
        ignoreSelectionChange={true}
        onChange={(editorState, editor) => {
          onChange?.(editorState);
          onSerializedChange?.(editorState.toJSON());
        }}
      />
      <DragDropImagePlugin /> // Tambahkan ini
    </>
  );
}