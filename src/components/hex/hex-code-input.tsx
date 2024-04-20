"use client";

import { Hash } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { hexCodeToRgb, isHexCode, rgbToCmyk } from "@/lib/utils";

interface HexCodeInputProps {
  form: UseFormReturn<
    {
      hexCode: string;
      rgb: {
        r: number;
        g: number;
        b: number;
      };
      cmyk: {
        c: number;
        m: number;
        y: number;
        k: number;
      };
    },
    any,
    undefined
  >;
}

export default function HexCodeInput({ form }: HexCodeInputProps) {
  const hexCode = form.watch("hexCode");

  const handleHexCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const nextHexCode = `#${value.toUpperCase()}`;

    form.setValue("hexCode", nextHexCode);

    if (isHexCode(nextHexCode) || value.length === 0) {
      const nextRgb = hexCodeToRgb(nextHexCode);
      const nextCmyk = rgbToCmyk(nextRgb);

      form.setValue("rgb", value.length !== 0 ? nextRgb : { r: 0, g: 0, b: 0 });
      form.setValue(
        "cmyk",
        value.length !== 0 ? nextCmyk : { c: 0, m: 0, y: 0, k: 0 },
      );
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
