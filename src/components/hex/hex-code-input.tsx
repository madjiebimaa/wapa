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
    <BubbleContainer className="relative gap-1">
      <BubbleText className="uppercase">hex</BubbleText>
      <Hash className="absolute left-20 top-4 size-4 shrink-0 text-muted-foreground" />
      <Input
        name="hex-code"
        type="text"
        maxLength={6}
        className="w-[110px] rounded-full border-none pl-8 text-secondary-foreground focus-visible:ring-offset-0"
        value={hexCode.slice(1)}
        onChange={handleHexCodeChange}
      />
      <CopyButton text={hexCode} />
    </BubbleContainer>
  );
}
