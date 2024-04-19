"use client";

import { Fragment } from "react";

import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { CMYK, RGB } from "@/lib/types";
import { cmykToRgb, rgbToHexCode } from "@/lib/utils";

interface CmykInputProps {
  cmyk: CMYK;
  setHexCode: React.Dispatch<React.SetStateAction<string>>;
  setRgb: React.Dispatch<React.SetStateAction<RGB>>;
  setCmyk: React.Dispatch<React.SetStateAction<CMYK>>;
}

export default function CmykInput({
  cmyk: { c, m, y, k },
  setRgb,
  setHexCode,
  setCmyk,
}: CmykInputProps) {
  const handleCmykChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const cmykValue = parseInt(value);
    setCmyk((prevState) => ({
      ...prevState,
      [name]: cmykValue,
    }));

    const nextRgb = cmykToRgb({ c, m, y, k });

    setRgb(nextRgb);
    setHexCode(rgbToHexCode(nextRgb).toUpperCase());
  };

  const cmyk: { id: string; value: number }[] = [
    { id: "c", value: c },
    { id: "m", value: m },
    { id: "y", value: y },
    { id: "k", value: k },
  ];

  return (
    <BubbleContainer className="gap-1">
      <BubbleText className="uppercase">cmyk</BubbleText>
      <span className="text-muted-foreground">cmyk(</span>
      {cmyk.map(({ id, value }, index) => (
        <Fragment key={id}>
          <Input
            name={id}
            type="number"
            min={0}
            max={255}
            className="w-[45px] rounded-full border-none text-secondary-foreground focus-visible:ring-offset-0"
            value={value}
            onChange={handleCmykChange}
          />
          {index !== cmyk.length - 1 && (
            <span className="text-muted-foreground">{", "}</span>
          )}
        </Fragment>
      ))}
      <span className="text-muted-foreground">)</span>
      <CopyButton text={`cmyk(${c}, ${m}, ${y}, ${k})`} />
    </BubbleContainer>
  );
}
