"use client";

import { Variants, motion } from "framer-motion";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";

import { Image as FileImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useImageActions } from "@/store/image";

interface ImageCardProps
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  image: FileImage;
  images: FileImage[];
  index: number;
}

export default function ImageCard({
  image,
  images,
  index,
  className,
  ...props
}: ImageCardProps) {
  const ref = useRef<React.ComponentRef<typeof Image> | null>(null);
  const imageActions = useImageActions();

  const item = (index: number): Variants => ({
    hidden: {
      opacity: 0,
      x: -100 * index,
      y: 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    delete: {
      opacity: 0,
      x: 60,
      y: -60,
      scale: 0,
      transition: {
        duration: 0.5,
      },
    },
  });

  return (
    <motion.div
      key={image.id}
      variants={item(index)}
      initial="hidden"
      animate="visible"
      exit="delete"
      onClick={() => imageActions.selectImage(image.id)}
      className={cn(
        "group/image relative size-[200px] cursor-pointer overflow-hidden rounded-md shadow-md",
        className,
      )}
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
      <BubbleContainer className="invisible absolute right-2 top-2 opacity-0 transition-transform duration-300 ease-in group-hover/image:visible group-hover/image:opacity-100 group-hover/image:transition-transform group-hover/image:ease-out">
        <BubbleButton onClick={() => imageActions.deleteImage(image.id)}>
          <Trash className="size-4 shrink-0" />
        </BubbleButton>
      </BubbleContainer>
    </motion.div>
  );
}
