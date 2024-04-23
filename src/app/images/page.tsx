"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import DropZone from "@/components/image/drop-zone";
import ImageList from "@/components/image/image-list";

export default function ImagePage() {
  const router = useRouter();

  return (
    <main className="flex h-dvh flex-col p-4">
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
        <DropZone />
        <ImageList />
      </section>
    </main>
  );
}
