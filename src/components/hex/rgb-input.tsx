"use client";

import { Fragment } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import BubbleContainer from "@/components/global/bubble-container";
import CopyButton from "@/components/global/copy-button";
import InputCounter from "@/components/global/input-counter";

import { RGB } from "@/lib/types";
import {
  isValidRgb,
  parseMaxNumber,
  rgbToCmyk,
  rgbToHexCode,
} from "@/lib/utils";

interface RgbInputProps {
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
    "rgb"
  >;
}

type RGBField = "rgb.r" | "rgb.g" | "rgb.b";

export default function RgbInput({ form, field }: RgbInputProps) {
  const rgb = form.watch("rgb");

  const handleRgbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const parsedValue = parseInt(value);

    form.setValue(
      name as RGBField,
      value.length !== 0 ? parseMaxNumber(value, 255) : null,
      { shouldValidate: true },
    );

    if (isValidRgb(rgb as RGB) && value.length !== 0) {
      const nextRgb = { ...rgb, [name]: parsedValue } as RGB;
      const nextHexCode = rgbToHexCode(nextRgb).toUpperCase();
      const nextCmyk = rgbToCmyk(nextRgb);

      form.setValue("hexCode", nextHexCode);
      form.setValue("cmyk", nextCmyk);
    }
  };

  const rgbFields: { id: RGBField; value: number | null }[] = [
    { id: "rgb.r", value: rgb.r },
    { id: "rgb.g", value: rgb.g },
    { id: "rgb.b", value: rgb.b },
  ];

  return (
    <BubbleContainer className="gap-1">
      <span className="pl-2 text-xs text-muted-foreground">rgb(</span>
      {rgbFields.map(({ id, value }, index) => (
        <Fragment key={id}>
          <InputCounter
            {...field}
            id={id}
            name={id}
            min={0}
            max={255}
            className="w-[40px]"
            value={value !== null ? Number(value).toString() : ""}
            onChange={handleRgbChange}
          />
          {index !== rgbFields.length - 1 && (
            <span className="text-xs text-muted-foreground">{", "}</span>
          )}
        </Fragment>
      ))}
      <span className="text-xs text-muted-foreground">)</span>
      <CopyButton type="button" text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
    </BubbleContainer>
  );
}
