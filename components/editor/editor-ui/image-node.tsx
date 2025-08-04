import {
  DecoratorNode,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  // Tidak perlu $createParagraphNode dan $insertNodes di sini lagi,
  // karena itu untuk logika penyisipan di tempat lain.
} from "lexical";
import * as React from "react";
import { Suspense } from "react";

// Penting: Pastikan path ini benar menuju ImageComponent Anda
import { ImageComponent } from "../editor-ui/image-component";

// --- Definisi Tipe Serialisasi ---
export type SerializedImageNode = SerializedLexicalNode & {
  src: string;
  altText: string;
  width?: number | "inherit" | "auto"; // Sesuaikan tipe agar sesuai dengan node
  height?: number | "inherit" | "auto"; // Sesuaikan tipe agar sesuai dengan node
};

// --- ImageNode Class ---
export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: number | "inherit" | "auto";
  __height: number | "inherit" | "auto";

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  constructor(
    src: string,
    altText: string = "",
    width: number | "inherit" | "auto" = "inherit",
    height: number | "inherit" | "auto" = "inherit",
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement("span");
    // Anda bisa menambahkan class untuk styling kontainer jika diperlukan
    // element.className = "image-node-container";
    return element;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width} // Kembali diteruskan
          height={this.__height} // Kembali diteruskan
          nodeKey={this.getKey()}
          // editor tidak diteruskan dari sini, akan diambil di dalam ImageComponent
        />
      </Suspense>
    );
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText,
      // Penting: Pastikan hanya mengekspor number jika ImageComponent mengharapkan number
      // Atau sesuaikan ImageComponentProps.
      // Untuk fleksibilitas, kita akan mengekspor apa adanya dan menangani di komponen.
      width: this.__width,
      height: this.__height,
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode(
      serializedNode.src,
      serializedNode.altText || "",
      serializedNode.width || "inherit",
      serializedNode.height || "inherit"
    );
  }

  setSrc(src: string): void {
    const writable = this.getWritable();
    writable.__src = src;
  }

  setAltText(altText: string): void {
    const writable = this.getWritable();
    writable.__altText = altText;
  }

  setWidthAndHeight(width: number | "inherit" | "auto", height: number | "inherit" | "auto"): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }
}

export function $createImageNode(src: string, altText: string = '', width?: number | "inherit" | "auto", height?: number | "inherit" | "auto"): ImageNode {
  const imageNode = new ImageNode(src, altText, width, height);
  return imageNode;
}

export function $isImageNode(node: unknown): node is ImageNode {
  return node instanceof ImageNode;
}