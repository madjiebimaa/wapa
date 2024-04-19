"use client";

import { Fragment } from "react";

import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import CopyButton from "@/components/global/copy-button";
import { Input } from "@/components/ui/input";

import { RGB } from "@/lib/types";
import { rgbToHexCode } from "@/lib/utils";

interface RgbInputProps {
  hexCode: string;
  setHexCode: React.Dispatch<React.SetStateAction<string>>;
  rgb: RGB;
  setRgb: React.Dispatch<React.SetStateAction<RGB>>;
}

export default function RgbInput({
  rgb: { r, g, b },
  setRgb,
  setHexCode,
}: RgbInputProps) {
  const handleRgbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const rgbValue = parseInt(value);
    setRgb((prevState) => ({
      ...prevState,
      [name]: rgbValue < 0 ? 0 : rgbValue > 255 ? 255 : rgbValue,
    }));

    setHexCode(rgbToHexCode({ r, g, b }).toUpperCase());
  };

  const rgb: { id: string; value: number }[] = [
    { id: "r", value: r },
    { id: "g", value: g },
    { id: "b", value: b },
  ];

  return (
    <BubbleContainer className="gap-1">
      <BubbleText className="uppercase">rgb</BubbleText>
      <span className="text-muted-foreground">rgb(</span>
      {rgb.map(({ id, value }, index) => (
        <Fragment key={id}>
          <Input
            name={id}
            type="number"
            min={0}
            max={255}
            className="w-[50px] rounded-full border-none text-secondary-foreground focus-visible:ring-offset-0"
            value={value}
            onChange={handleRgbChange}
          />
          {index !== rgb.length - 1 && (
            <span className="text-muted-foreground">{", "}</span>
          )}
        </Fragment>
      ))}
      <span className="text-muted-foreground">)</span>
      <CopyButton
        text={`rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`}
      />
    </BubbleContainer>
  );
}
