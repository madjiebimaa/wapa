"use client";

import { Fragment } from "react";

import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { CMYK, RGB } from "@/lib/types";
import { rgbToCmyk, rgbToHexCode } from "@/lib/utils";

interface RgbInputProps {
  rgb: RGB;
  setHexCode: React.Dispatch<React.SetStateAction<string>>;
  setRgb: React.Dispatch<React.SetStateAction<RGB>>;
  setCmyk: React.Dispatch<React.SetStateAction<CMYK>>;
}

export default function RgbInput({
  rgb: { r, g, b },
  setRgb,
  setHexCode,
  setCmyk,
}: RgbInputProps) {
  const handleRgbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const rgbValue = parseInt(value);
    setRgb((prevState) => ({
      ...prevState,
      [name]: rgbValue < 0 ? 0 : rgbValue > 255 ? 255 : rgbValue,
    }));

    setHexCode(rgbToHexCode({ r, g, b }).toUpperCase());
    setCmyk(rgbToCmyk({ r, g, b }));
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
        <CopyButton text={`rgb(${r}, ${g}, ${b})`} />
      </BubbleContainer>
    </div>
  );
}
