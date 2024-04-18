import { forwardRef } from "react";

import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

import SelectBackgroundColorButton from "@/components/color/select-background-color-button";
import { bubbleButtonStyle } from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import CopyButton from "@/components/global/copy-button";
import { buttonVariants } from "@/components/ui/button";

import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorPaletteToolsProps
  extends React.ComponentPropsWithoutRef<typeof BubbleContainer> {
  colorId: Color["id"];
  hexCode: Color["hexCode"];
}

const ColorPaletteTools = forwardRef<
  React.ElementRef<typeof BubbleContainer>,
  ColorPaletteToolsProps
>(({ colorId, hexCode, className, ...props }, ref) => {
  return (
    <BubbleContainer ref={ref} className={cn("gap-1", className)} {...props}>
      <CopyButton text={hexCode} />
      <SelectBackgroundColorButton hexCode={hexCode} />
      <Link
        href={`/colors/${colorId}`}
        className={cn(
          buttonVariants({
            variant: bubbleButtonStyle.variant,
            size: bubbleButtonStyle.size,
          }),
          bubbleButtonStyle.className,
        )}
      >
        <LinkIcon className="size-4 shrink-0" />
      </Link>
    </BubbleContainer>
  );
});
ColorPaletteTools.displayName = "ColorPaletteTools";

export default ColorPaletteTools;
