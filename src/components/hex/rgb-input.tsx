"use client";

import { Fragment } from "react";
import { UseFormReturn } from "react-hook-form";

import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { getRgbAttribute, rgbToCmyk, rgbToHexCode } from "@/lib/utils";

interface RgbInputProps {
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

export default function RgbInput({ form }: RgbInputProps) {
  const { r, g, b } = form.watch("rgb");

  const handleRgbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    form.setValue(getRgbAttribute(name as "r" | "g" | "b"), parseInt(value));
    form.setValue("hexCode", rgbToHexCode({ r, g, b }).toUpperCase());
    form.setValue("cmyk", rgbToCmyk({ r, g, b }));
  };

  const rgb: { id: string; value: number }[] = [
    { id: "r", value: r },
    { id: "g", value: g },
    { id: "b", value: b },
  ];

  return (
    <div className="flex flex-col gap-1 md:flex-row">
      <BubbleContainer>
        <BubbleText className="uppercase">rgb</BubbleText>
      </BubbleContainer>
      <BubbleContainer className="gap-1">
        <span className="pl-2 text-xs text-muted-foreground">rgb(</span>
        {rgb.map(({ id, value }, index) => (
          <Fragment key={id}>
            <Input
              name={id}
              type="number"
              min={0}
              max={255}
              className="w-[40px] rounded-full border-none p-2 text-xs text-secondary-foreground focus-visible:ring-offset-0"
              value={value}
              onChange={handleRgbChange}
            />
            {index !== rgb.length - 1 && (
              <span className="text-xs text-muted-foreground">{", "}</span>
            )}
          </Fragment>
        ))}
        <span className="text-xs text-muted-foreground">)</span>
        <CopyButton type="button" text={`rgb(${r}, ${g}, ${b})`} />
      </BubbleContainer>
    </div>
  );
}
