import ColorPaletteTools from "@/components/color/color-palette-tools";
import LoveButton from "@/components/global/love-button";

import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorPaletteProps {
  color: Color;
}

export default function ColorPalette({ color }: ColorPaletteProps) {
  const showWhenHoverStyle =
    "invisible opacity-0 transition-all duration-300 ease-in group-hover/color-palette:visible group-hover/color-palette:opacity-100 group-hover/color-palette:transition-all group-hover/color-palette:duration-500 group-hover/color-palette:ease-out";

  return (
    <div className="group/color-palette relative mx-auto flex min-w-[130px] max-w-[200px] flex-col gap-2">
      <LoveButton
        id={color.id}
        className={cn("absolute right-0 top-0", showWhenHoverStyle)}
      />
      <div
        style={{ background: color.hexCode }}
        className="mx-auto size-20 rounded-full shadow-md transition-transform duration-300 ease-in group-hover/color-palette:scale-110 group-hover/color-palette:transition-transform group-hover/color-palette:duration-500 group-hover/color-palette:ease-out"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs">{color.name}</span>
        <span className="text-xs">{color.code}</span>
      </div>
      <ColorPaletteTools
        hexCode={color.hexCode}
        className={showWhenHoverStyle}
      />
    </div>
  );
}
