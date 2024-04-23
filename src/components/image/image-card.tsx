"use client";

import Image from "next/image";
import { useRef } from "react";

import { Image as FileImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useImageActions } from "@/store/image";

interface ImageCardProps extends React.ComponentPropsWithoutRef<"div"> {
  image: FileImage;
}

export default function ImageCard({
  image,
  className,
  ...props
}: ImageCardProps) {
  const ref = useRef<React.ComponentRef<typeof Image> | null>(null);
  const imageActions = useImageActions();

  return (
    <div
      key={image.id}
      className={cn(
        "group/image relative size-[200px] cursor-pointer overflow-hidden rounded-md shadow-md",
        className,
      )}
      onClick={() => imageActions.selectImage(image.id)}
      {...props}
    >
      <Image
        ref={ref}
        src={image.preview as string}
        fill
        onLoad={() =>
          imageActions.addDominantColorToImage(image.id, ref.current!)
        }
        alt="Picture to find the dominant color"
        className="object-cover transition-transform duration-300 ease-in group-hover/image:scale-110 group-hover/image:transition-transform group-hover/image:duration-500 group-hover/image:ease-out"
      />
    </div>
  );
}
