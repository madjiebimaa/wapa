import CopyButton from "@/components/global/copy-button";

import { Color } from "@/lib/types";

interface ColorPaletteToolsProps {
  color: Color;
}

export default function ColorPaletteTools({ color }: ColorPaletteToolsProps) {
  return (
    <section className="invisible mx-auto flex w-fit items-center justify-center rounded-full bg-secondary p-1 opacity-0 shadow-md transition-all duration-300 ease-in group-hover/color-palette:visible group-hover/color-palette:opacity-100 group-hover/color-palette:transition-all group-hover/color-palette:duration-500 group-hover/color-palette:ease-out">
      <CopyButton text={color.hexCode} />
    </section>
  );
}
