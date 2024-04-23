"use client";

import ImageCard from "@/components/image/image-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { useImages } from "@/store/image";

export default function ImageCardList() {
  const images = useImages();

  return (
    <ScrollArea>
      <section className="mx-auto flex items-center gap-2 py-4">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            className={cn(index === images.length - 1 && "pr-4")}
          />
        ))}
      </section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
