import { ImageComponent } from "@/components/editor/editor-ui/image-component";
import {
  DecoratorNode,
  SerializedLexicalNode, // Ganti SerializedDecoratorNode dengan SerializedLexicalNode
  LexicalEditor,
  NodeKey,
  EditorConfig,
} from "lexical";
import * as React from "react";
import { Suspense } from "react";
// import { ImageComponent } from "../editor-ui/image-resizer";

// Perbarui tipe SerializedImageNode untuk menggunakan SerializedLexicalNode
export type SerializedImageNode = SerializedLexicalNode & {
  src: string;
  altText: string;
  width: number;
  height: number;
  type: "image";
  version: 1;
};

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: number;
  __height: number;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__key
    );
  }

  constructor(
    src: string,
    altText: string,
    width: number,
    height: number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          nodeKey={this.getKey()}
        //   editor={editor}
        />
      </Suspense>
    );
  }

  update(
    src: string,
    altText: string,
    width: number,
    height: number
  ) {
    const writable = this.getWritable();
    writable.__src = src;
    writable.__altText = altText;
    writable.__width = width;
    writable.__height = height;
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText, width, height } = serializedNode;
    return new ImageNode(src, altText, width, height);
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.getSrc(),
      altText: this.getAltText(),
      width: this.getWidth(),
      height: this.getHeight(),
      type: "image",
      version: 1,
    };
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }
  
  getWidth(): number {
    return this.__width;
  }

  getHeight(): number {
    return this.__height;
  }
}

export function $createImageNode({
  src,
  altText,
  width,
  height,
}: {
  src: string;
  altText: string;
  width: number;
  height: number;
}): ImageNode {
  return new ImageNode(src, altText, width, height);
}

export function $isImageNode(
  node: DecoratorNode<JSX.Element> | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}