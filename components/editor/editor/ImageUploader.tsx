"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Image as ImageIcon } from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, $getSelection, $insertNodes } from "lexical";
// import getCroppedImg from "./utils/cropImage"; // fungsi helper untuk crop image
import { createCommand } from "lexical";
import getCroppedImg from "@/app/utils/cropImage";
import { $createImageNode, $isImageNode, ImageNode } from "@/nodes/ImageNode";

// Optional: ganti ini dengan custom ImageNode Lexical milikmu
const createImageNode = (src: string) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Uploaded Image";
  return img;
};

export default function ImageUploaderTextEditor() {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<ReturnType<
    typeof onCropComplete
  > | null>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleInsert = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const img = new Image();

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        editor.update(() => {
          const imageNode = $createImageNode({
            src: croppedImage,
            altText: "Cropped Image",
            width,
            height,
          });

          $insertNodes([imageNode]);
        });

        // Reset state (harus di dalam img.onload agar timing benar)
        setOpen(false);
        setImageSrc(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      };

      img.src = croppedImage;
    } catch (err) {
      console.error("Image insert failed", err);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> | DragEvent
  ) => {
    e.preventDefault();

    const file =
      e instanceof DragEvent
        ? e.dataTransfer?.files?.[0]
        : (e.target as HTMLInputElement)?.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const img = new Image();

        img.onload = () => {
          setImageDimensions({
            width: img.width,
            height: img.height,
          });
          setImageSrc(result);
          setZoom(1); // reset zoom ke 100%
        };

        img.src = result;
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  // drag-drop handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      container.classList.add("border-blue-500");
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      handleFileChange(e);
      container.classList.remove("border-blue-500");
    };

    const onDragLeave = () => container.classList.remove("border-blue-500");

    container.addEventListener("dragover", onDragOver);
    container.addEventListener("drop", onDrop);
    container.addEventListener("dragleave", onDragLeave);

    return () => {
      container.removeEventListener("dragover", onDragOver);
      container.removeEventListener("drop", onDrop);
      container.removeEventListener("dragleave", onDragLeave);
    };
  }, []);

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <ImageIcon size={16} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>Upload & Crop Image</DialogHeader>

          {!imageSrc && (
            <div
              ref={containerRef}
              className="border-2 border-dashed rounded-md p-6 text-center text-muted-foreground cursor-pointer transition hover:bg-muted"
              style={{
                height: 120,
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => document.getElementById("image-input")?.click()}
            >
              <p className="text-sm">+ Upload or drag image</p>
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </div>
          )}
          {imageSrc && imageDimensions && (
            <>
              {(() => {
                const maxHeight = 300;
                const { width, height } = imageDimensions;

                // Hitung ulang jika height > 300
                const scale = height > maxHeight ? maxHeight / height : 1;
                const displayHeight = height * scale;
                const displayWidth = width * scale;

                return (
                  <>
                    <div
                      className="relative bg-black mx-auto"
                      style={{
                        width: `${displayWidth}px`,
                        height: `${displayHeight}px`,
                        maxWidth: "100%",
                      }}
                    >
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={width / height} // original aspect ratio
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="text-sm">Zoom</label>
                      <Slider
                        min={1}
                        max={3}
                        step={0.1}
                        value={[zoom]}
                        onValueChange={(val) => setZoom(val[0])}
                      />
                    </div>
                  </>
                );
              })()}
            </>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInsert} disabled={!imageSrc}>
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
