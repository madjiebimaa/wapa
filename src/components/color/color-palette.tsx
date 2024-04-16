import { Color } from "@/lib/types";

interface ColorPaletteProps {
  color: Color;
}

export default function ColorPalette({ color }: ColorPaletteProps) {
  return (
    <div className="mx-auto flex min-w-[130px] max-w-[200px] flex-col gap-4">
      <div
        style={{ background: color.hexCode }}
        className="mx-auto size-20 rounded-full shadow-md"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs">{color.name}</span>
        <span className="text-xs">{color.code}</span>
      </div>
    </div>
  );
}
