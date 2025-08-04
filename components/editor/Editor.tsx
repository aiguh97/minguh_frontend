"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorState, SerializedEditorState } from "lexical";
import { nodes } from "./nodes";
import { Plugins } from "./plugins";
import { editorTheme } from "./themes/editor-themes";
import Toolbar from "./editor/Toolbar";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { DragDropImagePlugin } from "./editor/DragDropImagePlugin";

type Props = {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
};

const editorConfig = {
  namespace: "MyEditor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error("Lexical Error:", error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
}: Props) {
  return (
    <div className="rounded-lg border shadow editor-content">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <DragDropImagePlugin />
        <LinkPlugin />
        <Toolbar />
        <div
          className="p-4 text-sm leading-snug 
        .max-h-[999px] 
          overflow-auto prose max-w-none"
          style={{ zIndex: 100, paddingTop: 0 }}
        >
          <Plugins
            onChange={onChange}
            onSerializedChange={onSerializedChange}
          />
        </div>
      </LexicalComposer>
    </div>
  );
}
