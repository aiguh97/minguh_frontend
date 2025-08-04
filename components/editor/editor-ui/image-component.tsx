"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import {
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  // createEditor, // Tidak perlu di sini
  DRAGSTART_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_BACKSPACE_COMMAND,
  // KEY_ENTER_COMMAND, // Tidak perlu di sini untuk image component
  LexicalEditor,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
// import { $setSelection } from "lexical"; // Tidak digunakan
import { useEffect, useRef, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { $getNodeByKey } from "lexical";
import { $isImageNode } from "../nodes/image-node"; // Pastikan path ini benar
import { ImageResizer } from "./image-resizer";

interface ImageComponentProps {
  src: string;
  altText: string;
  width: number | "inherit" | "auto"; // Sesuaikan tipe
  height: number | "inherit" | "auto"; // Sesuaikan tipe
  nodeKey: NodeKey;
  // editor: LexicalEditor; // Hapus ini, akan didapatkan dari context
}

export function ImageComponent({
  src,
  altText,
  width,
  height,
  nodeKey,
}: ImageComponentProps) {
  const [editor] = useLexicalComposerContext(); // Ambil editor dari context
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Inisialisasi buttonRef

  const onDelete = (event: KeyboardEvent) => {
    if (isSelected && $isNodeSelection($getSelection())) {
      event.preventDefault();
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.remove();
      }
    }
    return false;
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, editor) => {
          const selection = $getSelection();
          const isNodeSelection = $isNodeSelection(selection) && selection.getNodes().some(n => n.getKey() === nodeKey);
          setSelected(isNodeSelection);
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const clickedNode = editor.getElementByKey(nodeKey);
          if (payload.target === clickedNode) {
            // Periksa apakah target klik adalah elemen gambar itu sendiri
            // Ini penting karena click handler bisa dipicu oleh elemen lain
            // di dalam decorator node (misalnya, resizer)
            if (!isResizing && imageRef.current && (payload.target === imageRef.current || imageRef.current.contains(payload.target as Node))) {
              clearSelection();
              setSelected(true);
            }
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target instanceof HTMLImageElement) {
            const node = $getNodeByKey(nodeKey);
            if ($isImageNode(node)) {
              event.dataTransfer?.setData("text/plain", nodeKey);
              return true;
            }
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      )
    );
  }, [clearSelection, editor, isResizing, isSelected, nodeKey, setSelected]);

  const onResizeEnd = (nextWidth: number, nextHeight: number) => {
    setTimeout(() => {
      setIsResizing(false);
    }, 100);
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        // Panggil setter yang kita definisikan di ImageNode
        node.setWidthAndHeight(nextWidth, nextHeight);
        // Jika Anda juga ingin mengupdate src atau altText dari resizer (jarang)
        // node.setSrc(src);
        // node.setAltText(altText);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const isSelectedStyle = isSelected && !isResizing;

  return (
    <div
      className={`relative ${isSelectedStyle ? "outline outline-2 outline-blue-500" : ""}`}
    >
      <img
        src={src}
        alt={altText}
        ref={imageRef}
        // Pastikan width dan height di sini bisa menerima "inherit" atau "auto"
        // atau Anda bisa menambahkan logika untuk mengubahnya menjadi string
        width={typeof width === 'number' ? width : undefined} // Hanya set width/height jika number
        height={typeof height === 'number' ? height : undefined} // Hanya set width/height jika number
        style={{
            width: typeof width === 'string' ? width : undefined,
            height: typeof height === 'string' ? height : undefined,
        }}
        draggable={isSelected}
        className="block"
      />
     {isSelected && (
      <ImageResizer
        imageRef={imageRef}
        onResizeStart={onResizeStart}
        onResizeEnd={onResizeEnd}
        editor={editor}
        buttonRef={buttonRef}
        maxWidth={500} // Sesuaikan maxWidth Anda
        showCaption={false}
        setShowCaption={() => {}} // Ini mungkin perlu fungsi yang lebih kompleks jika caption diimplementasikan
        captionsEnabled={false}
      />
    )}
    </div>
  );
}