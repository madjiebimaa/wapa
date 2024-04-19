"use client";

import { Info } from "lucide-react";
import { useEffect } from "react";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CMYK, RGB } from "@/lib/types";
import { getRandomInt, hexCodeToRgb, rgbToCmyk } from "@/lib/utils";
import { useColors } from "@/store/color";

interface RandomColorTooltipProps {
  setHexCode: React.Dispatch<React.SetStateAction<string>>;
  setRgb: React.Dispatch<React.SetStateAction<RGB>>;
  setCmyk: React.Dispatch<React.SetStateAction<CMYK>>;
}

export default function RandomColorTooltip({
  setHexCode,
  setRgb,
  setCmyk,
}: RandomColorTooltipProps) {
  const colors = useColors();
  const randomizeHexCode = colors[getRandomInt(0, colors.length - 1)].hexCode;

  useEffect(() => {
    const handleRandomizeHexCode = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "r") {
        const nextHexCode = randomizeHexCode;
        const nextRgb = hexCodeToRgb(nextHexCode);
        const nextCmyk = rgbToCmyk(nextRgb);

        setHexCode(nextHexCode);
        setRgb(nextRgb);
        setCmyk(nextCmyk);
      }
    };

    document.addEventListener("keydown", handleRandomizeHexCode);

    return () => {
      document.removeEventListener("keydown", handleRandomizeHexCode);
    };
  }, [randomizeHexCode, setCmyk, setHexCode, setRgb]);

  return (
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
  );
}
