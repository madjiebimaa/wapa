import { forwardRef } from "react";

import SelectBackgroundColorButton from "@/components/color/select-background-color-button";
import BubbleContainer from "@/components/global/bubble-container";
import CopyButton from "@/components/global/copy-button";

import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorPaletteToolsProps
  extends React.ComponentPropsWithoutRef<typeof BubbleContainer> {
  hexCode: Color["hexCode"];
}

const ColorPaletteTools = forwardRef<
  React.ElementRef<typeof BubbleContainer>,
  ColorPaletteToolsProps
>(({ hexCode, className, ...props }, ref) => {
  return (
    <BubbleContainer ref={ref} className={cn("gap-1", className)} {...props}>
      <CopyButton text={hexCode} />
      <SelectBackgroundColorButton hexCode={hexCode} />
    </BubbleContainer>
  );
});
ColorPaletteTools.displayName = "ColorPaletteTools";

export default ColorPaletteTools;
