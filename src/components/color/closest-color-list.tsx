import ColorLink from "@/components/color/color-link";

import { Color } from "@/lib/types";
import { getClosestColors } from "@/lib/utils";

interface ColorLinkListProps {
  color: Color;
  colors: Color[];
}

export default function ClosestColorList({
  color,
  colors,
}: ColorLinkListProps) {
  const closestColors = getClosestColors(color, colors, 12);

  return (
    <section className="grid flex-1 grid-cols-1 place-content-end gap-2 md:grid-cols-2 lg:grid-cols-3">
      {closestColors.map((closestColor) => (
        <ColorLink key={closestColor.id} color={closestColor} />
      ))}
    </section>
  );
}
