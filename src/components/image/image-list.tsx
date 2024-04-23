"use client";

import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { useImages } from "@/store/image";

export default function ImageList() {
  const images = useImages();

  return (
    <ScrollArea>
      <section className="flex items-center gap-2 py-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              "group/image relative size-[200px] overflow-hidden rounded-md shadow-md",
              index === images.length - 1 && "pr-4",
            )}
          >
            <Image
              src={image.preview as string}
              fill
              alt="Picture to find the dominant color"
              className="object-cover transition-transform duration-300 ease-in group-hover/image:scale-110 group-hover/image:transition-transform group-hover/image:duration-500 group-hover/image:ease-out"
            />
          </div>
        ))}
      </section>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
