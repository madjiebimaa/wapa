"use client";

import { Fragment } from "react";
import { UseFormReturn } from "react-hook-form";

import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { cmykToRgb, getCmykAttribute, rgbToHexCode } from "@/lib/utils";

interface CmykInputProps {
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

export default function CmykInput({ form }: CmykInputProps) {
  const { c, m, y, k } = form.watch("cmyk");

  const handleCmykChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    form.setValue(
      getCmykAttribute(name as "c" | "m" | "y" | "k"),
      parseInt(value),
    );

    const nextRgb = cmykToRgb({ c, m, y, k });

    form.setValue("rgb", nextRgb);
    form.setValue("hexCode", rgbToHexCode(nextRgb).toUpperCase());
  };

  const cmyk: { id: string; value: number }[] = [
    { id: "c", value: c },
    { id: "m", value: m },
    { id: "y", value: y },
    { id: "k", value: k },
  ];

  return (
    <div className="flex flex-col gap-1 md:flex-row">
      <BubbleContainer>
        <BubbleText className="uppercase">cmyk</BubbleText>
      </BubbleContainer>
      <BubbleContainer className="gap-1">
        <span className="pl-2 text-xs text-muted-foreground">cmyk(</span>
        {cmyk.map(({ id, value }, index) => (
          <Fragment key={id}>
            <Input
              name={id}
              type="number"
              min={0}
              max={255}
              className="w-[35px] rounded-full border-none p-2 text-xs text-secondary-foreground focus-visible:ring-offset-0"
              value={value}
              onChange={handleCmykChange}
            />
            {index !== cmyk.length - 1 && (
              <span className="text-xs text-muted-foreground">{", "}</span>
            )}
          </Fragment>
        ))}
        <span className="text-xs text-muted-foreground">)</span>
        <CopyButton text={`cmyk(${c}, ${m}, ${y}, ${k})`} />
      </BubbleContainer>
    </div>
  );
}
