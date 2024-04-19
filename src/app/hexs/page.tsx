"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import ClientOnly from "@/components/global/client-only";
import CmykInput from "@/components/hex/cmyx-input";
import HexCodeInput from "@/components/hex/hex-code-input";
import RgbInput from "@/components/hex/rgb-input";

import RandomColorTooltip from "@/components/hex/random-color-tooltip";
import useDevices from "@/hooks/useDevices";
import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants";
import {
  cn,
  getOppositeContrast,
  hexCodeToRgb,
  isHexCode,
  rgbToCmyk,
} from "@/lib/utils";

export default function HexsPage() {
  const [hexCode, setHexCode] = useState(DEFAULT_BACKGROUND_COLOR);
  const [rgb, setRgb] = useState(hexCodeToRgb(hexCode));
  const [cmyk, setCmyk] = useState(rgbToCmyk(rgb));
  const router = useRouter();
  const { isLargeDevice } = useDevices();

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
          <section className="flex items-center justify-between">
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
            {isLargeDevice && (
              <RandomColorTooltip
                setHexCode={setHexCode}
                setRgb={setRgb}
                setCmyk={setCmyk}
              />
            )}
          </section>
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
