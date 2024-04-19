"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import ClientOnly from "@/components/global/client-only";
import HexCodeInput from "@/components/hex/hex-code-input";
import RgbInput from "@/components/hex/rgb-input";

import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants";
import {
  cn,
  getOppositeContrast,
  getRandomInt,
  hexCodeToRgb,
  isHexCode,
} from "@/lib/utils";
import { useColors } from "@/store/color";

export default function HexsPage() {
  const colors = useColors();
  const randomizeHexCode = colors[getRandomInt(0, colors.length - 1)].hexCode;

  const [hexCode, setHexCode] = useState(randomizeHexCode);
  const [rgb, setRgb] = useState(hexCodeToRgb(hexCode));
  const router = useRouter();

  useEffect(() => {
    const handleRandomizeHexCode = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        const nextHexCode = randomizeHexCode;

        setHexCode(nextHexCode);
        setRgb(hexCodeToRgb(nextHexCode));
      }
    };

    document.addEventListener("keydown", handleRandomizeHexCode);

    return () => {
      document.removeEventListener("keydown", handleRandomizeHexCode);
    };
  }, [randomizeHexCode, hexCode]);

  return (
    <ClientOnly>
      <main
        style={{
          backgroundColor: isHexCode(hexCode)
            ? hexCode
            : DEFAULT_BACKGROUND_COLOR,
        }}
        className={cn(
          "flex h-screen flex-col p-4",
          isHexCode(hexCode) && getOppositeContrast(hexCode),
        )}
      >
        <section className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8">
          <div className="flex items-center gap-2">
            <BubbleContainer>
              <BubbleButton onClick={() => router.back()}>
                <ArrowLeft className="size-4 shrink-0" />
              </BubbleButton>
            </BubbleContainer>
            <BubbleContainer>
              <BubbleText>Convert A Color</BubbleText>
            </BubbleContainer>
          </div>
          <section className="flex flex-col gap-2">
            <HexCodeInput
              hexCode={hexCode}
              setHexCode={setHexCode}
              rgb={rgb}
              setRgb={setRgb}
            />
            <RgbInput
              rgb={rgb}
              setRgb={setRgb}
              hexCode={hexCode}
              setHexCode={setHexCode}
            />
          </section>
        </section>
      </main>
    </ClientOnly>
  );
}
