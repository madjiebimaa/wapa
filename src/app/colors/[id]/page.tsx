"use client";

import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import ClosestColorList from "@/components/color/closest-color-list";
import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import LoveButton from "@/components/global/love-button";

import { cn, getOppositeContrast } from "@/lib/utils";
import { useColors } from "@/store/color";

export default function ColorPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const colors = useColors();

  const currentColor = colors.find((color) => color.id === id)!;

  return (
    <main
      style={{
        backgroundColor: currentColor.hexCode,
      }}
      className={cn(
        "flex h-screen flex-col gap-2 p-4",
        getOppositeContrast(currentColor.hexCode),
      )}
    >
      <div className="flex items-center gap-2">
        <BubbleContainer>
          <BubbleButton onClick={() => router.back()}>
            <ArrowLeft className="size-4 shrink-0" />
          </BubbleButton>
        </BubbleContainer>
        <BubbleContainer className="gap-1">
          <BubbleText>{currentColor.name}</BubbleText>
          <BubbleText>{currentColor.code}</BubbleText>
        </BubbleContainer>
      </div>
      <div className="flex items-center gap-2">
        <BubbleContainer>
          <BubbleButton onClick={() => router.push("/")}>
            <Home className="size-4 shrink-0" />
          </BubbleButton>
        </BubbleContainer>
        <BubbleContainer className="gap-1">
          <BubbleText>{currentColor.hexCode}</BubbleText>
          <CopyButton text={currentColor.hexCode} />
        </BubbleContainer>
        <BubbleContainer>
          <LoveButton colorId={currentColor.id} />
        </BubbleContainer>
      </div>
      <ClosestColorList color={currentColor} colors={colors} />
    </main>
  );
}
