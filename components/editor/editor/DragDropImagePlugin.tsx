// plugins/DragDropImagePlugin.tsx
"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $insertNodes,
  COMMAND_PRIORITY_LOW,
  createCommand,
  LexicalCommand,
  $getSelection,
  $isRangeSelection,
  $setSelection,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  $getNodeByKey,
  $getNearestNodeFromDOMNode,
  $isTextNode,
  TextNode,
} from "lexical";
// import { ImageNode } from "../nodes/image-node";
import { $isImageNode } from "../editor-ui/image-node";
import { ImageNode } from "../nodes/image-node";

// import { ImageNode, $isImageNode } from "../nodes/ImageNode"; // Pastikan path-nya benar

export const INSERT_IMAGE_COMMAND: LexicalCommand<{
  src: string;
  alt?: string;
  width: number;
  height: number;
}> = createCommand("INSERT_IMAGE_COMMAND");

export function DragDropImagePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeInsertImageCommand = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const { src, alt = "", width, height } = payload;
        const imageNode = new ImageNode(src, alt, width, height);
        $insertNodes([imageNode]);
        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    const removeDropCommand = editor.registerCommand(
      DROP_COMMAND,
      (event: DragEvent) => {
        const dataTransfer = event.dataTransfer;
        if (!dataTransfer) return false;

        event.preventDefault();

        const nodeKey = dataTransfer.getData("text/plain");
        if (nodeKey) {
          editor.update(() => {
            const draggedNode = $getNodeByKey(nodeKey);
            if (draggedNode && $isImageNode(draggedNode)) {
              // Sekarang aman
              draggedNode.remove();

              $insertNodes([draggedNode]);
            }
            if ($isImageNode(draggedNode)) {
              const targetElement = event.target as HTMLElement;
              const targetNode = $getNearestNodeFromDOMNode(targetElement);

              // Hapus node dari posisi lama
              draggedNode.remove();

              // Dapatkan posisi kursor
              const pos = (document as any).caretPositionFromPoint?.(
                event.clientX,
                event.clientY
              );

              if (pos) {
                const range = document.createRange();
                range.setStart(pos.offsetNode, pos.offset);
                range.collapse(true);

                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  const textNode = targetNode;
                  if ($isTextNode(textNode)) {
                    selection.setTextNodeRange(
                      textNode,
                      range.startOffset,
                      textNode,
                      range.endOffset
                    );
                    $setSelection(selection);
                  }
                }
              }

              $insertNodes([draggedNode]);
            }
          });
          return true;
        }

        // Drop file (image)
        const file = dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src: reader.result as string,
                alt: file.name,
                width: img.width,
                height: img.height,
              });
            };
            img.src = reader.result as string;
          };
          reader.readAsDataURL(file);
          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    const removeDragOverCommand = editor.registerCommand(
      DRAGOVER_COMMAND,
      (event: DragEvent) => {
        event.preventDefault();
        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      removeInsertImageCommand();
      removeDropCommand();
      removeDragOverCommand();
    };
  }, [editor]);

  return null;
}
