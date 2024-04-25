"use client";

import { Dices, Info } from "lucide-react";
import { useCallback, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useDevices from "@/hooks/use-devices";
import { getRandomInt, hexCodeToRgb, rgbToCmyk } from "@/lib/utils";
import { useColors } from "@/store/color";

interface RandomColorTooltipProps {
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
}

export default function RandomColorTooltip({ form }: RandomColorTooltipProps) {
  const { isLargeDevice } = useDevices();
  const colors = useColors();

  const randomColor = useCallback(() => {
    const nextHexCode = colors[getRandomInt(0, colors.length - 1)].hexCode;
    const nextRgb = hexCodeToRgb(nextHexCode);
    const nextCmyk = rgbToCmyk(nextRgb);

    form.setValue("hexCode", nextHexCode);
    form.setValue("rgb", nextRgb);
    form.setValue("cmyk", nextCmyk);
  }, [colors, form]);

  useEffect(() => {
    const handleRandomizeHexCode = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "r") {
        randomColor();
      }
    };

    isLargeDevice &&
      document.addEventListener("keydown", handleRandomizeHexCode);

    return () => {
      isLargeDevice &&
        document.removeEventListener("keydown", handleRandomizeHexCode);
    };
  }, [form, randomColor, isLargeDevice]);

  return isLargeDevice ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <BubbleContainer>
            <BubbleButton>
              <Info className="size-4 shrink-0" />
            </BubbleButton>
          </BubbleContainer>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            <span className="rounded-md border bg-secondary p-1 font-bold text-secondary-foreground">
              Alt
            </span>
            {" + "}
            <span className="rounded-md border bg-secondary p-1 font-bold text-secondary-foreground">
              r
            </span>
            {" for instant color inspiration!"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <BubbleContainer>
      <BubbleButton onClick={() => randomColor()}>
        <Dices className="size-4 shrink-0" />
      </BubbleButton>
    </BubbleContainer>
  );
}
