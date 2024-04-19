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

import CmykInput from "@/components/hex/cmyx-input";
import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants";
import {
  cn,
  getOppositeContrast,
  getRandomInt,
  hexCodeToRgb,
  isHexCode,
  rgbToCmyk,
} from "@/lib/utils";
import { useColors } from "@/store/color";

export default function HexsPage() {
  const colors = useColors();
  const randomizeHexCode = colors[getRandomInt(0, colors.length - 1)].hexCode;

  const [hexCode, setHexCode] = useState(randomizeHexCode);
  const [rgb, setRgb] = useState(hexCodeToRgb(hexCode));
  const [cmyk, setCmyk] = useState(rgbToCmyk(rgb));
  const router = useRouter();

  useEffect(() => {
    const handleRandomizeHexCode = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        const nextHexCode = randomizeHexCode;
        const nextRgb = hexCodeToRgb(nextHexCode);
        const nextCmyk = rgbToCmyk(nextRgb);

        setHexCode(nextHexCode);
        setRgb(nextRgb);
        setCmyk(nextCmyk);
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
          <section className="flex flex-col gap-4">
            <HexCodeInput
              hexCode={hexCode}
              setHexCode={setHexCode}
              setRgb={setRgb}
              setCmyk={setCmyk}
            />
            <RgbInput
              rgb={rgb}
              setRgb={setRgb}
              setHexCode={setHexCode}
              setCmyk={setCmyk}
            />
            <CmykInput
              cmyk={cmyk}
              setCmyk={setCmyk}
              setHexCode={setHexCode}
              setRgb={setRgb}
            />
          </section>
        </section>
      </main>
    </ClientOnly>
  );
}
