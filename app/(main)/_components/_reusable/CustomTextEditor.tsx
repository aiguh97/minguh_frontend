"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "@tiptap/extension-image";

import { Button } from "@/components/ui/button";
import { LucideImage } from "lucide-react";
import ImageUploadModal from "./EditorPlugins/ImageUploadmodel";
// import ImageUploadModal from "./EditorPlugins/ImageUploadmodel";

type CustomTextEditorProps = {
  onOpenImageModal: () => void;
};

export default function CustomTextEditor({
  onOpenImageModal,
}: CustomTextEditorProps) {
  // Buat editor
  // const editor = useEditor({
  //   extensions: [StarterKit, Underline, Link, Superscript, Subscript, TextStyle, Image],
  //   autofocus: true,
  //   content: "<p>Hello World 🚀</p>",
  //   editorProps: {
  //     attributes: {
  //       class: "prose p-4 min-h-[100px] focus:outline-none",
  //     },
  //   },
  // });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      TextStyle,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],

    content: "<p>Hello World 🚀</p>",
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none p-4 min-h-[100px] focus:outline-none overflow-x-auto",
      },
    },
    onUpdate({ editor }) {
      // Handle changes if needed
    },
    immediatelyRender: false,
  });

  // Menangkap event dari luar (dikirim oleh parent)
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ src: string }>;
      editor?.chain().focus().setImage({ src: customEvent.detail.src }).run();
    };

    window.addEventListener("insert-image", handler);
    return () => window.removeEventListener("insert-image", handler);
  }, [editor]);

  // const toggleFormat = useCallback(
  //   (command: () => void) => {
  //     command();
  //     editor?.commands.focus();
  //   },
  //   [editor]
  // );

  // if (!editor) return null;
  const toggleFormat = useCallback(
    (command: () => void) => {
      command();
      editor?.commands.focus();
      // Hapus selection agar BubbleMenu menghilang
      editor?.commands.setTextSelection(editor.state.selection.to);
    },
    [editor]
  );

  const HeadingDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {editor?.isActive("heading", { level: 1 })
            ? "H1"
            : editor?.isActive("heading", { level: 2 })
            ? "H2"
            : editor?.isActive("heading", { level: 3 })
            ? "H3"
            : editor?.isActive("heading", { level: 4 })
            ? "H4"
            : editor?.isActive("heading", { level: 5 })
            ? "H5"
            : "Paragraph"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => editor?.chain().focus().setParagraph().run()}
        >
          <span className="text-sm">Paragraph</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <span className="text-base font-medium">H5</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <span className="text-lg font-medium">H4</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <span className="text-xl font-semibold">H3</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <span className="text-2xl font-semibold">H2</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <span className="text-3xl font-bold">H1</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="border rounded-md relative w-full">
      {/* Toolbar */}
      <div
        className="sticky top-0 z-20 flex flex-wrap items-center gap-2 bg-white border-b px-4 py-2 
        overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary 
        mb-[7px] "
        style={{ scrollbarColor: "#3b82f6 transparent" }}
      >
        <Button variant="outline" size="sm" onClick={onOpenImageModal}>
          <LucideImage />
        </Button>

        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleBold().run())
          }
          className="btn font-bold"
        >
          B
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleItalic().run())
          }
          className="btn italic"
        >
          I
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleUnderline().run())
          }
          className="btn underline"
        >
          U
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleBulletList().run())
          }
          className="btn"
        >
          • List
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() =>
              editor?.chain().focus().toggleOrderedList().run()
            )
          }
          className="btn"
        >
          1. List
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleSubscript().run())
          }
          className="btn"
        >
          x<sub>2</sub>
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() =>
              editor?.chain().focus().toggleSuperscript().run()
            )
          }
          className="btn"
        >
          x<sup>2</sup>
        </Button>
        <HeadingDropdown />
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() =>
              editor
                ?.chain()
                .focus()
                .toggleLink({ href: prompt("Enter URL") || "" })
                .run()
            )
          }
          className="btn"
        >
          🔗
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Bubble Menu Tooltip */}
      <BubbleMenu
        editor={editor ?? undefined}
        style={{ left: 20 }}
        className="flex gap-1 bg-white border rounded shadow px-2 py-1 z-50"
      >
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleBold().run())
          }
          className="btn font-bold"
        >
          B
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleItalic().run())
          }
          className="btn italic"
        >
          I
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleUnderline().run())
          }
          className="btn underline"
        >
          U
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleBulletList().run())
          }
          className="btn"
        >
          •
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() =>
              editor?.chain().focus().toggleOrderedList().run()
            )
          }
          className="btn"
        >
          1.
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() => editor?.chain().focus().toggleSubscript().run())
          }
          className="btn"
        >
          x<sub>2</sub>
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() =>
            toggleFormat(() =>
              editor?.chain().focus().toggleSuperscript().run()
            )
          }
          className="btn"
        >
          x<sup>2</sup>
        </Button>
      </BubbleMenu>
    </div>
  );
}
