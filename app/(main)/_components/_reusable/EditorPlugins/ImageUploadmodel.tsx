"use client";

import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";

type Props = {
  open: boolean;
  onClose: () => void;
  onInsert: (src: string) => void;
};

export default function ImageUploadModal({ open, onClose, onInsert }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload & Crop Image</DialogTitle>
        </DialogHeader>
        {!imageSrc ? (
          <div
            {...getRootProps()}
            className="border border-dashed rounded-md p-8 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>+ Upload or drag image</p>
          </div>
        ) : (
          <div className="relative h-64 w-full bg-gray-100">
            <Cropper
              image={imageSrc}
              crop={{ x: 0, y: 0 }}
              zoom={1}
              aspect={4 / 3}
              onCropChange={() => {}}
              onCropComplete={() => {}}
              onZoomChange={() => {}}
            />
          </div>
        )}
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (imageSrc) {
                onInsert(imageSrc);
                setImageSrc(null);
                onClose();
              }
            }}
          >
            Insert Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
