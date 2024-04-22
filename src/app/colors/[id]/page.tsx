"use client";

import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import ClosestColorBubbles from "@/components/color/closest-color-bubbles";
import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import LoveButton from "@/components/global/love-button";
import HexDetails from "@/components/hex/hex-details";

import ClientOnly from "@/components/global/client-only";
import { cn, getOppositeContrast, hexCodeToRgb, rgbToCmyk } from "@/lib/utils";
import { useColors } from "@/store/color";

export default function ColorPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const colors = useColors();

  const currentColor = colors.find((color) => color.id === id)!;
  const currentColorIndex = colors.findIndex((color) => color.id === id)!;
  const prevColorIndex =
    currentColorIndex !== 0 ? currentColorIndex - 1 : colors.length - 1;
  const nextColorIndex =
    currentColorIndex !== colors.length - 1 ? currentColorIndex + 1 : 0;

  const currentColorRgb = hexCodeToRgb(currentColor.hexCode);
  const currentColorCmyk = rgbToCmyk(currentColorRgb);

  return (
    <main
      style={{
        backgroundColor: currentColor.hexCode,
      }}
      className={cn(
        "flex h-dvh flex-col p-4 md:flex-row md:gap-8",
        getOppositeContrast(currentColor.hexCode),
      )}
    >
      <section className="flex flex-col gap-8 md:w-[320px]">
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <BubbleContainer>
              <BubbleButton
                onClick={() =>
                  router.push(`/colors/${colors[prevColorIndex].id}`)
                }
              >
                <ArrowLeft className="size-4 shrink-0" />
              </BubbleButton>
            </BubbleContainer>
            <BubbleContainer className="gap-1">
              <BubbleText>{currentColor.name}</BubbleText>
            </BubbleContainer>
            <BubbleContainer>
              <BubbleButton
                onClick={() =>
                  router.push(`/colors/${colors[nextColorIndex].id}`)
                }
              >
                <ArrowRight className="size-4 shrink-0" />
              </BubbleButton>
            </BubbleContainer>
          </div>
          <div className="flex items-center gap-2">
            <BubbleContainer>
              <BubbleText>{currentColor.code}</BubbleText>
            </BubbleContainer>
            <BubbleContainer className="gap-1">
              <BubbleText>{currentColor.hexCode}</BubbleText>
              <CopyButton text={currentColor.hexCode} />
            </BubbleContainer>
          </div>
          <div className="flex items-center gap-2">
            <BubbleContainer>
              <BubbleButton onClick={() => router.push("/")}>
                <Home className="size-4 shrink-0" />
              </BubbleButton>
            </BubbleContainer>
            <BubbleContainer>
              <LoveButton colorId={currentColor.id} />
            </BubbleContainer>
          </div>
        </section>
        <HexDetails rgb={currentColorRgb} cmyk={currentColorCmyk} />
      </section>
      <ClientOnly>
        <ClosestColorBubbles color={currentColor} colors={colors} />
      </ClientOnly>
    </main>
  );
}
