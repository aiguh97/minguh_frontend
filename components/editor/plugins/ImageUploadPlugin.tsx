import { ImageNode } from "@/nodes/ImageNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
// import { ImageNode } from "../node/ImageNodes";
// import { $createImageNode } from "../node/ImageNodes";

export function ImageUploadPlugin() {
  const [editor] = useLexicalComposerContext();
const handleImageUpload = async (file: File) => {
  const reader = new FileReader();

  reader.onload = () => {
    const url = reader.result as string;

    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      editor.update(() => {
        const node = new ImageNode(url, "Uploaded Image", width, height);
        $insertNodes([node]);
      });
    };
    img.src = url;
  };

  reader.readAsDataURL(file);
};


  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(file);
      }}
    />
  );
}
