"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import ClosestColorBubbles from "@/components/color/closest-color-bubbles";
import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import ClientOnly from "@/components/global/client-only";
import CopyButton from "@/components/global/copy-button";
import LoveButton from "@/components/global/love-button";
import HexDetails from "@/components/hex/hex-details";

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

  const AnimatedBubbleContainer = motion(BubbleContainer);

  return (
    <main
      style={{
        backgroundColor: currentColor.hexCode,
      }}
      className={cn(
        "flex h-dvh flex-col md:flex-row",
        getOppositeContrast(currentColor.hexCode),
      )}
    >
      <section className="flex flex-col md:w-[320px]">
        <section className="flex flex-col gap-2 overflow-hidden p-4">
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
            <AnimatedBubbleContainer
              className="gap-1"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.7 }}
            >
              <BubbleText>{currentColor.name}</BubbleText>
            </AnimatedBubbleContainer>
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
            <AnimatedBubbleContainer
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeOut", duration: 0.7 }}
            >
              <BubbleText>{currentColor.code}</BubbleText>
            </AnimatedBubbleContainer>
            <AnimatedBubbleContainer
              className="gap-1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeOut", duration: 0.7 }}
            >
              <BubbleText>{currentColor.hexCode}</BubbleText>
              <CopyButton text={currentColor.hexCode} />
            </AnimatedBubbleContainer>
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
