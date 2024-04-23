"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import DropZone from "@/components/image/drop-zone";
import ImageCardList from "@/components/image/image-card-list";

import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants";
import { cn, getOppositeContrast } from "@/lib/utils";
import { useSelectedImage } from "@/store/image";

export default function ImagePage() {
  const router = useRouter();
  const selectedImage = useSelectedImage();

  const hexCode = selectedImage
    ? selectedImage.dominantColorHexCode!
    : DEFAULT_BACKGROUND_COLOR;

  return (
    <main
      style={{
        backgroundColor: hexCode,
      }}
      className={cn("flex h-dvh flex-col p-4", getOppositeContrast(hexCode))}
    >
      <section className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8">
        <div className="flex items-center gap-2">
          <BubbleContainer>
            <BubbleButton onClick={() => router.push("/")}>
              <Home className="size-4 shrink-0" />
            </BubbleButton>
          </BubbleContainer>
          <BubbleContainer>
            <BubbleText>Dominant Color of Image</BubbleText>
          </BubbleContainer>
        </div>
        <DropZone className="mx-auto" />
        <ImageCardList />
      </section>
    </main>
  );
}
