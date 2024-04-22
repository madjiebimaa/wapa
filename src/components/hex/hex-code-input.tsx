"use client";

import { Hash } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import BubbleContainer from "@/components/global/bubble-container";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { hexCodeToRgb, isValidHexCode, rgbToCmyk } from "@/lib/utils";

interface HexCodeInputProps {
  form: UseFormReturn<
    {
      hexCode: string;
      rgb: {
        r: number | null;
        g: number | null;
        b: number | null;
      };
      cmyk: {
        c: number | null;
        m: number | null;
        y: number | null;
        k: number | null;
      };
    },
    any,
    undefined
  >;
  field: ControllerRenderProps<
    {
      hexCode: string;
      rgb: {
        r: number | null;
        g: number | null;
        b: number | null;
      };
      cmyk: {
        c: number | null;
        m: number | null;
        y: number | null;
        k: number | null;
      };
    },
    "hexCode"
  >;
}

export default function HexCodeInput({ form, field }: HexCodeInputProps) {
  const hexCode = form.watch("hexCode");

  const handleHexCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const nextHexCode = `#${value.toUpperCase()}`;

    form.setValue("hexCode", nextHexCode, { shouldValidate: true });

    if (isValidHexCode(nextHexCode)) {
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
    <BubbleContainer className="relative gap-1">
      <Hash className="absolute left-4 top-4 size-4 shrink-0 text-muted-foreground" />
      <Input
        {...field}
        id="hexCode"
        type="text"
        maxLength={6}
        autoComplete="off"
        value={hexCode.slice(1)}
        onChange={handleHexCodeChange}
        className="w-[100px] rounded-full border-none py-2 pl-8 pr-2 text-xs text-secondary-foreground focus-visible:ring-offset-0"
      />
      <CopyButton type="button" text={hexCode} />
    </BubbleContainer>
  );
}
