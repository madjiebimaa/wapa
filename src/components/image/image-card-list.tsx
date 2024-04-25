"use client";

import { AnimatePresence, motion } from "framer-motion";

import ImageCard from "@/components/image/image-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { useImages } from "@/store/image";

export default function ImageCardList() {
  const images = useImages();

  return (
    <ScrollArea>
      <motion.section layout className="mx-auto flex items-center gap-2 py-4">
        <AnimatePresence mode="popLayout">
          {images.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              images={images}
              index={index}
              className={cn(index === images.length - 1 && "pr-4")}
            />
          ))}
        </AnimatePresence>
      </motion.section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
