import {
  DecoratorNode,
  EditorConfig, // Mungkin masih diperlukan untuk createDOM jika ingin kustomisasi lebih lanjut
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  $createParagraphNode, // Impor ini untuk membantu penyisipan
  $insertNodes, // Impor ini untuk membantu penyisipan
} from "lexical";
import * as React from "react";
import { Suspense } from "react";
import { ImageComponent } from "../editor-ui/image-component";

// Penting: Pastikan path ini benar menuju ImageComponent Anda
// import { ImageComponent } from "../editor-ui/image-component";

// --- Definisi Tipe Serialisasi ---
// Buat tipe yang spesifik untuk serialisasi ImageNode
export type SerializedImageNode = SerializedLexicalNode & {
  src: string;
  altText: string; // Konsisten menggunakan altText
  width?: number; // Jadikan opsional, atau selalu sertakan dengan default
  height?: number; // Jadikan opsional, atau selalu sertakan dengan default
};

// --- ImageNode Class ---
export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string; // Ganti dari __alt menjadi __altText untuk konsistensi
  __width: number | "inherit" | "auto"; // Perluas tipe untuk width/height
  __height: number | "inherit" | "auto";

  // Kita tidak akan menyimpan __editor di sini. Sebaiknya diakses di komponen React.
  // __editor: any;

  static getType(): string {
    return "image";
  }

  // Penting: Selalu pastikan clone meng-copy semua properti kustom
  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  constructor(
    src: string,
    altText: string = "", // Ganti dari alt menjadi altText
    width: number | "inherit" | "auto" = "inherit", // Default ke 'inherit' atau 'auto' lebih fleksibel
    height: number | "inherit" | "auto" = "inherit", // Default ke 'inherit' atau 'auto'
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
    // this.__editor tidak diinisialisasi di sini
  }

  // createDOM ini akan membuat elemen span kosong.
  // Render visual dilakukan oleh komponen React di decorate().
  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement("span");
    // Anda bisa menambahkan class untuk styling kontainer jika diperlukan
    // element.className = "image-node-container";
    return element;
  }

  // Penting: return false agar Lexical tidak mencoba mengupdate DOM element
  // karena kita menggunakan React di decorate().
  updateDOM(): false {
    return false;
  }

  // decorate adalah tempat di mana komponen React dirender
  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText} // Gunakan __altText
          width={this.__width}
          height={this.__height}
          nodeKey={this.getKey()}
          // editor={this.__editor!} // Tidak lagi meneruskan __editor dari Node
        />
      </Suspense>
    );
  }

  // --- Serialisasi (Mengubah Node menjadi JSON) ---
  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText, // Gunakan altText
      width: typeof this.__width === 'number' ? this.__width : undefined, // Export hanya jika number
      height: typeof this.__height === 'number' ? this.__height : undefined, // Export hanya jika number
    };
  }

  // --- Deserialisasi (Membuat Node dari JSON) ---
  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    // Pastikan menangani nilai default dengan benar
    return new ImageNode(
      serializedNode.src,
      serializedNode.altText || "", // Pastikan ada fallback untuk altText
      serializedNode.width || "inherit", // Defaultkan ke 'inherit' jika tidak ada
      serializedNode.height || "inherit" // Defaultkan ke 'inherit' jika tidak ada
    );
  }

  // --- Helpers (Opsional, untuk memodifikasi node dari editor) ---
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

// --- Fungsi Helper untuk Membuat dan Menyisipkan ImageNode ---
// Ini adalah bagian kunci untuk mengatasi masalah "tidak bisa mengetik".
// Fungsi ini harus dipanggil di dalam `editor.update()` atau command Lexical.
export function $createImageNode(src: string, altText: string = '', width?: number | "inherit" | "auto", height?: number | "inherit" | "auto"): ImageNode {
  const imageNode = new ImageNode(src, altText, width, height);
  return imageNode; // Fungsi ini hanya membuat node, penyisipan dilakukan di tempat lain
}

export function $isImageNode(node: unknown): node is ImageNode {
  return node instanceof ImageNode;
}