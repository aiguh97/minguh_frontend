import * as React from "react";

type Props = {
  src: string;
};

export default function ImageComponent({ src }: Props) {
  return <img src={src} alt="Uploaded" className="my-4 max-w-full" />;
}
