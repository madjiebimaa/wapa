import ColorPaletteTools from "@/components/color/color-palette-tools";

import { Color } from "@/lib/types";

interface ColorPaletteProps {
  color: Color;
}

export default function ColorPalette({ color }: ColorPaletteProps) {
  return (
    <div className="group/color-palette mx-auto flex min-w-[130px] max-w-[200px] flex-col gap-2">
      <div
        style={{ background: color.hexCode }}
        className="mx-auto size-20 rounded-full shadow-md"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs">{color.name}</span>
        <span className="text-xs">{color.code}</span>
      </div>
      <ColorPaletteTools color={color} />
    </div>
  );
}
