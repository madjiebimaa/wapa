"use client";

import { Fragment } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import BubbleContainer from "@/components/global/bubble-container";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { CMYK } from "@/lib/types";
import {
  cmykToRgb,
  isValidCmyk,
  parseMaxNumber,
  rgbToHexCode,
} from "@/lib/utils";

interface CmykInputProps {
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
    "cmyk"
  >;
}

type CMYKField = "cmyk.c" | "cmyk.m" | "cmyk.y" | "cmyk.k";

export default function CmykInput({ form }: CmykInputProps) {
  const cmyk = form.watch("cmyk");

  const handleCmykChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const parsedValue = parseInt(value);

    form.setValue(
      name as CMYKField,
      value.length !== 0 ? parseMaxNumber(value, 100) : null,
      { shouldValidate: true },
    );

    if (isValidCmyk(cmyk as CMYK) && value.length !== 0) {
      const parsedCmyk: CMYK = {
        c: cmyk.c ? cmyk.c / 100 : 0,
        m: cmyk.m ? cmyk.m / 100 : 0,
        y: cmyk.y ? cmyk.y / 100 : 0,
        k: cmyk.k ? cmyk.k / 100 : 0,
      };

      const nextCmyk: CMYK = { ...parsedCmyk, [name]: parsedValue / 100 };
      const nextRgb = cmykToRgb(nextCmyk);
      const nextHexCode = rgbToHexCode(nextRgb).toUpperCase();

      form.setValue("rgb", nextRgb);
      form.setValue("hexCode", nextHexCode);
    }
  };

  const cmykFields: { id: CMYKField; value: number | null }[] = [
    { id: "cmyk.c", value: cmyk.c },
    { id: "cmyk.m", value: cmyk.m },
    { id: "cmyk.y", value: cmyk.y },
    { id: "cmyk.k", value: cmyk.k },
  ];

  return (
    <BubbleContainer className="gap-1">
      <span className="pl-2 text-xs text-muted-foreground">cmyk(</span>
      {cmykFields.map(({ id, value }, index) => (
        <Fragment key={id}>
          <Input
            id={id}
            name={id}
            type="number"
            min={0}
            max={255}
            className="w-[35px] rounded-full border-none p-2 text-xs text-secondary-foreground focus-visible:ring-offset-0"
            value={value !== null ? Number(value).toString() : ""}
            onChange={handleCmykChange}
          />
          {index !== cmykFields.length - 1 && (
            <span className="text-xs text-muted-foreground">{", "}</span>
          )}
        </Fragment>
      ))}
      <span className="text-xs text-muted-foreground">)</span>
      <CopyButton
        type="button"
        text={`cmyk(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})`}
      />
    </BubbleContainer>
  );
}
