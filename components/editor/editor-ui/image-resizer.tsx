import React, { useState, useEffect, useRef } from "react";
import { Resizable } from "re-resizable";

type ImageResizerProps = {
  imageRef: React.RefObject<HTMLImageElement>;
  editor: any;
  buttonRef: React.RefObject<HTMLButtonElement>;
  maxWidth: number;
  onResizeStart: () => void;
  onResizeEnd: (width: number, height: number) => void;
  showCaption: boolean;
  setShowCaption: () => void;
  captionsEnabled: boolean;
};

export function ImageResizer({
  imageRef,
  editor,
  maxWidth,
  onResizeStart,
  onResizeEnd,
}: ImageResizerProps): JSX.Element | null {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const aspectRatioRef = useRef(1);

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      const width = image.offsetWidth;
      const height = image.offsetHeight;
      aspectRatioRef.current = width / height;
      setDimensions({ width, height });
    }
  }, [imageRef]);

  if (!imageRef.current) return null;

  return (
    <div className="absolute top-0 left-0 z-10">
      <Resizable
        size={{
          width: dimensions.width,
          height: dimensions.height,
        }}
        lockAspectRatio
        maxWidth={maxWidth}
        onResizeStart={() => {
          onResizeStart();
        }}
        onResizeStop={(e, direction, ref, d) => {
          const newWidth = dimensions.width + d.width;
          const newHeight = newWidth / aspectRatioRef.current;
          setDimensions({ width: newWidth, height: newHeight });
          onResizeEnd(newWidth, newHeight);
        }}
        style={{
          border: "2px dashed #3b82f6",
          padding: "2px",
        }}
      >
        <img
          src={imageRef.current?.src}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      </Resizable>
    </div>
  );
}
