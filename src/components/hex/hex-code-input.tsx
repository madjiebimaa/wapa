"use client";

import { Hash } from "lucide-react";

import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { CMYK, RGB } from "@/lib/types";
import { hexCodeToRgb, isHexCode, rgbToCmyk } from "@/lib/utils";

interface HexCodeInputProps {
  hexCode: string;
  setHexCode: React.Dispatch<React.SetStateAction<string>>;
  setRgb: React.Dispatch<React.SetStateAction<RGB>>;
  setCmyk: React.Dispatch<React.SetStateAction<CMYK>>;
}

export default function HexCodeInput({
  hexCode,
  setHexCode,
  setRgb,
  setCmyk,
}: HexCodeInputProps) {
  const handleHexCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHexCode(`#${event.target.value.toUpperCase()}`);

    if (isHexCode(hexCode)) {
      const nextRgb = hexCodeToRgb(hexCode);

      setRgb(nextRgb);
      setCmyk(rgbToCmyk(nextRgb));
    }
  };

  return (
    <div className="flex flex-col gap-1 md:flex-row">
      <BubbleContainer>
        <BubbleText className="uppercase">hex</BubbleText>
      </BubbleContainer>
      <BubbleContainer className="relative gap-1">
        <Hash className="absolute left-4 top-4 size-4 shrink-0 text-muted-foreground" />
        <Input
          name="hex-code"
          type="text"
          maxLength={6}
          className="w-[100px] rounded-full border-none py-2 pl-8 pr-2 text-xs text-secondary-foreground focus-visible:ring-offset-0"
          value={hexCode.slice(1)}
          onChange={handleHexCodeChange}
        />
        <CopyButton text={hexCode} />
      </BubbleContainer>
    </div>
  );
}
