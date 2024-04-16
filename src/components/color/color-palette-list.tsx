"use client";

import ColorPalette from "@/components/color/color-palette";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useFilteredColors } from "@/store/color";

export default function ColorPaletteList() {
  const colors = useFilteredColors();

  return (
    <ScrollArea className="flex-1">
      <section className="grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 p-4">
        {colors.map((color) => (
          <ColorPalette key={color.id} color={color} />
        ))}
      </section>
    </ScrollArea>
  );
}
