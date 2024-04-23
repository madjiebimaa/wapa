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
}

export default function ImageCard({
  image,
  className,
  ...props
}: ImageCardProps) {
  const ref = useRef<React.ComponentRef<typeof Image> | null>(null);
  const imageActions = useImageActions();

  const item: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={image.id}
      variants={item}
      initial="hidden"
      animate="visible"
      exit="hidden"
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
