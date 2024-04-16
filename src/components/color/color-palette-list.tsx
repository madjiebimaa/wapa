import ColorPalette from "@/components/color/color-palette";
import { ScrollArea } from "@/components/ui/scroll-area";

import colors from "@/data/vinilex-colors.json";

export default function ColorPaletteList() {
  return (
    <ScrollArea className="flex-1 p-4">
      <section className="grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
        {colors.map((color) => (
          <ColorPalette key={color.id} color={color} />
        ))}
      </section>
    </ScrollArea>
  );
}
