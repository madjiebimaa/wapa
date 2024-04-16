import { forwardRef } from "react";

import SelectBackgroundColorButton from "@/components/color/select-background-color-button";
import CopyButton from "@/components/global/copy-button";

import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorPaletteToolsProps
  extends React.ComponentPropsWithoutRef<"section"> {
  hexCode: Color["hexCode"];
}

const ColorPaletteTools = forwardRef<
  React.ElementRef<"section">,
  ColorPaletteToolsProps
>(({ hexCode, className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        "mx-auto flex w-fit items-center justify-center rounded-full bg-secondary p-1 shadow-md",
        className,
      )}
      {...props}
    >
      <CopyButton text={hexCode} />
      <SelectBackgroundColorButton hexCode={hexCode} />
    </section>
  );
});
ColorPaletteTools.displayName = "ColorPaletteTools";

export default ColorPaletteTools;
