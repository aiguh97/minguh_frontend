"use client";

import { useRef, useState } from "react";
import { Eye, Trash2, Loader2, X } from "lucide-react";
import Image from "next/image";

export function UploadImagePreview() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleUploadClick = () => fileInputRef.current?.click();

  const loadImage = (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  };

  const handleRemove = () => {
    setImageUrl(null);
    fileInputRef.current!.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) loadImage(file);
  };

  return (
    <div className="mb-3">
      {/* File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />

      {/* Upload Button / Image Preview */}
      {!imageUrl ? (
        <div
          onClick={handleUploadClick}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`w-[326px] h-[120px] border-2 border-dashed rounded-md flex flex-col items-center justify-center text-sm text-gray-700 hover:bg-gray-50 cursor-pointer
            ${dragging ? "border-blue-400 bg-blue-50" : "border-gray-300"}`}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <span className="text-xl">+</span>
              <span>Upload or drag image</span>
            </>
          )}
        </div>
      ) : (
        <div
          className="relative w-[326px] h-[120px] rounded-md overflow-hidden border"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={imageUrl}
            alt="Preview"
            layout="fill"
            objectFit="cover"
            className="rounded"
          />

          {hovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 text-white">
              <Eye
                className="w-5 h-5 cursor-pointer"
                onClick={() => setShowPreview(true)}
              />
              <Trash2
                className="w-5 h-5 cursor-pointer"
                onClick={handleRemove}
              />
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[90vw] max-w-md">
            <Image
              src={imageUrl!}
              alt="Full Preview"
              width={800}
              height={800}
              className="rounded-md max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-4 -right-4 bg-white p-1 rounded-full shadow"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
